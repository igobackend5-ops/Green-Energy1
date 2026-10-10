import React, { useMemo, useState } from 'react';
import { useCms } from '../admin/store.js';
import { Link, go, useReveal, Head, Sec } from './common.jsx';
import { useEnquiry, HONEY } from '../useEnquiry.js';
import './extra.css';

import { T } from '../content/T.js';
const BRAND = 'IGO Green Energy';
const Shell = ({ title, intro, children }) => {
  const ref = useReveal();
  return (
    <div ref={ref} className="pg pgLegal">
      <Sec><Head eyebrow={T("legal.001", "LEGAL")} title={title} text={intro} />{children}</Sec>
    </div>
  );
};
const Block = ({ h, children }) => <section className="lgBlock"><h3>{h}</h3>{children}</section>;

export function PrivacyPage() {
  const c = useCms('contact') || {};
  return (
    <Shell title={T("legal.002", "Privacy Policy")} intro={T("legal.117", "How IGO Green Energy collects, uses and protects the information you share with us.")}>
      <Block h={T("legal.101", "1. Information we collect")}><p>{T("legal.003", "When you submit a quote request, contact form, callback request, career enquiry or newsletter sign-up, we collect the details you enter, such as your name, phone number, email address, company, location and message. We also record the page you submitted the form from.")}</p></Block>
      <Block h={T("legal.102", "2. How we use it")}><p>{T("legal.004", "We use your details to respond to your enquiry, prepare quotations, arrange site surveys, provide support, and, if you subscribed, send updates about our solutions. We do not sell your personal information.")}</p></Block>
      <Block h={T("legal.103", "3. Who can see it")}><p>{T("legal.005", "Enquiries are visible only to authorised")} {BRAND} {T("legal.006", "staff through our admin system. We may share information with installation partners or service providers strictly to fulfil your request, or where required by law.")}</p></Block>
      <Block h={T("legal.104", "4. Storage and security")}><p>{T("legal.007", "Your information is stored in our database with access limited to authorised users. We take reasonable technical and organisational steps to protect it, but no online system can be guaranteed completely secure.")}</p></Block>
      <Block h={T("legal.105", "5. Cookies and analytics")}><p>{T("legal.008", "The website may use cookies or analytics tools to understand how visitors use the site and to improve it. You can control cookies through your browser settings.")}</p></Block>
      <Block h={T("legal.106", "6. Your choices")}><p>{T("legal.009", "You may ask us to access, correct or delete the personal information we hold about you, or to unsubscribe from our updates, by contacting us")}{c.email ? <> {T("legal.010", "at")} <a href={'mailto:' + c.email}>{c.email}</a></> : ''}.</p></Block>
      <Block h={T("legal.107", "7. Changes to this policy")}><p>{T("legal.011", "We may update this policy from time to time. The latest version will always be available on this page.")}</p></Block>
      <Block h={T("legal.108", "8. Contact")}><p>{BRAND}{c.address ? ', ' + c.address : ''}{c.phone ? ' · ' + c.phone : ''}{c.email ? ' · ' + c.email : ''}</p></Block>
    </Shell>
  );
}

export function TermsPage() {
  const c = useCms('contact') || {};
  return (
    <Shell title={T("legal.012", "Terms & Conditions")} intro={T("legal.118", "Please read these terms before using the IGO Green Energy website.")}>
      <Block h={T("legal.109", "1. Use of this website")}><p>{T("legal.013", "The information on this website is provided for general guidance about our solar, wind, biogas and water treatment solutions. By using the site you agree to use it lawfully and not to misuse or interfere with it.")}</p></Block>
      <Block h={T("legal.110", "2. Quotations and estimates")}><p>{T("legal.014", "Any estimate, calculator result or indicative figure shown on this website is for information only and is not an offer or a guarantee of savings, output or performance. Final design, pricing and timelines are confirmed in a written quotation after a site assessment.")}</p></Block>
      <Block h={T("legal.111", "3. Products and services")}><p>{T("legal.015", "Specifications, images and descriptions may change without notice. Services are supplied under the terms of the written agreement or purchase order agreed with")} {BRAND}.</p></Block>
      <Block h={T("legal.112", "4. Intellectual property")}><p>{T("legal.016", "All content, logos, text and images on this website belong to")} {BRAND} {T("legal.017", "or its licensors and may not be copied or reused without written permission.")}</p></Block>
      <Block h={T("legal.113", "5. Third-party links")}><p>{T("legal.018", "This website may link to other websites. We are not responsible for their content or practices.")}</p></Block>
      <Block h={T("legal.114", "6. Limitation of liability")}><p>{T("legal.019", "To the extent permitted by law,")} {BRAND} {T("legal.020", "is not liable for any loss arising from the use of, or inability to use, this website or from reliance on its general information.")}</p></Block>
      <Block h={T("legal.115", "7. Governing law")}><p>{T("legal.021", "These terms are governed by the laws of India. Any dispute is subject to the jurisdiction of the courts at")} {c.address ? c.address.split(',')[0] : 'our registered office'}.</p></Block>
      <Block h={T("legal.116", "8. Contact")}><p>{T("legal.022", "Questions about these terms can be sent to")} {c.email ? <a href={'mailto:' + c.email}>{c.email}</a> : 'us through the Contact page'}.</p></Block>
    </Shell>
  );
}

const MAP = [[T("legal.023", "Main"), [[T("legal.119", "Home"), '/'], [T("legal.120", "About Us"), '/about'], [T("legal.121", "Services"), '/services'], [T("legal.122", "Projects"), '/projects'], [T("legal.300", "Subsidy"), '/subsidy'], [T("legal.123", "Leadership"), '/leadership'], [T("legal.124", "Blogs"), '/blogs'], [T("legal.125", "FAQ"), '/faq'], [T("legal.126", "Careers"), '/careers'], [T("legal.127", "Learnerships"), '/learnerships'], [T("legal.128", "Contact Us"), '/contact']]],
  [T("legal.024", "Solutions"), [[T("legal.129", "Solar Energy"), '/services/solar'], [T("legal.130", "Wind Energy"), '/services/wind'], [T("legal.131", "Biogas"), '/services/biogas'], [T("legal.132", "Water Treatment"), '/services/water']]],
  [T("legal.025", "Legal"), [[T("legal.133", "Privacy Policy"), '/privacy-policy'], [T("legal.134", "Terms & Conditions"), '/terms'], [T("legal.135", "Sitemap"), '/sitemap']]]];
export function SitemapPage() {
  return (
    <Shell title={T("legal.026", "Sitemap")} intro="Every page of the website in one place.">
      <div className="lgMap">{MAP.map(([g, items]) => <div key={g}><h3>{g}</h3><ul>{items.map(([t, to]) => <li key={to}><Link to={to}>{t}</Link></li>)}</ul></div>)}</div>
    </Shell>
  );
}

export function NotFoundPage() {
  return (
    <div className="pg pgLegal"><Sec>
      <div className="lg404"><p className="pgEye">{T("legal.027", "ERROR 404")}</p><h1>{T("legal.028", "We couldn’t find that page")}</h1><p>{T("legal.029", "The page may have moved or the address may be mistyped.")}</p>
        <div className="lgBtns"><button className="pgBtn" onClick={() => go('/')}>{T("legal.030", "Back to Home")}</button><button className="pgBtn lgGhost" onClick={() => go('/contact')}>{T("legal.031", "Contact Us")}</button></div></div>
    </Sec></div>
  );
}

/* ---------------- Solar savings calculator ---------------- */
const inr = (n) => '₹' + Math.round(n).toLocaleString('en-IN');
export function SolarCalculator() {
  const ref = useReveal();
  const [bill, setBill] = useState(5000);
  const [A, setA] = useState({ tariff: Number(T('calc.solar.tariff', '8')) || 8, yieldKwh: Number(T('calc.solar.yield', '1450')) || 1450, cost: Number(T('calc.solar.cost', '55000')) || 55000 });
  const [open, setOpen] = useState(false);
  const [lead, setLead] = useState({ name: '', phone: '' });
  const [st, send] = useEnquiry();
  const r = useMemo(() => {
    const units = Math.max(0, bill) / Math.max(1, A.tariff);        // monthly kWh
    const kw = Math.max(1, Math.ceil((units * 12 / Math.max(1, A.yieldKwh)) * 2) / 2);
    const gen = kw * A.yieldKwh;                                     // annual kWh
    const used = Math.min(gen, units * 12);
    const save = used * A.tariff, cost = kw * A.cost;
    return { units, kw, gen, save, cost, pay: save > 0 ? cost / save : 0 };
  }, [bill, A]);
  const num = (k) => (e) => setA({ ...A, [k]: Number(e.target.value) || 0 });
  const submit = (e) => {
    e.preventDefault();
    send({ type: 'quote', name: lead.name, phone: lead.phone, subject: 'Solar calculator', message: 'Requested a solar quote from the savings calculator.', website: e.currentTarget.website.value,
      extra: { 'Monthly bill': inr(bill), 'Suggested size': r.kw + ' kW', 'Est. annual saving': inr(r.save), 'Est. cost': inr(r.cost), 'Tariff used': '₹' + A.tariff + '/kWh' } });
  };
  return (
    <div ref={ref} className="pg pgCalc"><Sec cls="alt" id="solar-calculator">
      <Head eyebrow={T("legal.032", "SOLAR SAVINGS CALCULATOR")} title={T("legal.033", "Estimate your")} em={T("legal.034", "rooftop solar savings")} text={T("legal.035", "Move the slider to your average monthly electricity bill. This is an indicative estimate to help you plan.")} />
      <div className="calcGrid">
        <div className="calcIn">
          <label htmlFor="calcBill">{T("legal.036", "Monthly electricity bill")} <b>{inr(bill)}</b></label>
          <input id="calcBill" type="range" min="500" max="100000" step="500" value={bill} onChange={(e) => setBill(Number(e.target.value))} />
          <div className="calcScale"><span>₹500</span><span>₹1,00,000</span></div>
          <button type="button" className="calcLink" onClick={() => setOpen(!open)} aria-expanded={open}>{open ? 'Hide' : 'Adjust'} {T("legal.037", "assumptions")}</button>
          {open && <div className="calcAs">
            <label>{T("legal.038", "Tariff (₹ per unit)")}<input type="number" min="1" step="0.5" value={A.tariff} onChange={num('tariff')} /></label>
            <label>{T("legal.039", "Yearly output per kW (units)")}<input type="number" min="800" step="50" value={A.yieldKwh} onChange={num('yieldKwh')} /></label>
            <label>{T("legal.040", "Installed cost (₹ per kW)")}<input type="number" min="10000" step="1000" value={A.cost} onChange={num('cost')} /></label>
          </div>}
        </div>
        <div className="calcOut" aria-live="polite">
          <div><span>{T("legal.041", "Suggested system")}</span><b>{r.kw} {T("legal.042", "kW")}</b></div>
          <div><span>{T("legal.043", "Est. yearly saving")}</span><b>{inr(r.save)}</b></div>
          <div><span>{T("legal.044", "Est. installed cost")}</span><b>{inr(r.cost)}</b></div>
          <div><span>{T("legal.045", "Payback period")}</span><b>{r.pay ? r.pay.toFixed(1) + ' years' : '–'}</b></div>
        </div>
      </div>
      <p className="calcNote">{T("legal.046", "Indicative only: based on the tariff, output and cost assumptions above, and excludes subsidies, net-metering charges and site-specific factors. Your final design and price are confirmed after a site survey.")}</p>
      <form className="calcLead" onSubmit={submit}>
        {st.ok ? <p className="ok"><b>{T("legal.047", "Thank you.")}</b> {T("legal.048", "Our team will contact you shortly with an exact quote.")}</p> : <>
          <b>{T("legal.049", "Want an exact quote?")}</b>
          <input required placeholder={T("legal.050", "Your name")} aria-label="Your name" value={lead.name} onChange={(e) => setLead({ ...lead, name: e.target.value })} />
          <input required type="tel" placeholder={T("legal.051", "Phone number")} aria-label="Phone number" value={lead.phone} onChange={(e) => setLead({ ...lead, phone: e.target.value })} />
          <input {...HONEY} />
          <button className="pgBtn" disabled={st.busy}>{st.busy ? 'Sending…' : 'Get my quote'}</button>
          {st.err && <small className="formErr">{st.err}</small>}</>}
      </form>
    </Sec></div>
  );
}
