import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Global in-memory cache to persist across warm serverless invocations
declare global {
  // eslint-disable-next-line no-var
  var __sohag_team_members_cache: any[] | undefined;
}

const DATA_FILE_PATH = path.join(process.cwd(), "data", "team-members.json");

// Ensure data directory exists
function ensureDataDir() {
  try {
    const dir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  } catch {}
}

function readStoredMembers(): any[] {
  // 1. Check in-memory global cache first
  if (globalThis.__sohag_team_members_cache && Array.isArray(globalThis.__sohag_team_members_cache)) {
    return globalThis.__sohag_team_members_cache;
  }

  // 2. Check local JSON file
  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const content = fs.readFileSync(DATA_FILE_PATH, "utf-8");
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed)) {
        globalThis.__sohag_team_members_cache = parsed;
        return parsed;
      }
    }
  } catch {}

  // 3. Check /tmp on Vercel
  try {
    const tmpPath = path.join("/tmp", "sohag-team-members.json");
    if (fs.existsSync(tmpPath)) {
      const content = fs.readFileSync(tmpPath, "utf-8");
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed)) {
        globalThis.__sohag_team_members_cache = parsed;
        return parsed;
      }
    }
  } catch {}

  return [];
}

function writeStoredMembers(members: any[]) {
  // 1. Update in-memory cache
  globalThis.__sohag_team_members_cache = members;

  // 2. Write to project data file if writable
  try {
    ensureDataDir();
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(members, null, 2), "utf-8");
  } catch {}

  // 3. Write to /tmp for Vercel lambdas
  try {
    const tmpPath = path.join("/tmp", "sohag-team-members.json");
    fs.writeFileSync(tmpPath, JSON.stringify(members), "utf-8");
  } catch {}
}

export async function GET() {
  const members = readStoredMembers();
  return NextResponse.json(members, {
    headers: {
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "Pragma": "no-cache"
    }
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (Array.isArray(body)) {
      writeStoredMembers(body);
      return NextResponse.json({ success: true, count: body.length });
    } else {
      return NextResponse.json({ error: "Invalid data format. Expected array." }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to save team members" }, { status: 500 });
  }
}
