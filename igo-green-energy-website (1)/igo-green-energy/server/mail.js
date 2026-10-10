// Optional e-mail alert for new enquiries. Enabled only when SMTP_HOST and NOTIFY_TO are set.
export async function notifyEnquiry(e) {
  if (!process.env.SMTP_HOST || !process.env.NOTIFY_TO) return;
  try {
    const { default: nodemailer } = await import('nodemailer');
    const t = nodemailer.createTransport({ host: process.env.SMTP_HOST, port: Number(process.env.SMTP_PORT) || 587, secure: process.env.SMTP_SECURE === '1',
      auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined });
    const lines = [`Type: ${e.type}`, `Name: ${e.name}`, `Phone: ${e.phone}`, `Email: ${e.email}`, e.company && `Company: ${e.company}`, e.subject && `Subject: ${e.subject}`,
      ...Object.entries(e.extra || {}).map(([k, v]) => `${k}: ${v}`), `Page: ${e.source}`, '', e.message].filter((x) => x !== undefined && x !== false && x !== null);
    await t.sendMail({ from: process.env.SMTP_FROM || process.env.SMTP_USER || 'website@greenenergy.local', to: process.env.NOTIFY_TO,
      subject: `New website ${e.type} enquiry${e.name ? ' from ' + e.name : ''}`, text: lines.join('\n') });
  } catch (err) { console.error('Enquiry e-mail failed:', err.message); }
}
