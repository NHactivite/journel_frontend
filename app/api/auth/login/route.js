const BACKEND = process.env.NEXT_PUBLIC_SERVER || "http://localhost:8000";

export async function POST(request) {
  const body = await request.json();

  const res = await fetch(`${BACKEND}/api/auth/login`, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify(body),
  });

  const data = await res.json();

  // Forward Set-Cookie from FastAPI to browser
  const response = Response.json(data, { status: res.status });
  const cookie   = res.headers.get("set-cookie");
  if (cookie) response.headers.set("set-cookie", cookie);

  return response;
}
