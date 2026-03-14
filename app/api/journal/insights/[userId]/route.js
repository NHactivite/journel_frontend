const BACKEND = process.env.BACKEND_URL || "http://localhost:8000";

export async function GET(request, { params }) {
  const cookie = request.headers.get("cookie") || "";
  const { userId } = await params;

  const res = await fetch(`${BACKEND}/api/journal/insights/${userId}`, {
    headers: { cookie },
  });

  const data = await res.json();
  return Response.json(data, { status: res.status });
}