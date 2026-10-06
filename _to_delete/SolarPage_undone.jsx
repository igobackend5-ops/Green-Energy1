import React from 'react';
import { go, useReveal } from './common.jsx';
import './solarPage.css';

/* ---------- icons (24px stroke set) ---------- */
const IC = {
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2.500v3M12 18.500v3M2.500 12h3M18.500 12h3M5.300 5.300l2.100 2.100M16.600 16.600l2.100 2.100M5.300 18.700l2.100-2.100M16.600 7.400l2.100-2.100" /></>,
  chat: <path d="M4 5h16v11H9l-5 4zM8 9.500h8M8 12.500h5" />,
  design: <><path d="M4 20l1-4L16 5l3 3L8 19z" /><path d="M14 7l3 3M4 20h5" /></>,
  roof: <><path d="M3 12l9-8 9 8" /><path d="M5.500 10.500V20h13v-9.500M9 20v-5h6v5" /></>,
  build: <><rect x="5" y="3" width="14" height="18" rx="1" /><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2M10 21v-3h4v3" /></>,
  factory: <><path d="M3 21V10l6 3V10l6 3V6h3v15z" /><path d="M7 17h2M12 17h2" /></>,
  wrench: <path d="M14 6a4 4 0 0 0 5 5l-9 9a2.100 2.100 0 0 1-3-3l9-9zM4 4l5 5" />,
  monitor: <><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8M12 16v4M7 12l3-3 2.500 2L17 8" /></>,
  sliders: <path d="M4 7h10M18 7h2M4 17h2M10 17h10M14 4v6M6 14v6" />,
  home: <><path d="M3 11l9-8 9 8" /><path d="M5 10v10h14V10M10 20v-6h4v6" /></>,
  bank: <><path d="M3 10l9-6 9 6M5 10v8M9.500 10v8M14.500 10v8M19 10v8M3 20h18" /></>,
  school: <><path d="M2 9l10-5 10 5-10 5z" /><path d="M6 11.500V17c0 1.500 3 3 6 3s6-1.500 6-3v-5.500M22 9v6" /></>,
  leaf: <path d="M5 19C5 9 11 4 20 4c0 9-5 15-13 15M5 19c3-5 6-8 10-10" />,
  gov: <><path d="M3 21h18M5 21V10M19 21V10M9 21V10M15 21V10M2 10l10-7 10 7" /></>,
  grid: <><path d="M5 19V9l7-5 7 5v10" /><path d="M12 4v15M7 12h10M9 19v-4h6v4" /></>,
  battery: <><rect x="3" y="7" width="16" height="10" rx="2" /><path d="M21 10.500v3M7 10v4M11 10v4M15 10v4" /></>,
  plug: <><path d="M9 3v5M15 3v5M6 8h12v4a6 6 0 0 1-12 0zM12 18v3" /></>,
  hybrid: <><path d="M12 3v4M12 17v4M3 12h4M17 12h4" /><circle cx="12" cy="12" r="4" /><path d="M5.500 5.500l2 2M16.500 16.500l2 2" /></>,
  panel: <><path d="M3 18l3-11h15l-3 11zM5 13h15M10 7l-1 11M15.500 7l-.7 11" /><path d="M12 18v3M8 21h8" /></>,
  inverter: <><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M9 8h6M8 13c1-2 2-2 3 0s2 2 3 0M9 17h6" /></>,
  rack: <><path d="M3 20h18M6 20l3-12M18 20L15 8M4 8l16-3M9 14h7M7.500 17h10" /></>,
  cable: <><path d="M4 8c4 0 4 8 8 8s4-8 8-8M2 8h2M20 8h2" /><circle cx="3" cy="8" r="1.200" /><circle cx="21" cy="8" r="1.200" /></>,
  shield: <><path d="M12 3l8 3v6c0 5-3.500 8-8 9-4.500-1-8-4-8-9V6z" /><path d="M8.500 12l2.500 2.500L16 9.500" /></>,
  box: <><path d="M3 8l9-5 9 5v8l-9 5-9-5z" /><path d="M3 8l9 5 9-5M12 13v8" /></>,
  bolt: <path d="M13 3L5 14h6l-1 7 8-11h-6z" />,
  coin: <><circle cx="12" cy="12" r="9" /><path d="M14.500 9a3 2 0 0 0-5 0c0 3 5 1.500 5 4.500a3 2 0 0 1-5 0M12 6.500V8M12 16v1.500" /></>,
  trend: <path d="M3 17l6-6 4 4 8-9M15 6h6v6" />,
  gear: <><circle cx="12" cy="12" r="3" /><path d="M12 2.500l1.500 2.500 2.800-.7.800 2.800 2.800.8-.7 2.800L21.500 12l-2.500 1.500.7 2.800-2.800.8-.8 2.800-2.800-.7L12 21.500 10.500 19l-2.800.7-.8-2.800-2.800-.8.7-2.800L2.500 12 5 10.500l-.7-2.800 2.800-.8.8-2.800 2.800.7z" /></>,
  key: <><circle cx="8" cy="15" r="4" /><path d="M11 12l9-9M16 7l3 3M14 9l2 2" /></>,
  co2: <><path d="M7 18a4 4 0 0 1-.5-8A5.500 5.500 0 0 1 17 8.500 4.500 4.500 0 0 1 17 18z" /><path d="M9 14l2 2 4-4" /></>,
  doc: <path d="M7 3h7l5 5v13H7zM14 3v5h5M10 13h6M10 17h6" />,
  headset: <><path d="M4 14v-2a8 8 0 0 1 16 0v2" /><rect x="3.500" y="13" width="4" height="6" rx="1.500" /><rect x="16.500" y="13" width="4" height="6" rx="1.500" /><path d="M20.500 19c0 1.800-2 2.500-5 2.500" /></>,
  search: <><circle cx="11" cy="11" r="6" /><path d="M20 20l-4.500-4.500M8.500 11h5" /></>,
  user: <><circle cx="12" cy="8" r="3.500" /><path d="M5 20a7 7 0 0 1 14 0" /></>,
  arrow: <path d="M4 12h15M13 6l6 6-6 6" />,
  check: <path d="M5 12.500l4.500 4.500L19 7.500" />,
  star: <path d="M12 3l2.700 5.600 6.100.9-4.400 4.300 1 6.100L12 17l-5.400 2.900 1-6.100L3.200 9.500l6.100-.9z" />,
  heart: <path d="M12 20s-8-4.800-8-10.500A4.500 4.500 0 0 1 12 7a4.500 4.500 0 0 1 8 2.500C20 15.200 12 20 12 20z" />,
};
const I = ({ n, s = 26 }) => (
  <svg viewBox="0 0 24 24" width={s} height={s} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" shapeRendering="geometricPrecision">{IC[n] || IC.check}</svg>
);
const Arrow = () => <I n="arrow" s={18} />;

/* ---------- content ---------- */
const HERO_CARDS = [
  ['Solar Design & Consultation', 'Site assessment, energy-needs analysis, and system design for your requirements.', 'design'],
  ['Installation & Commissioning', 'Professional installation, testing, and commissioning of solar systems.', 'wrench'],
  ['Maintenance & AMC', 'Regular servicing, monitoring, and annual maintenance contracts.', 'monitor'],
  ['Government Subsidy & Documentation Assistance', 'Help with applicable subsidies, approvals, and documentation.', 'doc'],
  ['Customized Solar Solutions', "Systems tailored to each customer's site, energy needs, and budget.", 'sliders'],
];
const SOLUTIONS = [
  ['Solar Consultation', 'Understand your energy needs and recommend the right solar solution.', 'chat'],
  ['Solar System Design', 'Capacity planning and layout design built around your site and usage.', 'design'],
  ['Rooftop Solar Installation', 'Safe, professional installation on homes, buildings and rooftops.', 'roof'],
  ['Commercial Solar Solutions', 'Solar systems for offices, shops, hotels and commercial buildings.', 'build'],
  ['Industrial Solar Solutions', 'Higher-capacity solar for factories, warehouses and industrial sites.', 'factory'],
  ['Solar Maintenance & AMC', 'Regular servicing and annual maintenance for dependable performance.', 'wrench'],
  ['Solar Monitoring', 'Track generation and system health so issues are spotted early.', 'monitor'],
  ['Customized Solar Solutions', "Systems tailored to each customer's site, needs and budget.", 'sliders'],
];
const CUSTOMERS = [
  ['Residential', 'Rooftop systems for homes, villas, apartments and housing societies that cut electricity bills.', '/solutions/ind-residential.jpg', 'home'],
  ['Commercial', 'Solar for offices, retail, hotels and other businesses to control running costs.', '/solutions/ind-commercial.jpg', 'build'],
  ['Industrial', 'Large-scale rooftop and ground-mounted systems for factories and industrial units.', '/solutions/ind-industrial.jpg', 'factory'],
  ['Institutional', 'Solar for schools, colleges, hospitals and other institutions with steady daytime demand.', null, 'school'],
  ['Agricultural', 'Solar power for farms, irrigation and agricultural operations.', '/solutions/ind-agriculture.jpg', 'leaf'],
  ['Government / Public Sector', 'Solar for government buildings and public-sector facilities.', '/solutions/ind-government.jpg', 'gov'],
];
const SYSTEMS = [
  { t: 'On-Grid Solar System', ic: 'grid', d: 'Connected to the utility grid. Reduces electricity bills and can export surplus power where net metering is available.', b: ['Lower electricity bills', 'No battery required', 'Net-metering ready'], c: 'Homes, businesses and industries with reliable grid power' },
  { t: 'Off-Grid Solar System', ic: 'battery', d: 'An independent system with battery storage that works without the utility grid.', b: ['Energy independence', 'Power in remote locations', 'Battery backup'], c: 'Remote sites, farms and areas with unreliable grid supply' },
  { t: 'Hybrid Solar System', ic: 'hybrid', d: 'Combines grid connection with battery storage for backup when the grid is unavailable.', b: ['Backup during outages', 'Grid plus storage', 'Flexible energy use'], c: 'Customers who want savings and dependable backup power' },
];
const EQUIP = [
  ['Solar Panels', 'Photovoltaic modules that convert sunlight into electricity.', 'panel'],
  ['Solar Inverters', 'Convert DC power from the panels into usable AC power.', 'inverter'],
  ['Solar Batteries', 'Store solar energy for use at night or during outages.', 'battery'],
  ['Solar Mounting Structures', 'Rugged structures that hold panels securely on roofs and ground.', 'rack'],
  ['Solar Cables', 'Solar-grade cabling for safe, efficient power transfer.', 'cable'],
  ['Solar DC/AC Protection', 'Protection devices that keep the system and your site safe.', 'shield'],
  ['Solar Monitoring Systems', 'Track generation and performance in real time.', 'monitor'],
  ['Solar Accessories', 'Connectors, fittings and supporting components.', 'box'],
];
const BENEFITS = [
  ['Reduce Electricity Bills', 'Generate your own power and cut monthly energy costs.', 'bolt'],
  ['Clean & Renewable Energy', 'Power your site from the sun with no fuel and no emissions.', 'sun'],
  ['Long-Term Savings', 'A durable system that keeps saving year after year.', 'coin'],
  ['Low Maintenance', 'Few moving parts and simple routine upkeep.', 'wrench'],
  ['Energy Independence', 'Reduce reliance on the grid and rising tariffs.', 'key'],
  ['Increased Property Value', 'Solar-equipped properties are more attractive to buyers and tenants.', 'trend'],
  ['Reduced Carbon Footprint', 'Cut your environmental impact with clean generation.', 'co2'],
  ['Government Incentives / Subsidy Support', 'We help with applicable subsidies, approvals and paperwork.', 'doc'],
];
const STEPS = [
  ['Consultation', 'Understand customer requirements and energy needs.', 'chat'],
  ['Site Assessment', 'Evaluate the location, roof/site conditions, electricity usage, and installation requirements.', 'search'],
  ['System Design', 'Prepare the appropriate solar system design and capacity.', 'design'],
  ['Proposal & Approval', 'Provide quotation, system details, financial information, and required documentation.', 'doc'],
  ['Installation', 'Professionally install the solar panels, inverter, structure, wiring, and protection systems.', 'wrench'],
  ['Testing & Commissioning', 'Test the complete system and ensure safe and proper operation.', 'check'],
  ['Monitoring & Support', 'Provide monitoring, maintenance, AMC, and long-term customer support.', 'monitor'],
];
const SUPPORT = [
  ['Installation Support', 'wrench'], ['System Monitoring', 'monitor'], ['Maintenance & AMC', 'gear'], ['Troubleshooting', 'search'],
  ['Performance Monitoring', 'trend'], ['Warranty Assistance', 'shield'], ['Documentation Assistance', 'doc'], ['Customer Support', 'headset'],
];

const head = (eye, title, em, text) => (
  <div className="soHead rv"><p className="soEye"><span />{eye}</p><h2>{title} {em && <em>{em}</em>}</h2>{text && <p className="soSub">{text}</p>}</div>
);

export function SolarPage({ onQuote }) {
  const ref = useReveal();
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  return (
    <div ref={ref} className="pg so">
      {/* 1 HERO */}
      <section className="soHero" aria-labelledby="soH1">
        <i className="soLeaf a" aria-hidden="true" /><i className="soLeaf b" aria-hidden="true" />
        <div className="soHeroIn">
          <div className="soHeroCopy">
            <p className="soEye"><span />COMPLETE SOLAR SOLUTIONS</p>
            <h1 id="soH1">Everything solar, <em>under one roof</em></h1>
            <p className="soLead">From design to long-term support, we provide end-to-end solar solutions tailored to your needs.</p>
            <div className="soHeroBtns">
              <button type="button" className="soBtn" onClick={onQuote}>Get a Free Consultation <Arrow /></button>
              <div className="soTrust"><span className="soTrustIc"><I n="heart" s={22} /></span><div><b>500+</b><small>Happy Customers</small></div></div>
            </div>
          </div>
          <div className="soHeroImg"><img src="/solar-house.jpg" alt="Modern home with rooftop solar panels at sunset" width="900" height="507" /></div>
        </div>
        <ul className="soHeroCards">
          {HERO_CARDS.map(([t, d, ic], i) => (
            <li key={t}><span className="soNum">{String(i + 1).padStart(2, '0')}</span><span className="soHcIc"><I n={ic} s={26} /></span><h3>{t}</h3><p>{d}</p></li>
          ))}
        </ul>
      </section>

      {/* 2 COMPLETE SOLAR SOLUTIONS */}
      <div className="soSec" id="solar-solutions"><div className="soW">
        {head('WHAT WE DO', 'Complete Solar', 'Solutions', 'We provide end-to-end solar solutions, from consultation and design through installation, commissioning, monitoring, maintenance and support.')}
        <div className="soGrid g4">
          {SOLUTIONS.map(([t, d, ic], i) => (
            <article className="soCard rv" key={t} style={{ '--d': i * 50 + 'ms' }}>
              <span className="soIc"><I n={ic} /></span><h3>{t}</h3><p>{d}</p>
              <button type="button" className="soLink" onClick={() => scrollTo('solar-process')}>Learn More <Arrow /></button>
            </article>
          ))}
        </div>
      </div></div>

      {/* 3 BY CUSTOMER TYPE */}
      <div className="soSec alt" id="solar-customers"><div className="soW">
        {head('WHO WE SERVE', 'By', 'Customer Type', 'Solar solutions matched to the way each kind of customer uses energy.')}
        <div className="soGrid g3">
          {CUSTOMERS.map(([t, d, img, ic], i) => (
            <article className="soCust rv" key={t} style={{ '--d': i * 60 + 'ms' }}>
              <div className="soCustImg">{img ? <img src={img} alt={t + ' solar'} loading="lazy" /> : <span className="soCustFall"><I n={ic} s={56} /></span>}<span className="soCustIc"><I n={ic} s={22} /></span></div>
              <div className="soCustB"><h3>{t}</h3><p>{d}</p></div>
            </article>
          ))}
        </div>
      </div></div>

      {/* 4 SYSTEM TYPES */}
      <div className="soSec" id="solar-systems"><div className="soW">
        {head('CHOOSE YOUR SETUP', 'System', 'Types', 'Three ways to set up your solar system, depending on your grid access and backup needs.')}
        <div className="soGrid g3">
          {SYSTEMS.map((s, i) => (
            <article className="soSys rv" key={s.t} style={{ '--d': i * 80 + 'ms' }}>
              <span className="soSysIc"><I n={s.ic} s={34} /></span>
              <h3>{s.t}</h3><p>{s.d}</p>
              <ul>{s.b.map((x) => <li key={x}><I n="check" s={16} />{x}</li>)}</ul>
              <p className="soSuit"><small>SUITABLE FOR</small>{s.c}</p>
              <button type="button" className="soBtn sm" onClick={onQuote}>Explore Solution <Arrow /></button>
            </article>
          ))}
        </div>
      </div></div>

      {/* 5 SOLAR EQUIPMENT */}
      <div className="soSec alt" id="solar-equipment"><div className="soW">
        {head('QUALITY COMPONENTS', 'Solar', 'Equipment', 'The core components that make up a reliable, long-lasting solar system.')}
        <div className="soGrid g4">
          {EQUIP.map(([t, d, ic], i) => (
            <article className="soEq rv" key={t} style={{ '--d': i * 50 + 'ms' }}>
              <div className="soEqImg"><I n={ic} s={64} /></div>
              <div className="soEqB"><h3>{t}</h3><p>{d}</p><button type="button" className="soLink" onClick={onQuote}>Enquire Now <Arrow /></button></div>
            </article>
          ))}
        </div>
      </div></div>

      {/* 6 BENEFITS */}
      <div className="soSec" id="solar-benefits"><div className="soW">
        {head('WHY SOLAR', 'Benefits of', 'Going Solar', 'What switching to solar means for your costs, your site and the environment.')}
        <div className="soGrid g4">
          {BENEFITS.map(([t, d, ic], i) => (
            <article className="soBen rv" key={t} style={{ '--d': i * 50 + 'ms' }}><span className="soIc"><I n={ic} /></span><h3>{t}</h3><p>{d}</p></article>
          ))}
        </div>
      </div></div>

      {/* 7 PROCESS */}
      <div className="soSec alt" id="solar-process"><div className="soW">
        {head('HOW IT WORKS', 'Our 7 Steps', 'Solar Process', 'A clear, guided journey from your first conversation to long-term support.')}
        <ol className="soFlow">
          {STEPS.map(([t, d, ic], i) => (
            <li className="soStep rv" key={t} style={{ '--d': i * 70 + 'ms' }}>
              <span className="soStepNo">{String(i + 1).padStart(2, '0')}</span>
              <div className="soStepCard"><span className="soIc sm"><I n={ic} s={22} /></span><h3>{t}</h3><p>{d}</p></div>
            </li>
          ))}
        </ol>
      </div></div>

      {/* 8 SOLAR SUPPORT */}
      <div className="soSec" id="solar-support"><div className="soW">
        {head('AFTER INSTALLATION', 'Solar', 'Support', 'Dependable help for the life of your solar system.')}
        <div className="soGrid g4">
          {SUPPORT.map(([t, ic], i) => (
            <div className="soSup rv" key={t} style={{ '--d': i * 40 + 'ms' }}><span className="soIc sm"><I n={ic} s={22} /></span><b>{t}</b></div>
          ))}
        </div>
        <div className="soSupCta rv">
          <div><h3>Need Support for Your Solar System?</h3><p>Our team is ready to help with servicing, monitoring, warranty and documentation.</p></div>
          <div className="soBtnRow"><button type="button" className="soBtn" onClick={() => go('/contact')}>Get Support <Arrow /></button><button type="button" className="soBtn ghost" onClick={() => go('/contact')}>Contact Us <Arrow /></button></div>
        </div>
      </div></div>

      {/* 9 FINAL CTA */}
      <section className="soFinal" aria-labelledby="soFinalT">
        <div className="soFinalIn rv">
          <p className="soEye lt"><span />GO SOLAR</p>
          <h2 id="soFinalT">Ready to Switch to Solar?</h2>
          <p>Let our experts design the right solar solution for your energy needs.</p>
          <div className="soBtnRow c"><button type="button" className="soBtn" onClick={onQuote}>Get a Free Consultation <Arrow /></button><button type="button" className="soBtn ghost lt" onClick={() => go('/contact')}>Contact Us <Arrow /></button></div>
        </div>
      </section>
    </div>
  );
}
