import { NextResponse } from "next/server";

// Reçoit les demandes de contact.
// Aujourd'hui rien n'est stocké : seule une trace anonymisée apparaît dans
// les logs Vercel. À brancher : Google Sheets, CRM ou e-mail.

const MAX_BODY = 8_000;
const PHONE = /^\+?[\d\s.-]{8,20}$/;
const str = (v: unknown, max: number) => String(v ?? "").trim().slice(0, max);

export async function POST(req: Request) {
  if (Number(req.headers.get("content-length") ?? 0) > MAX_BODY) {
    return NextResponse.json({ ok: false }, { status: 413 });
  }

  let body: Record<string, unknown>;
  try {
    const raw = await req.text();
    if (raw.length > MAX_BODY) return NextResponse.json({ ok: false }, { status: 413 });
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false, error: "Requête invalide" }, { status: 400 });
  }

  // Champ piège rempli = robot : réponse neutre, rien n'est traité
  if (str(body.company, 100)) return NextResponse.json({ ok: true });

  const lead = {
    name: str(body.name, 80),
    phone: str(body.phone, 20),
    email: str(body.email, 120),
    request: str(body.request, 2),
    project: str(body.project, 40),
    typology: str(body.typology, 2),
    horizon: str(body.horizon, 2),
    lang: str(body.lang, 2),
    message: str(body.message, 1000),
  };
  if (!lead.name || !PHONE.test(lead.phone)) {
    return NextResponse.json({ ok: false, error: "Nom et téléphone requis" }, { status: 422 });
  }

  console.log("[contact]", JSON.stringify({ at: new Date().toISOString(), request: lead.request, project: lead.project, typology: lead.typology, horizon: lead.horizon, lang: lead.lang }));
  return NextResponse.json({ ok: true });
}
