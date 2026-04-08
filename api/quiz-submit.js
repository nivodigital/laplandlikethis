const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "hello@laplandlikethis.com";
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const EMAIL_FROM = process.env.EMAIL_FROM || "Lapland Like This <onboarding@resend.dev>";

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function list(items) {
  if (!Array.isArray(items) || items.length === 0) {
    return "-";
  }
  return items.map((item) => escapeHtml(item)).join(", ");
}

function buildAdminHtml(payload) {
  const lead = payload.lead || {};
  const answers = payload.answers || {};
  const recs = Array.isArray(payload.recommendations) ? payload.recommendations : [];

  const recMarkup = recs
    .map(
      (rec) =>
        `<li style="margin-bottom:12px;"><strong>#${escapeHtml(rec.rank)} ${escapeHtml(rec.destination)}</strong><br>` +
        `Tag: ${escapeHtml(rec.tag)}<br>` +
        `Airport: ${escapeHtml(rec.airport)}<br>` +
        `Transfer: ${escapeHtml(rec.transfer)}<br>` +
        `Reasons: ${list(rec.reasons)}<br>` +
        `Avoid: ${escapeHtml(rec.avoid)}</li>`
    )
    .join("");

  return `
    <div style="font-family:Arial,sans-serif;color:#1d1d1d;line-height:1.5;max-width:700px;">
      <h2 style="margin:0 0 10px;">New Trip Builder Submission</h2>
      <p style="margin:0 0 18px;">Submitted: ${escapeHtml(payload.submittedAt || new Date().toISOString())}</p>

      <h3 style="margin:18px 0 8px;">Lead Details</h3>
      <ul style="padding-left:18px;">
        <li><strong>Name:</strong> ${escapeHtml(lead.name || "(not provided)")}</li>
        <li><strong>Email:</strong> ${escapeHtml(lead.email || "")}</li>
        <li><strong>Marketing consent:</strong> ${lead.consent ? "Yes" : "No"}</li>
      </ul>

      <h3 style="margin:18px 0 8px;">Quiz Answers</h3>
      <ul style="padding-left:18px;">
        <li><strong>Origin:</strong> ${escapeHtml(answers.origin)}</li>
        <li><strong>Region:</strong> ${escapeHtml(answers.region)}</li>
        <li><strong>Group:</strong> ${escapeHtml(answers.group)}</li>
        <li><strong>Nights:</strong> ${escapeHtml(answers.nights)}</li>
        <li><strong>Budget:</strong> ${escapeHtml(answers.budget)}</li>
        <li><strong>Season:</strong> ${escapeHtml(answers.season)}</li>
        <li><strong>Priorities:</strong> ${list(answers.priorities)}</li>
        <li><strong>Accommodation:</strong> ${escapeHtml(answers.accommodation)}</li>
        <li><strong>Pace:</strong> ${escapeHtml(answers.pace)}</li>
        <li><strong>Winter experience:</strong> ${escapeHtml(answers.winterExperience)}</li>
      </ul>

      <h3 style="margin:18px 0 8px;">Top 3 Recommendations</h3>
      <ol style="padding-left:18px;">
        ${recMarkup}
      </ol>
    </div>
  `;
}

function buildUserHtml(payload) {
  const lead = payload.lead || {};
  const recs = Array.isArray(payload.recommendations) ? payload.recommendations : [];

  const top3 = recs
    .map(
      (rec) =>
        `<li style="margin-bottom:10px;"><strong>#${escapeHtml(rec.rank)} ${escapeHtml(rec.destination)}</strong><br>` +
        `${escapeHtml(rec.tag)}</li>`
    )
    .join("");

  return `
    <div style="font-family:Arial,sans-serif;color:#1d1d1d;line-height:1.5;max-width:640px;">
      <h2 style="margin:0 0 10px;">Your Lapland Top 3</h2>
      <p style="margin:0 0 16px;">Hi ${escapeHtml((lead.name || "there").split(" ")[0])}, thanks for using our Trip Builder.</p>
      <p style="margin:0 0 14px;">Based on your answers, these are your current best matches:</p>
      <ol style="padding-left:18px;">
        ${top3}
      </ol>
      <p style="margin:14px 0 0;">If you want a full day-by-day itinerary, reply to this email and we will help you plan it properly.</p>
      <p style="margin:14px 0 0;color:#555;">Lapland Like This</p>
    </div>
  `;
}

async function sendResendEmail({ to, subject, html }) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: EMAIL_FROM,
      to,
      subject,
      html,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Resend request failed (${response.status}): ${body}`);
  }
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!RESEND_API_KEY) {
    return res.status(500).json({ error: "Email service not configured" });
  }

  let payload = req.body;
  if (typeof payload === "string") {
    try {
      payload = JSON.parse(payload);
    } catch (_err) {
      return res.status(400).json({ error: "Invalid JSON payload" });
    }
  }

  if (!payload || !payload.lead || !payload.lead.email) {
    return res.status(400).json({ error: "Missing required lead email" });
  }

  try {
    await Promise.all([
      sendResendEmail({
        to: ADMIN_EMAIL,
        subject: `New Trip Builder lead: ${payload.lead.email}`,
        html: buildAdminHtml(payload),
      }),
      sendResendEmail({
        to: payload.lead.email,
        subject: "Your Lapland Trip Builder results",
        html: buildUserHtml(payload),
      }),
    ]);

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("quiz-submit email error", err);
    return res.status(500).json({ error: "Failed to send submission emails" });
  }
};
