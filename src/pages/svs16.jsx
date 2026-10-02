import React from 'react';
import { Ic, go } from './common.jsx';

const PH = { solar: '/solutions/solar.jpg', wind: '/solutions/wind.jpg', biogas: '/solutions/biogas.jpg', water: '/solutions/water.jpg' };

/* small stroke icons for the matrix rows / feature strips */
const P = {
  chat: <path d="M4 5h16v11H9l-5 4zM8 10h8M8 13h5" />,
  doc: <path d="M6 3h9l4 4v14H6zM15 3v4h4M9 12h7M9 16h7M9 9h3" />,
  gear: <><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1" /></>,
  tools: <path d="M14 6a4 4 0 0 0 5 5l-9 9a2.1 2.1 0 0 1-3-3l9-9zM4 4l5 5M6 3l-3 3" />,
  worker: <><circle cx="12" cy="8" r="3.5" /><path d="M5 20v-2a7 7 0 0 1 14 0v2M8.5 6.5h7" /></>,
  target: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3.5" /></>,
  chart: <path d="M4 20V10M10 20V4M16 20v-8M22 20H2" />,
  sliders: <path d="M4 7h10M18 7h2M4 17h2M10 17h10M14 4v6M6 14v6" />,
  headset: <path d="M4 14v-2a8 8 0 0 1 16 0v2M4 14h3v5H4zM17 14h3v5h-3zM20 19c0 1.5-2 2-5 2" />,
  coins: <><ellipse cx="12" cy="6" rx="7" ry="3" /><path d="M5 6v6c0 1.7 3 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3 3 7 3s7-1.3 7-3v-6" /></>,
  shield: <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6zM8.5 12l2.5 2.5L16 9.5" />,
  infinity: <path d="M7 8c-3 0-4.5 2-4.5 4s1.5 4 4.5 4c5 0 5-8 10-8 3 0 4.5 2 4.5 4s-1.5 4-4.5 4c-5 0-5-8-10-8z" />,
  leaf: <path d="M5 19C5 9 11 4 20 4c0 9-5 15-13 15M5 19c3-5 6-8 10-10" />,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  users: <><circle cx="9" cy="8" r="3.2" /><path d="M3 20v-1a6 6 0 0 1 12 0v1M16 5a3.2 3.2 0 0 1 0 6M18 14a6 6 0 0 1 3 5v1" /></>,
  grid: <><rect x="4" y="4" width="7" height="7" rx="2" /><rect x="13" y="4" width="7" height="7" rx="2" /><rect x="4" y="13" width="7" height="7" rx="2" /><rect x="13" y="13" width="7" height="7" rx="2" /></>,
  person: <><circle cx="12" cy="8" r="3.6" /><path d="M4.5 20a7.5 7.5 0 0 1 15 0" /></>,
  play: <path d="M8 5l11 7-11 7z" />,
};
const Gi = ({ n, size = 22, fill }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{P[n]}</svg>
);

/* ============================ SERVICE CAPABILITY MATRIX ============================ */
const MCARDS = [
  { k: 'solar', t: 'Solar', d: 'Clean power for homes, businesses and industries.', ic: 'sun' },
  { k: 'wind', t: 'Wind', d: 'Renewable power for a sustainable future.', ic: 'wind' },
  { k: 'biogas', t: 'Biogas', d: 'Waste to clean energy for a circular economy.', ic: 'leaf' },
  { k: 'water', t: 'Water', d: 'Cleaner water for healthier communities.', ic: 'drop' },
];
/* 1 = included, 0 = not specified, 2 = terms to be finalised */
const ROWS = [
  ['Consultation', 'Understanding your needs and recommending the right solution', 'chat', [1, 1, 0, 0]],
  ['Design & Planning', 'Site study, technical design and customized solution', 'doc', [1, 1, 1, 1]],
  ['Engineering', 'Detailed engineering and system integration', 'gear', [0, 1, 1, 1]],
  ['Procurement', 'Sourcing high-quality equipment and materials', 'tools', [1, 1, 1, 1]],
  ['Installation', 'Professional and safe installation', 'worker', [1, 1, 1, 1]],
  ['Commissioning', 'Testing and handover for optimal performance', 'target', [1, 1, 1, 1]],
  ['Monitoring & Maintenance', 'Ongoing performance monitoring and support', 'chart', [1, 1, 1, 1]],
  ['Customization', 'Tailored solutions based on specific requirements', 'sliders', [1, 0, 1, 1]],
  ['After-sales Support', 'Technical support and service assistance', 'headset', [1, 1, 2, 0]],
];
const STRIP = [
  ['coins', 'Cost-Efficient Solutions', 'Optimized design and execution to reduce long-term costs.'],
  ['shield', 'Reliable & Scalable', 'Solutions built for performance and future growth.'],
  ['leaf', 'Sustainable Impact', 'Cleaner energy and water for a healthier tomorrow.'],
  ['headset', 'End-to-End Support', 'From consultation to long-term maintenance.'],
];
const Mark = ({ v }) => v === 1
  ? <span className="cmOk" role="img" aria-label="Included"><svg width="22" height="22" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="currentColor" /><path d="M7 12.5l3.2 3.2L17 8.8" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
  : v === 2 ? <span className="cmTbc">TBC<span className="sr">Terms to be finalised</span></span>
  : <span className="cmNo" role="img" aria-label="Not specified" />;

export function CapabilityMatrix() {
  return (
    <section className="cm" aria-labelledby="cmTitle">
      <i className="cmLeaf a" aria-hidden="true" /><i className="cmLeaf b" aria-hidden="true" />
      <div className="cmIn">
        <div className="cmTop">
          <div className="cmCopy">
            <p className="cmEye"><span />SERVICE CAPABILITY MATRIX</p>
            <h2 id="cmTitle">What each service <em>includes</em></h2>
            <p className="cmLead">Explore the key services we offer across solar, wind, biogas and water treatment. Each solution is designed to meet specific needs, and the table shows exactly what is included in each service.</p>
          </div>
          <div className="cmCards">
            {MCARDS.map((c) => (
              <article className="cmCard" key={c.k}>
                <span className="cmBadge"><Ic n={c.ic} size={26} /></span>
                <div className="cmPh"><img src={PH[c.k]} alt="" loading="lazy" /></div>
                <div className="cmTx"><h3>{c.t}</h3><p>{c.d}</p></div>
              </article>
            ))}
          </div>
        </div>

        <div className="cmTblWrap" tabIndex={0} role="region" aria-label="Service capability table">
          <table className="cmTbl">
            <thead><tr><th scope="col">Services</th>{MCARDS.map((c) => <th scope="col" key={c.k}>{c.t}</th>)}</tr></thead>
            <tbody>
              {ROWS.map(([t, d, ic, vals]) => (
                <tr key={t}>
                  <th scope="row"><span className="cmRi"><Gi n={ic} size={20} /></span><span className="cmRt"><b>{t}</b><small>{d}</small></span></th>
                  {vals.map((v, i) => <td key={i}><Mark v={v} /></td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ul className="cmLegend">
          <li><Mark v={1} /> Included</li>
          <li><span className="cmTbc">TBC</span> Terms to be finalised</li>
          <li><span className="cmNo" /> Not specified</li>
        </ul>

        <div className="cmStrip">
          {STRIP.map(([ic, t, d]) => (
            <div className="cmSi" key={t}><span className="cmSic"><Gi n={ic} size={30} /></span><div><b>{t}</b><p>{d}</p></div></div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================ HOW THEY WORK TOGETHER ============================ */
const FEATS = [['leaf', 'Integrated Planning'], ['gear', 'Optimized Efficiency'], ['chart', 'Lower Lifecycle Cost'], ['infinity', 'Long-Term Sustainability']];
const NODES = [
  { k: 'solar', ic: 'sun', t: 'Solar', s: 'Clean Power for Today', d: 'Utilize abundant solar energy to generate clean and reliable electricity for your operations.' },
  { k: 'water', ic: 'drop', t: 'Water Treatment', s: 'Cleaner Water for Healthier Communities', d: 'Advanced treatment solutions for safe, reusable water and a cleaner environment.' },
  { k: 'wind', ic: 'wind', t: 'Wind', s: 'Renewable Power for Tomorrow', d: 'Harness the power of wind to deliver scalable and sustainable energy solutions.' },
  { k: 'biogas', ic: 'leaf', t: 'Biogas', s: 'Waste to Clean Energy', d: 'Convert organic waste into renewable biogas for a circular and greener economy.' },
];

export function HowTogether({ onQuote }) {
  return (
    <section className="ht" aria-labelledby="htTitle">
      <div className="htScene" aria-hidden="true"><img src="/services-scene.jpg" alt="" loading="lazy" /></div>
      <i className="htLeaf a" aria-hidden="true" /><i className="htLeaf b" aria-hidden="true" />
      <div className="htIn">
        <div className="htCopy">
          <p className="htEye"><span />HOW THEY WORK TOGETHER</p>
          <h2 id="htTitle">One Partner.<br /><span className="g1">Four Ways</span> to <span className="g2">Go Green.</span></h2>
          <p className="htLead">Energy and water needs rarely come alone. By integrating solar, wind, biogas and water treatment, we design complete, future-ready solutions under one roof — so you get better efficiency, lower costs and a greener tomorrow.</p>
          <ul className="htFeats">
            {FEATS.map(([ic, t]) => <li key={t}><span className="htFi"><Gi n={ic} size={24} /></span><b>{t}</b></li>)}
          </ul>
          <div className="htBtns">
            <button type="button" className="pgBtn" onClick={onQuote}>Get a Smart Quote <Ic n="arrow" size={18} /></button>
            <a className="htGhost" href="#htViz" onClick={(e) => { e.preventDefault(); document.getElementById('htViz')?.scrollIntoView({ behavior: 'smooth', block: 'center' }); }}><span className="htPlay"><Gi n="play" size={14} fill /></span>See How It Works</a>
          </div>
        </div>

        <div className="htViz" id="htViz">
          <div className="htBox">
            <svg className="htArrows" viewBox="0 0 100 66" aria-hidden="true" preserveAspectRatio="none">
              <ellipse cx="53" cy="33" rx="31" ry="30" fill="none" stroke="rgba(255,255,255,.7)" strokeWidth=".35" />
              <ellipse cx="53" cy="33" rx="25" ry="24" fill="none" stroke="rgba(30,123,57,.45)" strokeWidth=".3" strokeDasharray="1.2 1.2" />
            </svg>
            <div className="htCore"><Gi n="leaf" size={30} /><b>Integrated <br />Sustainable <br />Solutions</b><i /></div>
            {NODES.map((n) => (
              <div className={'htNode n-' + n.k} key={n.k}>
                <div className="htCirc">
                  <span className="htBadge"><Ic n={n.ic} size={22} /></span>
                  <img src={PH[n.k]} alt="" loading="lazy" />
                  <div className="htCt"><h3>{n.t}</h3><p>{n.s}</p></div>
                </div>
                <div className="htCall"><i /><p>{n.d}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


/* ============================ SMART TOOLS & ASSISTANCE ============================ */
const TOOLS = [
  { k: 'solar', ic: 'sun', img: '/solutions/solar.jpg', t: 'Solar Savings Calculator', soon: true, d: 'Estimate what solar could save you based on your location, usage and system size.', label: 'Go to Solar', style: 'fill' },
  { k: 'water', ic: 'drop', img: '/solutions/water.jpg', t: 'Water Quality / RO Advisor', soon: true, d: 'Match a treatment approach to your water quality and application needs.', label: 'Go to Water Treatment', style: 'outline' },
  { k: 'quote', ic: 'doc', img: '/solutions/wind.jpg', t: 'Smart Quote / Site Survey', d: 'Tell us about your site and requirement, and we will shape a solution around it.', label: 'Request a quote', style: 'fill' },
];
const Tick = () => <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="#2f9c3c" /><path d="M7 12.5l3.2 3.2L17 8.8" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>;

export function SmartTools({ onQuote }) {
  const act = { solar: () => go('/services/solar'), water: () => go('/services/water'), quote: onQuote };
  return (
    <section className="st" aria-labelledby="stTitle">
      <i className="stLeaf l1" aria-hidden="true" /><i className="stLeaf l2" aria-hidden="true" /><i className="stLeaf l3" aria-hidden="true" /><i className="stLeaf l4" aria-hidden="true" />
      <svg className="stWave" viewBox="0 0 1000 80" preserveAspectRatio="none" aria-hidden="true"><path d="M0 80V52C160 22 330 20 520 44s340 16 480-14v50z" fill="#1e7b39" opacity=".18" /><path d="M0 80V64c180-26 360-22 540-2s320 12 460-10v28z" fill="#1e7b39" opacity=".32" /></svg>
      <div className="stIn">
        <header className="stHead">
          <p className="stEye"><span />SMART TOOLS &amp; ASSISTANCE<span /></p>
          <h2 id="stTitle">Plan before you <em>commit</em></h2>
          <p>Use our smart tools to understand your requirements, estimate benefits and get expert guidance before you make a commitment.</p>
        </header>
        <div className="stGrid">
          {TOOLS.map((c, i) => (
            <article className="stCard rv" key={c.k} style={{ '--d': i * 110 + 'ms' }}>
              <div className="stPh"><img src={c.img} alt="" loading="lazy" /></div>
              {c.k === 'solar' && (
                <aside className="stMini m-solar"><b><Gi n="coins" size={15} /> Estimated Savings</b>
                  <span className="stBars" aria-hidden="true"><i /><i /><i /><i /><i /></span><small>Save up to 40–70%</small></aside>
              )}
              {c.k === 'water' && (
                <aside className="stMini m-water"><b><Ic n="drop" size={15} /> Find the Right Solution</b>
                  <ul><li><Tick />Water Quality</li><li><Tick />Capacity</li><li><Tick />Treatment Type</li></ul></aside>
              )}
              {c.k === 'quote' && (
                <aside className="stMini m-quote"><ul>
                  <li><Gi n="clock" size={17} />Quick &amp; Easy</li><li><Gi n="users" size={17} />Expert Guidance</li><li><Gi n="doc" size={17} />Tailored Solutions</li></ul></aside>
              )}
              <span className="stIc"><Ic n={c.ic} size={34} /></span>
              <div className="stBody">
                {c.soon && <span className="stSoon">COMING SOON</span>}
                <h3>{c.t}</h3>
                <p>{c.d}</p>
                <button type="button" className={'stBtn ' + c.style} onClick={act[c.k]}>{c.label} <Ic n="arrow" size={18} /></button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}


/* ============================ SOLAR: COMPLETE SOLAR SOLUTIONS ============================ */
const SOL_STEPS = [
  ['01', 'sun', 'Solar Design & Consultation', 'Site assessment, energy-needs analysis, and system design for the best performance and savings.'],
  ['02', 'tools', 'Installation & Commissioning', 'Professional installation, testing, and commissioning of solar systems.'],
  ['03', 'shield', 'Maintenance & AMC', 'Regular servicing, monitoring, and annual maintenance contracts.'],
  ['04', 'doc', 'Government Subsidy & Documentation Assistance', 'Help with applicable subsidies, approvals, and paperwork.'],
  ['05', 'grid', 'Customized Solar Solutions', "Systems tailored to each customer's site, energy needs, and budget."],
];

export function SolarComplete({ onQuote }) {
  return (
    <section className="sl" aria-labelledby="slTitle">
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true"><defs><clipPath id="slClip" clipPathUnits="objectBoundingBox"><path d="M0,0 H1 V0.985 C0.82,1 0.62,0.97 0.44,0.93 C0.22,0.88 0.1,0.45 0,0 Z" /></clipPath></defs></svg>
      <i className="slLeaf a" aria-hidden="true" /><i className="slLeaf b" aria-hidden="true" /><i className="slLeaf c" aria-hidden="true" />
      <div className="slVis" aria-hidden="true">
          <img src="/solar-house.jpg" alt="" loading="lazy" />
        </div>
      <div className="slTop">
        <div className="slCopy">
          <p className="slEye"><span />COMPLETE SOLAR SOLUTIONS</p>
          <h2 id="slTitle">Everything solar,<br /><em>under one <span className="slU">roof<svg viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden="true"><path d="M2 8c40-6 100-7 196-3" fill="none" stroke="#f2b705" strokeWidth="3" strokeLinecap="round" /></svg></span></em></h2>
          <p className="slLead">From design to long-term support, we provide end-to-end solar solutions tailored to your needs.</p>
          <div className="slCta">
            <button type="button" className="slBtn" onClick={onQuote}>Get a Free Consultation <span><Ic n="arrow" size={16} /></span></button>
            <div className="slProof"><span className="slAv" aria-hidden="true"><i><Gi n="person" size={16} /></i><i><Gi n="person" size={16} /></i><i><Gi n="person" size={16} /></i></span><div><b>500+</b><small>Happy Customers</small></div></div>
          </div>
        </div>
      </div>
      <div className="slBottom">
        <svg className="slLine" viewBox="0 0 1000 40" preserveAspectRatio="none" aria-hidden="true"><path d="M0 28C40 26 70 22 100 20C170 10 230 10 300 20C370 30 430 30 500 20C570 10 630 10 700 20C770 30 830 30 900 20C940 16 970 14 1000 12" fill="none" stroke="rgba(60,160,80,.55)" strokeWidth="1.6" /></svg>
        <ol className="slSteps">
          {SOL_STEPS.map(([n, ic, t, d], i) => (
            <li className={'slStep ' + (i % 2 ? 'y' : 'g')} key={n} style={{ '--i': i }}>
              <span className="slIc">{ic === 'sun' ? <Ic n="sun" size={30} /> : <Gi n={ic} size={30} />}</span>
              <span className="slNo">{n}</span>
              <h3>{t}</h3>
              <p>{d}</p>
              <button type="button" className="slGo" aria-label={'Learn more: ' + t} onClick={onQuote}><Ic n="arrow" size={16} /></button>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
