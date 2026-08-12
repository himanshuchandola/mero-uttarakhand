import { NextRequest, NextResponse } from "next/server";

const HEARTBEAT_WINDOW_MS = 25_000;
const sessions = new Map<string, number>();

function activeCount() {
  const cutoff = Date.now() - HEARTBEAT_WINDOW_MS;
  for (const [id, lastSeen] of sessions) if (lastSeen < cutoff) sessions.delete(id);
  return sessions.size;
}

export async function GET() {
  return NextResponse.json({ count: activeCount() });
}

export async function POST(req: NextRequest) {
  const { sessionId } = await req.json().catch(() => ({ sessionId: undefined }));
  if (sessionId) sessions.set(sessionId, Date.now());
  return NextResponse.json({ count: activeCount() });
}
