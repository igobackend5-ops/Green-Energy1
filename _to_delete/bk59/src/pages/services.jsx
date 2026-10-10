import React from 'react';
import { SolarServices } from './solarServices.jsx';
import { SolarCustomers } from './solarCustomers.jsx';
import { WindHero } from './windHero.jsx';
import { WindSolutions } from './windSolutions.jsx';
import { CapabilityMatrix, SmartTools, SolarComplete } from './svSections.jsx';
import { SolarProductsList, SolarProjectsList, openSolarChoice } from './SolarChoice.jsx';
import { Link, go, useReveal, Ic, Head, Sec, ServiceHero, Cta, ToolCard, Check, Flow, Turbine } from './common.jsx';

import { T } from '../content/T.js';
const IMG = { solar: '/solutions/solar.jpg', wind: '/solutions/wind.jpg', biogas: '/solutions/biogas.jpg', water: '/solutions/water.jpg' };
const soonTool = (onQuote) => onQuote;

/* ============================== SERVICES ============================== */
const CARDS = [
  { k: 'solar', ic: 'sun', t: T("services.001", "Solar Services"), d: T("services.002", "Complete end-to-end solar for homes, businesses and industries, from design and consultation to AMC."), cap: T("services.003", "1 kW to 5 MW and above") },
  { k: 'wind', ic: 'wind', t: T("services.004", "Wind Services"), d: T("services.005", "Consultation, feasibility, turbine installation, turnkey EPC and O&M for small and utility-scale wind."), cap: T("services.006", "Up to 100 kW · 1 MW to 3 MW and above") },
  { k: 'biogas', ic: 'leaf', t: T("services.007", "Bio Gas Services"), d: T("services.008", "Plants that convert organic waste into clean cooking gas, electricity and organic manure."), cap: T("services.009", "1 m³/day to large-scale CBG") },
  { k: 'water', ic: 'drop', t: T("services.010", "Water Treatment Services"), d: T("services.011", "Reverse Osmosis and demineralization systems, delivered as new plants or turnkey EPC."), cap: T("services.012", "Medium-scale, 10–100 KLD") },
];
const CAPS = [T("services.013", "Consultation"), T("services.014", "Design"), T("services.015", "Engineering"), T("services.016", "Installation"), T("services.017", "Commissioning"), T("services.018", "Maintenance / O&M"), T("services.019", "Customization"), T("services.020", "After-sales support")];
/* 1 offered, 0 not specified in client answers, 2 terms to be finalised */
const MATRIX = { solar: [1, 1, 0, 1, 1, 1, 1, 1], wind: [1, 1, 1, 1, 1, 1, 0, 1], biogas: [0, 1, 1, 1, 1, 1, 1, 2], water: [0, 1, 1, 1, 1, 1, 1, 0] };
const NAMES = { solar: 'Solar', wind: 'Wind', biogas: 'Biogas', water: 'Water' };

export function ServicesPage({ onQuote }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="pg pgServices">
      <div className="svHero">
        <div className="svLeaf l1" aria-hidden="true" /><div className="svLeaf l2" aria-hidden="true" /><div className="svLeaf l3" aria-hidden="true" />
        <div className="svVis" aria-hidden="true"><img src={T("services.021", "/services-hero.jpg")} srcSet="/services-hero.jpg 1148w, /services-hero@2x.jpg 2296w" sizes="(max-width: 760px) 100vw, 64vw" alt="" decoding="async" /><i className="svBlade" />
          <svg className="svPins" viewBox="0 0 1148 764" preserveAspectRatio="xMinYMid slice" shapeRendering="geometricPrecision">
            <defs><filter id="svPinSh" x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#0b3d13" floodOpacity=".28" /></filter></defs>
            <g filter="url(#svPinSh)" fill="#fff"><circle cx="748" cy="258" r="42" /><circle cx="538" cy="429" r="42" /><circle cx="275" cy="573" r="42" /><circle cx="951" cy="594" r="42" /></g>
            <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3">
              <g transform="translate(748 258)" stroke="#1e8a4c"><path d="M0 -3V24M-9 24H9" /><circle cx="0" cy="-5" r="3" fill="#1e8a4c" /><path d="M0 -8C-1 -15 -3 -20 -4 -25C0 -22 1 -16 1 -8zM3 -4C10 -3 15 0 20 4C14 5 8 3 3 -3zM-3 -3C-9 0 -14 4 -17 10C-11 10 -6 6 -3 -2z" fill="#1e8a4c" strokeWidth="1.2" /></g>
              <g transform="translate(538 429)" stroke="#2f9c3c"><path d="M-17 15C-17 -8 -2 -19 18 -19C18 3 6 17 -13 15" strokeWidth="3.2" /><path d="M-17 17C-8 6 0 -2 10 -9" strokeWidth="3" /><path d="M-3 4C2 4 6 2 9 -1" strokeWidth="2.4" /></g>
              <g transform="translate(275 573)" stroke="#1673b8"><path d="M-22 12L-14 -10H22L14 12zM-18 1H18M-8 -10L-12 12M2 -10L-1 12M12 -10L8 12" strokeWidth="2.6" /><path d="M-14 -20L-14 -15M0 -22V-17M14 -20V-15" stroke="#2f9c3c" strokeWidth="2.4" /><path d="M0 12V24" stroke="#2f9c3c" strokeWidth="2.4" /></g>
              <g transform="translate(951 594)" stroke="#1792c8"><path d="M0 -26C10 -12 18 -3 18 7A18 18 0 0 1 -18 7C-18 -3 -10 -12 0 -26z" fill="#2aa7dc" stroke="#1792c8" strokeWidth="2" /><path d="M-8 8A8 8 0 0 0 0 16" stroke="#fff" strokeWidth="3" /></g>
            </g>
          </svg></div>
        <svg className="svWave" viewBox="0 0 1000 100" preserveAspectRatio="none" aria-hidden="true"><path d="M0 62C140 40 300 66 460 60C560 56 640 40 760 30L760 100L0 100Z" fill="#dff1dc" opacity=".7" /><path d="M0 74C150 56 300 80 460 74C560 70 650 58 760 52L760 100L0 100Z" fill="#14522f" /></svg>
        <div className="svIn">
          <div className="svCopy">
            <p className="svEye"><span />{T("services.022", "OUR SERVICES")}</p>
            <h1>{T("services.023", "Integrated Clean Energy &")} <em>{T("services.024", "Water Solutions")}</em></h1>
            <p className="svLead">{T("services.025", "iGo Green Energy provides end-to-end renewable energy and water treatment solutions — solar, wind, biogas and water treatment — delivered by one partner from consultation to long-term support.")}</p>
            <ul className="svHL">
              {[['sun', 'Solar', 'Clean Power for Today'], ['wind', 'Wind', 'Renewable Power for Tomorrow'], ['leaf', 'Biogas', 'Waste to Clean Energy'], ['drop', 'Water Treatment', 'Clean Water for Healthier Communities']].map(([ic, t, d], i) => (
                <li key={t} style={{ '--i': i }}><span className="svIc"><Ic n={ic} size={26} /></span><b>{t}</b><small>{d}</small></li>
              ))}
            </ul>
            <div className="svBtns">
              <button className="pgBtn" onClick={onQuote}>{T("services.026", "Get a Smart Quote")} <Ic n="arrow" size={18} /></button>
              <a className="svGhost" href="#overview" onClick={(e) => { e.preventDefault(); document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth' }); }}>{T("services.027", "Explore Our Services")} <Ic n="arrow" size={18} /></a>
            </div>
          </div>
        </div>
      </div>

      <Sec id="overview">
        <Head eyebrow={T("services.028", "FOUR SERVICE VERTICALS")} title={T("services.029", "Choose the solution")} em={T("services.030", "you need")} center />
        <div className="svcGrid">
          {CARDS.map((c, i) => (
            <article key={c.k} className="svcCard rv" style={{ '--d': i * 70 + 'ms' }}>
              <div className="svcImg"><img src={IMG[c.k]} alt={c.t} loading="lazy" /><span><Ic n={c.ic} size={22} /></span></div>
              <div className="svcBody"><h3>{c.t}</h3><p>{c.d}</p></div>
            </article>
          ))}
        </div>
      </Sec>

      <SolarServices />

      <CapabilityMatrix />

      <SmartTools onQuote={onQuote} />

      <Sec><Cta eyebrow={T("services.034", "READY TO START?")} title={T("services.035", "Get a")} em={T("services.036", "Smart Quote")} text={T("services.037", "Share your site and requirement. We'll help shape the right solution.")} label={T("services.038", "Get a Smart Quote")} onClick={onQuote} /></Sec>
    </div>
  );
}

/* ============================== SOLAR ============================== */
const SOLAR_STEPS = [
  { t: T("services.039", "Consultation"), d: T("services.040", "We understand the customer's energy needs, goals, and budget.") },
  { t: T("services.041", "Site Survey"), d: T("services.042", "We assess the roof or land, shading, and electrical setup.") },
  { t: T("services.043", "Design and Proposal"), d: T("services.044", "System design, equipment selection, savings estimate, and quotation.") },
  { t: T("services.045", "Approvals and Subsidy"), d: T("services.046", "Documentation, net metering, and subsidy applications.") },
  { t: T("services.047", "Procurement and Installation"), d: T("services.048", "Equipment delivery and installation by certified partners.") },
  { t: T("services.049", "Testing and Commissioning"), d: T("services.050", "Performance testing, safety checks, and grid connection.") },
  { t: T("services.051", "Handover and Support"), d: T("services.052", "Training, monitoring setup, and warranty and AMC support.") },
];
export function SolarPage({ onQuote, noHero }) {
  const ref = useReveal();
  const solutions = [[T("services.053", "Solar Design & Consultation"), T("services.054", "Site assessment, energy-needs analysis, and system design for the best performance and savings."), 'sun'], [T("services.055", "Installation & Commissioning"), T("services.056", "Professional installation, testing, and commissioning of solar systems."), 'tool'], [T("services.057", "Maintenance & AMC"), T("services.058", "Regular servicing, monitoring, and annual maintenance contracts."), 'shield'], [T("services.059", "Government Subsidy & Documentation Assistance"), T("services.060", "Help with applicable subsidies, approvals, and paperwork."), 'doc'], [T("services.061", "Customized Solar Solutions"), T("services.062", "Systems tailored to each customer's site, energy needs, and budget."), 'grid']];
  const segs = [[T("services.063", "Residential Solar"), 'home', T("services.064", "Rooftop systems for homes, villas, apartments, and housing societies that cut electricity bills and give energy independence.")], [T("services.065", "Commercial Solar"), 'build', T("services.066", "Systems for offices, shops, malls, hotels, hospitals, and schools that reduce operating costs and improve sustainability credentials.")], [T("services.067", "Industrial Solar"), 'factory', T("services.068", "High-capacity systems for factories, manufacturing units, and warehouses that lower power costs and support long-term energy security.")]];
  const types = [[T("services.069", "On-Grid"), T("services.070", "Connected to the utility grid; reduces electricity bills and allows surplus power to be exported through net metering, where available.")], [T("services.071", "Off-Grid"), T("services.072", "Independent systems with battery storage, ideal for remote locations or areas with unreliable grid supply.")], [T("services.073", "Hybrid"), T("services.074", "Combines solar, battery backup, and grid connection for uninterrupted power and maximum savings.")]];
  const benefits = [[T("services.075", "Lower Electricity Bills"), T("services.076", "Cut power costs significantly and enjoy a quick payback on your investment.")], [T("services.077", "Clean Energy"), T("services.078", "Reduce your carbon footprint with pollution-free power from the sun.")], [T("services.079", "Energy Independence"), T("services.080", "Reduce reliance on the grid, with battery backup options for uninterrupted power.")], [T("services.081", "Low Maintenance, Long Life"), T("services.082", "Durable systems designed to perform for up to 25 years with minimal upkeep.")], [T("services.083", "Subsidies and Tax Benefits"), T("services.084", "Take advantage of applicable government incentives, with our documentation support.")], [T("services.085", "Higher Property Value"), T("services.086", "A solar-powered property is more attractive and more valuable.")]];
  return (
    <div ref={ref} className="pg th-solar">
      {!noHero && <ServiceHero eyebrow={T("services.087", "SOLAR ENERGY")} title={T("services.088", "Power Your Future with")} em={T("services.089", "Solar Energy")} fx="fxSolar" plain img="/solar-hero.jpg" alt={T("services.090", "Technicians in hard hats installing solar panels on a commercial rooftop")} onQuote={onQuote}
        text={T("services.091", "Complete, end-to-end solar solutions from 1 kW to 5 MW and above, for homes, businesses and industries.")} />}

      <SolarComplete onQuote={onQuote} />

      <SolarCustomers items={segs} onQuote={onQuote} />

      <Sec><Head eyebrow={T("services.095", "SYSTEM TYPES")} title={T("services.096", "On-grid, off-grid")} em={T("services.097", "or hybrid")} />
        <div className="cardGrid g3">{types.map(([t, d], i) => <div className="typeCard rv" key={t}><i className="flowLine" /><b>{String(i + 1).padStart(2, '0')}</b><h3>{t}</h3><p>{d}</p></div>)}</div></Sec>

      <Sec cls="alt"><div className="twoCol">
        <div><Head eyebrow={T("services.098", "SOLAR EQUIPMENT")} title={T("services.099", "Tier-1 certified")} em={T("services.100", "equipment")} text={T("services.101", "iGo Green Energy uses Tier-1 certified equipment from leading manufacturers, selected for efficiency, durability, and long-term performance.")} /></div>
        <Check cols={1} items={['Solar panels', 'Inverters', 'Batteries', 'Mounting and electrical components']} />
      </div></Sec>

      <Sec><Head eyebrow={T("services.102", "BENEFITS")} title={T("services.103", "Why go")} em={T("services.104", "solar")} />
        <div className="cardGrid g3">{benefits.map(([t, d]) => <div className="benCard rv" key={t}><Ic n="check" /><h3>{t}</h3><p>{d}</p></div>)}</div></Sec>

      <Sec cls="alt"><Head eyebrow={T("services.105", "OUR 7-STEP SOLAR PROCESS")} title={T("services.106", "From consultation")} em={T("services.107", "to handover")} text={T("services.108", "Select a step to see what happens.")} /><Flow steps={SOLAR_STEPS} variant="tabs" /></Sec>

      <Sec><div className="twoCol">
        <div><Head eyebrow={T("services.109", "SOLAR SUPPORT")} title={T("services.110", "Support that")} em={T("services.111", "lasts")} text={T("services.112", "Our relationship doesn't end at commissioning. Warranty periods and terms vary by product and are shared in detail with every quotation.")} /></div>
        <Check cols={2} items={['Manufacturer warranties', 'Workmanship warranty', 'Remote performance monitoring', 'On-site service and repairs', 'Annual Maintenance (AMC) plans', 'Helpline by phone and WhatsApp', 'Warranty claim assistance', 'Customer training']} />
      </div></Sec>

      <Sec cls="alt"><div className="toolGrid g2">
        <ToolCard icon="sun" soon title={T("services.113", "Solar Savings Calculator")} text={T("services.114", "Estimate your potential savings from solar. This tool is being prepared; request it with your quote.")} label={T("services.115", "Request early access")} onClick={onQuote} />
        <ToolCard icon="doc" soon title={T("services.116", "Government Subsidy Finder")} text={T("services.117", "Subsidy availability and eligibility depend on current policy and customer category. We help with applications, net metering and approvals.")} label={T("services.118", "Ask about subsidies")} onClick={onQuote} />
      </div></Sec>

      <Sec><Cta eyebrow={T("services.119", "GO SOLAR")} title={T("services.120", "Request your")} em={T("services.121", "solar quote")} label={T("services.122", "Get a Smart Quote")} onClick={onQuote} tone="solar" /></Sec>
    </div>
  );
}

/* ============================== WIND ============================== */
const WIND_STEPS = [
  { t: T("services.123", "Consultation"), d: T("services.124", "We understand the customer's goals, budget, and land availability.") },
  { t: T("services.125", "Site Assessment"), d: T("services.126", "Wind resource measurement and feasibility study.") },
  { t: T("services.127", "Design and Proposal"), d: T("services.128", "Turbine selection, layout, energy estimate, and quotation.") },
  { t: T("services.129", "Approvals and Permits"), d: T("services.130", "Land, environmental, and grid connection clearances.") },
  { t: T("services.131", "Procurement and Construction"), d: T("services.132", "Turbine supply, foundation, and civil and electrical works.") },
  { t: T("services.133", "Installation and Commissioning"), d: T("services.134", "Turbine erection, testing, and grid synchronization.") },
  { t: T("services.135", "Handover and O&M"), d: T("services.136", "Training, performance monitoring, and long-term maintenance.") },
];
export function WindPage({ onQuote }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="pg th-wind">
      <WindHero />

      <WindSolutions />

      <Sec cls="alt"><Head eyebrow={T("services.145", "WIND CONSULTATION")} title={T("services.146", "Three lenses on")} em={T("services.147", "every project")} />
        <div className="cardGrid g3">{[['Technical Consultation', 'Turbine selection, project layout, and grid connectivity.'], ['Financial Consultation', 'Cost estimates, returns on investment, and funding options.'], ['Regulatory Consultation', 'Guidance on approvals, permits, and compliance requirements.']].map(([t, d], i) => <div className="segCard rv" key={t}><b className="bigNum">{i + 1}</b><h3>{t}</h3><p>{d}</p></div>)}</div></Sec>

      <Sec><Head eyebrow={T("services.148", "TURBINE CATEGORIES")} title={T("services.149", "Small and")} em="utility-scale" text={T("services.150", "Turbine type and capacity are selected based on wind resource, site conditions, and project goals.")} />
        <div className="cardGrid g2">
          <div className="capCard big rv"><span className="capGap" aria-hidden="true" /><small>{T("services.151", "SMALL WIND TURBINES")}</small><b>{T("services.152", "up to 100 kW")}</b><p>{T("services.153", "For farms, homes, small businesses, and remote or off-grid locations.")}</p></div>
          <div className="capCard big rv"><Turbine /><small>{T("services.154", "UTILITY-SCALE WIND TURBINES")}</small><b>{T("services.155", "1 MW to 3 MW and above")}</b><p>{T("services.156", "For large wind farms and commercial or industrial power generation.")}</p></div>
        </div></Sec>

      <Sec cls="alt"><Head eyebrow={T("services.157", "SITE ASSESSMENT & FEASIBILITY")} title={T("services.158", "Invest with")} em={T("services.159", "confidence")} text={T("services.160", "Every wind project starts with a thorough study.")} />
        <div className="cardGrid g4">{[['Wind Resource Assessment', 'Measurement and analysis of wind speed, direction, and energy potential at the site.'], ['Site Evaluation', 'Terrain, land availability, access, and grid connectivity checks.'], ['Technical Feasibility', 'Turbine selection, layout, and expected energy generation.'], ['Financial Feasibility', 'Project cost, returns, payback period, and funding options.']].map(([t, d]) => <div className="benCard rv" key={t}><Ic n="search" /><h3>{t}</h3><p>{d}</p></div>)}</div></Sec>

      <Sec><Head eyebrow={T("services.161", "TURNKEY WIND EPC")} title={T("services.162", "One point of")} em={T("services.163", "responsibility")} text={T("services.164", "Complete turnkey EPC for wind projects, from design to commissioning.")} />
        <div className="epc">{[['Engineering', 'Project design, layout planning, and technical studies.'], ['Procurement', 'Sourcing of turbines and balance-of-plant equipment.'], ['Construction', 'Civil, mechanical, and electrical works, including installation.'], ['Commissioning', 'Testing and grid synchronization.'], ['Handover', 'Project handover to the customer.']].map(([t, d], i) => <div className="epcStep rv" key={t} style={{ '--i': i }}><b>{t}</b><p>{d}</p></div>)}</div></Sec>

      <Sec cls="alt"><Head eyebrow={T("services.165", "OUR 7-STEP WIND PROCESS")} title={T("services.166", "From consultation")} em={T("services.167", "to O&M")} /><Flow steps={WIND_STEPS} variant="vert" /></Sec>

      <Sec><div className="twoCol">
        <div><Head eyebrow={T("services.168", "WIND O&M")} title={T("services.169", "Keep turbines at")} em={T("services.170", "peak performance")} text={T("services.171", "Backed by the turbine manufacturer's warranty, plus our own O&M support and AMC plans. Warranty periods and terms vary by turbine and are shared with every proposal.")} /></div>
        <Check cols={1} items={['Preventive Maintenance: scheduled inspections, lubrication, and component checks', 'Corrective Maintenance: fast fault diagnosis and repair to minimize downtime', 'Full O&M Contracts: long-term agreements including performance monitoring and reporting']} />
      </div></Sec>

      <Sec cls="alt"><div className="coverage rv"><Ic n="pin" size={34} /><div><p className="pgEye">{T("services.172", "COVERAGE")}</p><h2>{T("services.173", "Pan-India")} <em>{T("services.174", "wind projects")}</em></h2><p>{T("services.175", "We serve wind energy projects across India, in all states with good wind potential. Project locations are selected after a detailed wind resource and site assessment.")}</p></div></div></Sec>

      <Sec><Cta eyebrow={T("services.176", "WIND ENERGY")} title={T("services.177", "Request a Wind Project")} em={T("services.178", "Consultation")} label={T("services.179", "Request a Consultation")} onClick={onQuote} tone="wind" /></Sec>
    </div>
  );
}

/* ============================== BIOGAS ============================== */
export function BiogasPage({ onQuote }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="pg th-bio">
      <ServiceHero eyebrow={T("services.180", "BIOGAS SOLUTIONS")} title={T("services.181", "Turn Organic Waste into")} em={T("services.182", "Clean Energy")} fx="fxBio" img={IMG.biogas} alt={T("services.183", "Green organic landscape")} onQuote={onQuote}
        text={T("services.184", "We transform organic waste into clean fuel and lasting value, so waste becomes a resource.")} />

      <Sec><Head eyebrow={T("services.185", "OUR BIOGAS SOLUTION")} title={T("services.186", "Biogas plants for")} em={T("services.187", "every scale")} text={T("services.188", "iGo Green Energy turns organic waste into clean energy with biogas solutions for every scale.")} />
        <div className="cardGrid g4">{[['Household and Domestic', 'Compact plants that convert kitchen and farm waste into cooking gas.'], ['Commercial', 'For hotels, canteens, restaurants, and institutions, cutting fuel costs and managing food waste.'], ['Industrial and Agricultural', 'For dairies, farms, and food industries, converting large volumes of organic waste into energy.'], ['Municipal and Organic Waste-to-Energy', 'For communities and local bodies, turning organic waste into a valuable resource.']].map(([t, d]) => <div className="pCard rv" key={t}><span className="iIc"><Ic n="leaf" /></span><h3>{t}</h3><p>{d}</p></div>)}</div></Sec>

      <Sec cls="alt"><Head eyebrow={T("services.189", "WASTE-TO-VALUE")} title={T("services.190", "A wide range of")} em={T("services.191", "organic feedstock")} text={T("services.192", "The best feedstock mix is selected for each project based on availability and plant design.")} />
        <div className="pillCloud">{['Kitchen and food waste', 'Cow dung and animal manure', 'Agricultural residue and crop waste', 'Food processing and industrial organic waste', 'Municipal organic and market waste', 'Poultry and slaughterhouse waste'].map((t, i) => <span key={t} className="pill rv" style={{ '--i': i }}><Ic n="leaf" size={16} />{t}</span>)}</div></Sec>

      <Sec><Head eyebrow={T("services.193", "PLANT CAPACITY RANGE")} title={T("services.194", "Small to")} em="large-scale" />
        <div className="capLadder">{[['Domestic / small', '1–10 m³/day'], ['Community / farm', '10–100 m³/day'], ['Commercial / industrial', '100–1,000 m³/day'], ['Large-scale / CBG', 'Above 1,000 m³/day']].map(([t, v], i) => <div className="rung rv" key={t} style={{ '--h': 40 + i * 20 + '%' }}><b>{v}</b><span>{t}</span></div>)}</div></Sec>

      <Sec cls="alt"><Head eyebrow={T("services.195", "INDUSTRIES SERVED")} title={T("services.196", "Where biogas")} em={T("services.197", "makes sense")} />
        <Check cols={3} items={['Agriculture and dairy farms', 'Food processing and distilleries', 'Municipal and urban waste', 'Hotels', 'Hospitals and institutions', 'Poultry and meat processing']} /></Sec>

      <Sec><Head eyebrow={T("services.198", "BENEFITS")} title={T("services.199", "Value from")} em={T("services.200", "every kilogram of waste")} />
        <div className="cardGrid g4">{['Lower fuel and energy costs', 'Clean cooking gas', 'Electricity generation', 'Waste reduction', 'Safe disposal', 'Organic manure from slurry', 'Reduced carbon emissions', 'Environmental compliance'].map((t) => <div className="benCard slim rv" key={t}><Ic n="check" /><h3>{t}</h3></div>)}</div></Sec>

      <Sec cls="alt"><Head eyebrow={T("services.201", "BIOGAS PROJECT PROCESS")} title={T("services.202", "Seven steps from")} em={T("services.203", "survey to O&M")} />
        <Flow variant="chain" steps={['Site Survey', 'Design', 'Approval', 'Installation', 'Commissioning', 'Training', 'Operation & Maintenance'].map((t) => ({ t }))} /></Sec>

      <Sec><div className="twoCol">
        <div><Head eyebrow={T("services.204", "CUSTOMIZED SOLUTIONS")} title={T("services.205", "Designed around your")} em={T("services.206", "waste")} text={T("services.207", "Solutions are customized based on waste type and quantity. Design and engineering are delivered through technical partners, with full turnkey installation and commissioning.")} /></div>
        <div className="amc rv"><Ic n="shield" size={30} /><h3>{T("services.208", "O&M / AMC")}</h3><p>{T("services.209", "Operation and maintenance services are provided through annual maintenance contracts (AMC).")}</p><p className="note">{T("services.210", "Warranty and after-sales terms will be provided once finalized.")}</p></div>
      </div></Sec>

      <Sec cls="alt"><div className="coverage rv"><Ic n="doc" size={34} /><div><p className="pgEye">{T("services.211", "PROJECTS & VISUALS")}</p><h2>{T("services.212", "Completed project details are")} <em>{T("services.213", "confidential")}</em></h2><p>{T("services.214", "Details of completed biogas projects cannot be shared. Images shown on this page are stock visuals; project images and videos will follow when available.")}</p></div></div></Sec>

      <Sec><Cta eyebrow={T("services.215", "BIOGAS")} title={T("services.216", "Plan your")} em={T("services.217", "biogas plant")} label={T("services.218", "Get a Smart Quote")} onClick={onQuote} tone="bio" /></Sec>
    </div>
  );
}

/* ============================== WATER ============================== */
export function WaterPage({ onQuote }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="pg th-water">
      <ServiceHero eyebrow={T("services.219", "WATER TREATMENT")} title={T("services.220", "Safe, Reusable,")} em={T("services.221", "Efficient Water")} fx="fxWater" img={IMG.water} alt={T("services.222", "Clean flowing water")} onQuote={onQuote}
        text={T("services.223", "Water systems that protect communities, industries, and the environment.")} />

      <Sec><div className="twoCol">
        <div><Head eyebrow={T("services.224", "OVERVIEW")} title={T("services.225", "Water treatment,")} em={T("services.226", "engineered for you")} text={T("services.227", "iGo Green Energy delivers safe, reusable, efficient water systems for industries, institutions and communities, designed, installed, commissioned and maintained by one team.")} /></div>
        <div className="statRow rv"><div><small>{T("services.228", "SOLUTIONS")}</small><b>{T("services.229", "RO & Demineralization")}</b></div><div><small>{T("services.230", "PROJECT SCALE")}</small><b>{T("services.231", "10–100 KLD")}</b></div></div>
      </div></Sec>

      <Sec cls="alt"><Head eyebrow={T("services.232", "SOLUTIONS")} title={T("services.233", "Two core")} em={T("services.234", "treatment technologies")} />
        <div className="cardGrid g2">{[['Reverse Osmosis (RO)', 'Reverse Osmosis systems for treating water.'], ['Demineralization Systems', 'Demineralization systems for treating water.']].map(([t, d]) => <div className="segCard rv" key={t}><span className="iIc lg"><Ic n="drop" size={28} /></span><h3>{t}</h3><p>{d}</p></div>)}</div></Sec>

      <Sec><Head eyebrow={T("services.235", "PROJECT TYPES")} title={T("services.236", "How we")} em={T("services.237", "deliver")} />
        <div className="cardGrid g2">{[['New Plant Installation', 'Complete new water treatment plants.'], ['Turnkey EPC Projects', 'Engineering, procurement and construction delivered as one project.']].map(([t, d]) => <div className="typeCard rv" key={t}><i className="flowLine" /><h3>{t}</h3><p>{d}</p></div>)}</div></Sec>

      <Sec cls="alt"><Head eyebrow={T("services.238", "APPLICATIONS / CUSTOMER TYPES")} title={T("services.239", "Who it's")} em={T("services.240", "built for")} />
        <Check cols={3} items={['Industries and factories', 'Commercial buildings and hotels', 'Residential apartments and townships', 'Hospitals', 'Institutions', 'Municipal bodies']} /></Sec>

      <Sec><Head eyebrow={T("services.241", "BENEFITS & APPLICATIONS")} title={T("services.242", "Better water,")} em={T("services.243", "better outcomes")} />
        <div className="cardGrid g4">{[['Safe Drinking Water', 'drop'], ['Wastewater Reuse & Recycling', 'leaf'], ['Regulatory Compliance', 'shield'], ['Environmental Sustainability', 'sun']].map(([t, ic]) => <div className="benCard rv" key={t}><Ic n={ic} /><h3>{t}</h3></div>)}</div></Sec>

      <Sec cls="alt"><div className="twoCol">
        <div><Head eyebrow={T("services.244", "ENGINEERING & EXECUTION")} title={T("services.245", "Design to")} em={T("services.246", "maintenance")} text={T("services.247", "Design, installation, commissioning and maintenance are all provided.")} /></div>
        <Check cols={2} items={['Design', 'Installation', 'Commissioning', 'Maintenance']} />
      </div>
      <div className="coverage rv" style={{ marginTop: 40 }}><Ic n="search" size={34} /><div><p className="pgEye">{T("services.248", "CUSTOMIZED WATER SOLUTIONS")}</p><h2>{T("services.249", "Based on your")} <em>{T("services.250", "water-quality analysis")}</em></h2><p>{T("services.251", "Every solution is customized based on a water-quality analysis of your source.")}</p></div></div></Sec>

      <Sec><Head eyebrow={T("services.252", "WATER TREATMENT PROCESS")} title={T("services.253", "Five steps to")} em={T("services.254", "clean water")} />
        <Flow variant="drops" steps={['Site Visit', 'Feasibility', 'Engineering', 'Execution', 'Handover'].map((t) => ({ t }))} /></Sec>

      <Sec cls="alt"><div className="twoCol">
        <div><Head eyebrow={T("services.255", "PROJECT SCALE")} title={T("services.256", "Medium-scale")} em={T("services.257", "projects")} /><div className="bigStat rv"><b>10–100</b><span>{T("services.258", "KLD")}</span></div></div>
        <div className="amc rv"><Ic n="doc" size={30} /><h3>{T("services.259", "Projects")}</h3><p>{T("services.260", "Details of completed water treatment projects are confidential and cannot be shared. Visuals on this page are stock images.")}</p></div>
      </div></Sec>

      <Sec><div className="toolGrid g2">
        <ToolCard icon="drop" soon title={T("services.261", "Water Quality / RO Advisor")} text={T("services.262", "Share your water quality and use case and get guidance on the right treatment approach. Being prepared; request it with your quote.")} label={T("services.263", "Request early access")} onClick={onQuote} />
        <ToolCard icon="doc" title={T("services.264", "Smart Quote / Site Survey")} text={T("services.265", "Start with a site visit and feasibility review.")} label={T("services.266", "Request a site survey")} onClick={onQuote} />
      </div></Sec>

      <Sec cls="alt"><Cta eyebrow={T("services.267", "WATER TREATMENT")} title={T("services.268", "Get a")} em={T("services.269", "Smart Quote")} label={T("services.270", "Get a Smart Quote")} onClick={onQuote} tone="water" /></Sec>
    </div>
  );
}
