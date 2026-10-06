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

/* ============================ END-TO-END SOLUTIONS ============================ */
const E2E_IC = {
  chat: <><circle cx="9" cy="8" r="3" /><path d="M3.5 19v-1.5A4.5 4.5 0 0 1 8 13h2a4.5 4.5 0 0 1 4.500 4.500V19" /><circle cx="17" cy="9" r="2.500" /><path d="M15 13.200A4 4 0 0 1 20.500 17V18.500M12.500 3.500h6.500v4h-2l-2 1.600V7.500h-2.500z" /></>,
  doc: <><path d="M5 4h11v16H5zM8 8h5M8 11.500h5M8 15h3" /><path d="M20 9l-6 6-2.500.5.500-2.500 6-6z" /></>,
  gear: <><circle cx="12" cy="12" r="3.200" /><path d="M12 3l1.400 2.300 2.600-.6.9 2.500 2.500.9-.6 2.600L21 12l-2.200 1.400.6 2.600-2.500.9-.9 2.500-2.600-.6L12 21l-1.400-2.200-2.600.6-.9-2.500-2.500-.9.6-2.600L3 12l2.200-1.400-.6-2.600 2.500-.9.9-2.500 2.600.6z" /></>,
  cart: <><path d="M3 4h2.500l2.200 11h10l2-8H7" /><circle cx="9.500" cy="19" r="1.400" /><circle cx="17" cy="19" r="1.400" /></>,
  worker: <><path d="M6.500 12a5.500 5.500 0 0 1 11 0M4.500 12h15M12 6.500V4M8 15.500c0-1 1-1.800 2-2h4c1 .2 2 1 2 2V20H8z" /><circle cx="12" cy="10" r="0" /></>,
  bolt: <><circle cx="12" cy="12" r="9" /><path d="M13 6l-4.500 7H12l-1 5 4.500-7H12z" /></>,
  chart: <><rect x="3.500" y="4" width="17" height="12" rx="1.500" /><path d="M8 20h8M12 16v4M7 12.500l3-3 2.500 2L17 8" /></>,
  sliders: <><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M8 9h8M8 15h8" /><circle cx="14" cy="9" r="1.600" /><circle cx="10" cy="15" r="1.600" /></>,
  headset: <><path d="M5 14v-2a7 7 0 0 1 14 0v2" /><rect x="4" y="13" width="3.500" height="5.500" rx="1.500" /><rect x="16.500" y="13" width="3.500" height="5.500" rx="1.500" /><path d="M18.500 18.500c0 1.800-2 2.500-5 2.500" /></>,
  leaf: <path d="M5 19C5 9 11 4 20 4c0 9-5 15-13 15M5 19c3-5 6-8 10-10" />,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></>,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2.500v3M12 18.500v3M2.500 12h3M18.500 12h3M5.300 5.300l2.100 2.100M16.600 16.600l2.100 2.100M5.300 18.700l2.100-2.100M16.600 7.400l2.100-2.100" /></>,
};
const E2E = ({ n, size = 34 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{E2E_IC[n]}</svg>
);
const STEPS = [
  ['Consultation', 'We understand your energy needs, goals and site requirements to recommend the best solution.', 'chat'],
  ['Design & Planning', 'We create detailed designs and customized plans to maximize efficiency and long-term value.', 'doc'],
  ['Engineering', 'Our experts handle technical engineering and system integration for optimal performance.', 'gear'],
  ['Procurement', 'We source high-quality equipment and materials from trusted global suppliers.', 'cart'],
  ['Installation', 'Our skilled team ensures safe, efficient and on-time installation at your site.', 'worker'],
  ['Commissioning', 'We test, validate and fine-tune the system for peak performance.', 'bolt'],
  ['Monitoring & Maintenance', 'We provide real-time monitoring and proactive maintenance for uninterrupted green energy.', 'chart'],
  ['Customization', 'We tailor solutions based on your specific requirements and future growth plans.', 'sliders'],
  ['After-sales Support', 'Reliable support and quick assistance whenever you need us.', 'headset'],
];
const E2E_GREEN = new Set([1, 4, 5, 8, 9]);
const E2E_FOOT = [['leaf', 'Cleaner Energy'], ['globe', 'Sustainable Communities'], ['sun', 'A Greener Future']];

export function CapabilityMatrix() {
  return (
    <section className="e2e" aria-labelledby="e2eTitle">
      <div className="e2eArt" aria-hidden="true"><img src="/services-scene.jpg" alt="" loading="lazy" /><span className="e2eScript">Clean Energy<br />Greener Tomorrow</span></div>
      <div className="e2eIn">
        <header className="e2eHead">
          <p className="e2eEye"><span />YOUR SUSTAINABLE FUTURE, OUR COMMITMENT</p>
          <h2 id="e2eTitle">End-to-End <em>Solutions</em></h2>
          <p className="e2eLead">From concept to long-term support, we provide complete renewable energy solutions under one roof — designed for a cleaner, greener and more sustainable tomorrow.</p>
        </header>
        <ol className="e2eList">
          {STEPS.map(([t, d, ic], i) => {
            const n = i + 1;
            return (
              <li key={t} className={'e2eStep ' + (n % 2 ? 'L' : 'R') + (E2E_GREEN.has(n) ? ' g' : ' w')}>
                {n % 2 === 0 && <svg className="e2eCon" viewBox="0 0 48 30" aria-hidden="true"><circle cx="3" cy="3" r="2.500" /><path d="M3 3c14 0 8 24 22 24h20" /></svg>}
                <span className="e2eNo">{String(n).padStart(2, '0')}</span>
                <span className="e2eIc"><E2E n={ic} /></span>
                <div className="e2eTx"><h3>{t}</h3><p>{d}</p></div>
              </li>
            );
          })}
          <li className="e2eFoot" aria-label="Our commitment">
            {E2E_FOOT.map(([ic, t]) => <span key={t}><E2E n={ic} size={30} />{t}</span>)}
          </li>
        </ol>
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
