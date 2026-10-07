import React, { useMemo, useState } from 'react';
import { useReveal, Head, Sec } from './common.jsx';
import { useEnquiry, HONEY } from '../useEnquiry.js';
import './extra.css';

import { T } from '../content/T.js';
const n1 = (n, d = 1) => Number(n).toLocaleString('en-IN', { maximumFractionDigits: d });
const inr = (n) => '₹' + Math.round(n).toLocaleString('en-IN');

function LeadForm({ subject, extra, label = 'Get my quote' }) {
  const [lead, setLead] = useState({ name: '', phone: '' });
  const [st, send] = useEnquiry();
  const submit = (e) => { e.preventDefault(); send({ type: 'quote', name: lead.name, phone: lead.phone, subject, message: 'Requested a quote from the ' + subject.toLowerCase() + '.', website: e.currentTarget.website.value, extra: extra() }); };
  return (
    <form className="calcLead" onSubmit={submit}>
      {st.ok ? <p className="ok"><b>{T("tools.001", "Thank you.")}</b> {T("tools.002", "Our team will contact you shortly.")}</p> : <>
        <b>{T("tools.003", "Want expert advice?")}</b>
        <input required placeholder={T("tools.004", "Your name")} aria-label="Your name" value={lead.name} onChange={(e) => setLead({ ...lead, name: e.target.value })} />
        <input required type="tel" placeholder={T("tools.005", "Phone number")} aria-label="Phone number" value={lead.phone} onChange={(e) => setLead({ ...lead, phone: e.target.value })} />
        <input {...HONEY} />
        <button className="pgBtn" disabled={st.busy}>{st.busy ? 'Sending…' : label}</button>
        {st.err && <small className="formErr">{st.err}</small>}</>}
    </form>
  );
}

/* ---------------- Biogas plant size calculator ---------------- */
export function BiogasCalculator() {
  const ref = useReveal();
  const [animals, setAnimals] = useState(10);
  const [open, setOpen] = useState(false);
  const [A, setA] = useState({ dung: Number(T('calc.biogas.dung', '10')) || 10, yieldM3: Number(T('calc.biogas.yield', '0.04')) || 0.04, lpg: Number(T('calc.biogas.lpg', '0.43')) || 0.43, lpgPrice: Number(T('calc.biogas.lpgprice', '65')) || 65 });
  const r = useMemo(() => {
    const dung = animals * A.dung, gas = dung * A.yieldM3, lpgKg = gas * A.lpg;
    return { dung, gas, size: Math.max(1, Math.ceil(gas)), lpgKg, save: lpgKg * A.lpgPrice * 30 };
  }, [animals, A]);
  const num = (k) => (e) => setA({ ...A, [k]: Number(e.target.value) || 0 });
  return (
    <div ref={ref} className="pg pgCalc"><Sec cls="alt" id="biogas-calculator">
      <Head eyebrow={T("tools.006", "BIOGAS PLANT SIZE CALCULATOR")} title={T("tools.007", "Estimate your")} em={T("tools.008", "biogas plant size")} text={T("tools.009", "Tell us how many cattle supply dung each day. This is an indicative estimate to help you plan.")} />
      <div className="calcGrid">
        <div className="calcIn">
          <label htmlFor="bgAnimals">{T("tools.010", "Number of cattle")} <b>{animals}</b></label>
          <input id="bgAnimals" type="range" min="1" max="200" step="1" value={animals} onChange={(e) => setAnimals(Number(e.target.value))} />
          <div className="calcScale"><span>1</span><span>200</span></div>
          <button type="button" className="calcLink" onClick={() => setOpen(!open)} aria-expanded={open}>{open ? 'Hide' : 'Adjust'} {T("tools.011", "assumptions")}</button>
          {open && <div className="calcAs">
            <label>{T("tools.012", "Dung per animal (kg per day)")}<input type="number" min="1" step="0.5" value={A.dung} onChange={num('dung')} /></label>
            <label>{T("tools.013", "Gas per kg of dung (m³)")}<input type="number" min="0.01" step="0.005" value={A.yieldM3} onChange={num('yieldM3')} /></label>
            <label>{T("tools.014", "LPG equivalent (kg per m³ gas)")}<input type="number" min="0.1" step="0.01" value={A.lpg} onChange={num('lpg')} /></label>
            <label>{T("tools.015", "LPG price (₹ per kg)")}<input type="number" min="1" step="1" value={A.lpgPrice} onChange={num('lpgPrice')} /></label>
          </div>}
        </div>
        <div className="calcOut" aria-live="polite">
          <div><span>{T("tools.016", "Dung available")}</span><b>{n1(r.dung, 0)} {T("tools.017", "kg/day")}</b></div>
          <div><span>{T("tools.018", "Biogas produced")}</span><b>{n1(r.gas)} {T("tools.019", "m³/day")}</b></div>
          <div><span>{T("tools.020", "Suggested plant")}</span><b>{r.size} m³</b></div>
          <div><span>{T("tools.021", "LPG saved per month")}</span><b>{inr(r.save)}</b></div>
        </div>
      </div>
      <p className="calcNote">{T("tools.022", "Indicative only: based on the assumptions above and fresh cattle dung. Actual output depends on feed, climate, digester design and how the gas is used. The digested slurry can also be used as manure. Final design is confirmed after a site assessment.")}</p>
      <LeadForm subject="Biogas calculator" label={T("tools.023", "Talk to a biogas expert")} extra={() => ({ Cattle: String(animals), 'Dung/day': n1(r.dung, 0) + ' kg', 'Gas/day': n1(r.gas) + ' m3', 'Suggested plant': r.size + ' m3' })} />
    </Sec></div>
  );
}

/* ---------------- Water treatment guide (TDS based) ---------------- */
const BANDS = [
  [0, 300, T("tools.024", "Low TDS"), T("tools.025", "Water is already low in dissolved salts. A sediment/carbon filter with UV or UF disinfection is usually enough. RO is optional.")],
  [300, 500, T("tools.026", "Moderate TDS"), T("tools.027", "Within the commonly accepted limit of 500 mg/L, but taste may vary. UV/UF with a TDS controller, or a compact RO, is a good choice.")],
  [500, 2000, T("tools.028", "High TDS"), T("tools.029", "Above 500 mg/L. An RO purifier with proper pre-filtration is recommended. Hardness and iron should also be tested.")],
  [2000, 99999, T("tools.030", "Very high TDS"), T("tools.031", "Brackish or heavily mineralised water. A properly sized RO system with pre-treatment (softener / iron removal) is needed. A water analysis is strongly advised.")]
];
export function WaterGuide() {
  const ref = useReveal();
  const [tds, setTds] = useState(600);
  const [use, setUse] = useState('Home');
  const b = BANDS.find(([lo, hi]) => tds >= lo && tds < hi) || BANDS[3];
  return (
    <div ref={ref} className="pg pgCalc"><Sec cls="alt" id="water-guide">
      <Head eyebrow={T("tools.032", "WATER PURIFIER GUIDE")} title={T("tools.033", "Which treatment")} em={T("tools.034", "does your water need?")} text={T("tools.035", "Enter your water's TDS reading (from a TDS meter or a lab report) to see the usual recommendation.")} />
      <div className="calcGrid">
        <div className="calcIn">
          <label htmlFor="wTds">{T("tools.036", "Water TDS")} <b>{n1(tds, 0)} {T("tools.037", "mg/L")}</b></label>
          <input id="wTds" type="range" min="0" max="3000" step="25" value={tds} onChange={(e) => setTds(Number(e.target.value))} />
          <div className="calcScale"><span>0</span><span>3000</span></div>
          <div className="calcAs" style={{ marginTop: 18 }}><label>{T("tools.038", "Where will it be used?")}
            <select value={use} onChange={(e) => setUse(e.target.value)} style={{ height: 44, border: '1px solid #d6e0d9', borderRadius: 10, padding: '0 10px', font: 'inherit' }}>{['Home', 'Office / commercial', 'Industry', 'Agriculture / dairy'].map((o) => <option key={o}>{o}</option>)}</select></label></div>
        </div>
        <div className="calcOut" aria-live="polite" style={{ gridTemplateColumns: '1fr' }}>
          <div><span>{b[2]}</span><b style={{ fontSize: 'clamp(20px,2.2vw,26px)', fontWeight: 700, lineHeight: 1.35 }}>{b[3]}</b></div>
        </div>
      </div>
      <p className="calcNote">{T("tools.039", "General guidance only. Water quality also depends on hardness, iron, bacteria and other contaminants, so a proper water test is recommended before choosing a system.")}</p>
      <LeadForm subject="Water treatment guide" label={T("tools.040", "Book a water test / demo")} extra={() => ({ TDS: tds + ' mg/L', Use: use, Guidance: b[2] })} />
    </Sec></div>
  );
}
