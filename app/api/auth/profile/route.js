const BACKEND = process.env.NEXT_PUBLIC_SERVER || "http://localhost:8000";

export async function GET(request) {
  const cookie = request.headers.get("cookie") || "";

  const res = await fetch(`${BACKEND}/api/auth/me`, {
    method:  "GET",
    headers: { cookie },    // ← forward the cookie to FastAPI
  });

  const data = await res.json();
  return Response.json(data, { status: res.status });
}