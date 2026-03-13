const BACKEND = process.env.NEXT_PUBLIC_SERVER || "http://localhost:8000";

export async function POST(request) {
  const cookie = request.headers.get("cookie") || "";

  const res = await fetch(`${BACKEND}/api/auth/logout`, {
    method:  "POST",
    headers: { cookie },    // ← forward cookie to FastAPI
  });

  const data = await res.json();

  // Clear the cookie in browser too
  const response = Response.json(data, { status: res.status });
  response.headers.set(
    "set-cookie",
    "token=; Path=/; HttpOnly; Max-Age=0"  // ← deletes cookie
  );

  return response;
}