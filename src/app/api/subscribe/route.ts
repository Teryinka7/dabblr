// src/app/api/subscribe/route.ts
import { NextResponse } from "next/server";
const FORMSPREE_FORM_ID = process.env.FORMSPREE_FORM_ID ?? "mzzgglav";
export async function POST(req: Request) {
  try {
    const { email } = (await req.json()) as { email?: string };

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    const fsRes = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!fsRes.ok) {
      const text = await fsRes.text();
      return NextResponse.json(
        { message: `Formspree error: ${text}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Unexpected error";
    return NextResponse.json({ message }, { status: 500 });
  }
}