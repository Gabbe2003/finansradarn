import { NextResponse } from "next/server";

const WP_URL = process.env.NEXT_PUBLIC_WP_URL || "https://cms.finansradarn.se";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ClientResponse = {
  status: "subscribed" | "already_subscribed" | "invalid_email" | "error";
  message: string;
};

export async function POST(request: Request) {
  let body: { email?: unknown; source?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json<ClientResponse>(
      { status: "invalid_email", message: "Ogiltig begäran." },
      { status: 400 },
    );
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  const source = typeof body.source === "string" ? body.source.slice(0, 64) : "unknown";

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json<ClientResponse>(
      { status: "invalid_email", message: "Ogiltig e-postadress." },
      { status: 400 },
    );
  }

  try {
    const res = await fetch(`${WP_URL}/wp-json/finansradarn/v1/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, source }),
      cache: "no-store",
    });

    const data = (await res.json().catch(() => null)) as ClientResponse | null;

    if (!data) {
      return NextResponse.json<ClientResponse>(
        { status: "error", message: "Något gick fel. Försök igen senare." },
        { status: 502 },
      );
    }

    return NextResponse.json<ClientResponse>(data, { status: res.status });
  } catch {
    return NextResponse.json<ClientResponse>(
      { status: "error", message: "Något gick fel. Försök igen senare." },
      { status: 502 },
    );
  }
}
