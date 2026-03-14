const BACKEND = process.env.BACKEND_URL || "http://localhost:8000";

export async function POST(request) {
  const body   = await request.json();
  const cookie = request.headers.get("cookie") || "";

  const res = await fetch(`${BACKEND}/api/journal`, {
    method:  "POST",
    headers: { "Content-Type": "application/json", cookie },  // ← forward cookie
    body:    JSON.stringify(body),
  });

  const data = await res.json();
  return Response.json(data, { status: res.status });
}