// src/app/api/subscribe/route.ts
import { NextResponse } from "next/server";

const TURNSTILE_SECRET = process.env.TURNSTILE_SECRET_KEY ?? "";
const FORMSPREE_FORM_ID = process.env.FORMSPREE_FORM_ID ?? "mzzgglav";

if (!TURNSTILE_SECRET) {
  throw new Error("TURNSTILE_SECRET_KEY env var is not set");
}

export async function POST(req: Request) {
  try {
    const { email, token } = (await req.json()) as {
      email?: string;
      token?: string;
    };

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    if (!token) {
      return NextResponse.json(
        { message: "Captcha token missing" },
        { status: 400 }
      );
    }

    // 1) Verify Turnstile
    const verifyRes = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: TURNSTILE_SECRET, // always a string now
          response: token,          // guarded above
        }),
      }
    );
    const verifyJson = await verifyRes.json();

    if (!verifyJson.success) {
      return NextResponse.json(
        { message: "Captcha verification failed" },
        { status: 400 }
      );
    }

    // 2) Forward to Formspree
    const fsRes = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!fsRes.ok) {
      const t = await fsRes.text();
      return NextResponse.json(
        { message: `Formspree error: ${t}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unexpected error";
    return NextResponse.json({ message }, { status: 500 });
  }
}