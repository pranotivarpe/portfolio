import { profile } from "@/data/resume";

// Sends contact-form messages through Resend (https://resend.com).
// Set RESEND_API_KEY in Vercel. Until you verify your own domain, keep the
// default sender; Resend then only delivers to the address on your account.
const FROM = process.env.CONTACT_FROM ?? "Portfolio <onboarding@resend.dev>";
const TO = process.env.CONTACT_TO ?? profile.email;

const LIMITS = { name: 100, email: 200, message: 5000 };
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

// Best-effort limit per server instance; enough to slow down casual spam.
const recent = new Map<string, number[]>();

function tooMany(ip: string) {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  recent.set(ip, hits);
  return hits.length > MAX_PER_WINDOW;
}

const fail = (status: number, error: string) => Response.json({ ok: false, error }, { status });

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return fail(400, "The form data couldn't be read. Refresh the page and try again.");
  }

  // Hidden field that only bots fill in. Pretend it worked.
  if (typeof body.company === "string" && body.company.trim()) {
    return Response.json({ ok: true });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!name || name.length > LIMITS.name) return fail(422, "Add your name (up to 100 characters).");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > LIMITS.email) {
    return fail(422, "Add an email address I can reply to.");
  }
  if (message.length < 10 || message.length > LIMITS.message) {
    return fail(422, "Write a message between 10 and 5,000 characters.");
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (tooMany(ip)) return fail(429, "Too many messages in a short time. Try again in a few minutes.");

  const key = process.env.RESEND_API_KEY;
  if (!key) return fail(503, "The contact form isn't set up yet.");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      reply_to: email,
      subject: `Portfolio message from ${name}`,
      text: `${message}\n\n— ${name} <${email}>`,
    }),
  }).catch(() => null);

  if (!res?.ok) return fail(502, "The message couldn't be delivered right now.");
  return Response.json({ ok: true });
}
