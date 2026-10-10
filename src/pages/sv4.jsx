import React from 'react';
import { Link, go, useReveal, Ic, Head, Sec, ServiceHero, Cta, ToolCard, Check, Flow, Turbine } from './common.jsx';

const IMG = { solar: '/solutions/solar.jpg', wind: '/solutions/wind.jpg', biogas: '/solutions/biogas.jpg', water: '/solutions/water.jpg' };
const soonTool = (onQuote) => onQuote;

/* ============================== SERVICES ============================== */
const CARDS = [
  { k: 'solar', ic: 'sun', t: 'Solar Energy', d: 'Complete end-to-end solar for homes, businesses and industries, from design and consultation to AMC.', cap: '1 kW to 5 MW and above' },
  { k: 'wind', ic: 'wind', t: 'Wind Energy', d: 'Consultation, feasibility, turbine installation, turnkey EPC and O&M for small and utility-scale wind.', cap: 'Up to 100 kW · 1 MW to 3 MW and above' },
  { k: 'biogas', ic: 'leaf', t: 'Biogas Solutions', d: 'Plants that convert organic waste into clean cooking gas, electricity and organic manure.', cap: '1 m³/day to large-scale CBG' },
  { k: 'water', ic: 'drop', t: 'Water Treatment', d: 'Reverse Osmosis and demineralization systems, delivered as new plants or turnkey EPC.', cap: 'Medium-scale, 10–100 KLD' },
];
const CAPS = ['Consultation', 'Design', 'Engineering', 'Installation', 'Commissioning', 'Maintenance / O&M', 'Customization', 'After-sales support'];
/* 1 offered, 0 not specified in client answers, 2 terms to be finalised */
const MATRIX = { solar: [1, 1, 0, 1, 1, 1, 1, 1], wind: [1, 1, 1, 1, 1, 1, 0, 1], biogas: [0, 1, 1, 1, 1, 1, 1, 2], water: [0, 1, 1, 1, 1, 1, 1, 0] };
const NAMES = { solar: 'Solar', wind: 'Wind', biogas: 'Biogas', water: 'Water' };

export function ServicesPage({ onQuote }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="pg pgServices">
      <div className="svHero">
        <div className="svLeaf l1" aria-hidden="true" /><div className="svLeaf l2" aria-hidden="true" /><div className="svLeaf l3" aria-hidden="true" />
        <div className="svVis" aria-hidden="true"><img src="/services-hero.jpg" alt="" /><i className="svBlade" /></div>
        <svg className="svWave" viewBox="0 0 1000 100" preserveAspectRatio="none" aria-hidden="true"><path d="M0 62C140 40 300 66 460 60C560 56 640 40 760 30L760 100L0 100Z" fill="#dff1dc" opacity=".7" /><path d="M0 74C150 56 300 80 460 74C560 70 650 58 760 52L760 100L0 100Z" fill="#14522f" /></svg>
        <div className="svIn">
          <div className="svCopy">
            <p className="svEye"><span />OUR SERVICES</p>
            <h1>Integrated Clean Energy &amp; <em>Water Solutions</em></h1>
            <p className="svLead">IGO Green Energy provides end-to-end renewable energy and water treatment solutions — solar, wind, biogas and water treatment — delivered by one partner from consultation to long-term support.</p>
            <ul className="svHL">
              {[['sun', 'Solar', 'Clean Power for Today'], ['wind', 'Wind', 'Renewable Power for Tomorrow'], ['leaf', 'Biogas', 'Waste to Clean Energy'], ['drop', 'Water Treatment', 'Clean Water for Healthier Communities']].map(([ic, t, d], i) => (
                <li key={t} style={{ '--i': i }}><span className="svIc"><Ic n={ic} size={26} /></span><b>{t}</b><small>{d}</small></li>
              ))}
            </ul>
            <div className="svBtns">
              <button className="pgBtn" onClick={onQuote}>Get a Smart Quote <Ic n="arrow" size={18} /></button>
              <a className="svGhost" href="#overview" onClick={(e) => { e.preventDefault(); document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth' }); }}>Explore Our Services <Ic n="arrow" size={18} /></a>
            </div>
          </div>
        </div>
      </div>

      <Sec id="overview">
        <Head eyebrow="FOUR SERVICE VERTICALS" title="Choose the solution" em="you need" center />
        <div className="svcGrid">
          {CARDS.map((c, i) => (
            <article key={c.k} className="svcCard rv" style={{ '--d': i * 70 + 'ms' }}>
              <div className="svcImg"><img src={IMG[c.k]} alt={c.t} loading="lazy" /><span><Ic n={c.ic} size={22} /></span></div>
              <div className="svcBody"><h3>{c.t}</h3><p>{c.d}</p>
                <div className="svcCap"><small>KEY CAPABILITY</small><b>{c.cap}</b></div>
                <Link to={'/services/' + c.k} className="pgLink">Explore Service <Ic n="arrow" size={16} /></Link></div>
            </article>
          ))}
        </div>
      </Sec>

      <section className="svTog"><img src="/services-together.png" width="1930" height="815" alt="One partner, four ways to go green: Solar, Wind, Biogas and Water Treatment integrated into sustainable solutions" loading="lazy" /></section>

      <Sec>
        <Head eyebrow="SERVICE CAPABILITY MATRIX" title="What each service" em="includes" text="Shown exactly as confirmed by IGO Green Energy. A dash means it has not been specified for that service." />
        <div className="matrix rv" role="table" aria-label="Capabilities by service">
          <div className="mRow mHead" role="row"><span role="columnheader" />{Object.values(NAMES).map((n) => <span key={n} role="columnheader">{n}</span>)}</div>
          {CAPS.map((c, r) => (
            <div className="mRow" role="row" key={c}><span className="mLabel" role="rowheader">{c}</span>
              {['solar', 'wind', 'biogas', 'water'].map((k) => { const v = MATRIX[k][r]; return <span key={k} role="cell" className={'mCell v' + v} title={v === 1 ? 'Offered' : v === 2 ? 'Terms to be finalised' : 'Not specified'}>{v === 1 ? <Ic n="check" size={18} /> : v === 2 ? 'TBC' : '—'}</span>; })}
            </div>
          ))}
        </div>
        <p className="mNote"><Ic n="check" size={14} /> Offered &nbsp; · &nbsp; TBC Terms to be finalised &nbsp; · &nbsp; — Not specified</p>
      </Sec>

      <Sec cls="alt">
        <Head eyebrow="SMART TOOLS & ASSISTANCE" title="Plan before you" em="commit" center />
        <div className="toolGrid">
          <ToolCard icon="sun" soon title="Solar Savings Calculator" text="Estimate what solar could save you. Available on the Solar page." label="Go to Solar" onClick={() => go('/services/solar')} />
          <ToolCard icon="drop" soon title="Water Quality / RO Advisor" text="Match a treatment approach to your water quality. Available on the Water Treatment page." label="Go to Water Treatment" onClick={() => go('/services/water')} />
          <ToolCard icon="doc" title="Smart Quote / Site Survey" text="Tell us about your site and requirement, and we will shape a solution around it." label="Request a quote" onClick={onQuote} />
        </div>
      </Sec>

      <Sec><Cta eyebrow="READY TO START?" title="Get a" em="Smart Quote" text="Share your site and requirement. We'll help shape the right solution." label="Get a Smart Quote" onClick={onQuote} /></Sec>
    </div>
  );
}

/* ============================== SOLAR ============================== */
const SOLAR_STEPS = [
  { t: 'Consultation', d: "We understand the customer's energy needs, goals, and budget." },
  { t: 'Site Survey', d: 'We assess the roof or land, shading, and electrical setup.' },
  { t: 'Design and Proposal', d: 'System design, equipment selection, savings estimate, and quotation.' },
  { t: 'Approvals and Subsidy', d: 'Documentation, net metering, and subsidy applications.' },
  { t: 'Procurement and Installation', d: 'Equipment delivery and installation by certified partners.' },
  { t: 'Testing and Commissioning', d: 'Performance testing, safety checks, and grid connection.' },
  { t: 'Handover and Support', d: 'Training, monitoring setup, and warranty and AMC support.' },
];
export function SolarPage({ onQuote }) {
  const ref = useReveal();
  const solutions = [['Solar Design & Consultation', 'Site assessment, energy-needs analysis, and system design for the best performance and savings.', 'sun'], ['Installation & Commissioning', 'Professional installation, testing, and commissioning of solar systems.', 'tool'], ['Maintenance & AMC', 'Regular servicing, monitoring, and annual maintenance contracts.', 'shield'], ['Government Subsidy & Documentation Assistance', 'Help with applicable subsidies, approvals, and paperwork.', 'doc'], ['Customized Solar Solutions', "Systems tailored to each customer's site, energy needs, and budget.", 'grid']];
  const segs = [['Residential Solar', 'home', 'Rooftop systems for homes, villas, apartments, and housing societies that cut electricity bills and give energy independence.'], ['Commercial Solar', 'build', 'Systems for offices, shops, malls, hotels, hospitals, and schools that reduce operating costs and improve sustainability credentials.'], ['Industrial Solar', 'factory', 'High-capacity systems for factories, manufacturing units, and warehouses that lower power costs and support long-term energy security.']];
  const types = [['On-Grid', 'Connected to the utility grid; reduces electricity bills and allows surplus power to be exported through net metering, where available.'], ['Off-Grid', 'Independent systems with battery storage, ideal for remote locations or areas with unreliable grid supply.'], ['Hybrid', 'Combines solar, battery backup, and grid connection for uninterrupted power and maximum savings.']];
  const benefits = [['Lower Electricity Bills', 'Cut power costs significantly and enjoy a quick payback on your investment.'], ['Clean Energy', 'Reduce your carbon footprint with pollution-free power from the sun.'], ['Energy Independence', 'Reduce reliance on the grid, with battery backup options for uninterrupted power.'], ['Low Maintenance, Long Life', 'Durable systems designed to perform for up to 25 years with minimal upkeep.'], ['Subsidies and Tax Benefits', 'Take advantage of applicable government incentives, with our documentation support.'], ['Higher Property Value', 'A solar-powered property is more attractive and more valuable.']];
  return (
    <div ref={ref} className="pg th-solar">
      <ServiceHero eyebrow="SOLAR ENERGY" title="Power Your Future with" em="Solar Energy" fx="fxSolar" img={IMG.solar} alt="Solar panels under a clear sky" onQuote={onQuote}
        text="Complete, end-to-end solar solutions from 1 kW to 5 MW and above, for homes, businesses and industries." />

      <Sec><Head eyebrow="COMPLETE SOLAR SOLUTIONS" title="Everything solar," em="under one roof" />
        <div className="cardGrid g5">{solutions.map(([t, d, ic], i) => <div className="pCard rv" key={t} style={{ '--d': i * 60 + 'ms' }}><span className="iIc"><Ic n={ic} /></span><h3>{t}</h3><p>{d}</p></div>)}</div></Sec>

      <Sec cls="alt"><Head eyebrow="BY CUSTOMER TYPE" title="Solar for" em="every kind of customer" />
        <div className="cardGrid g3">{segs.map(([t, ic, d]) => <div className="segCard rv" key={t}><span className="iIc lg"><Ic n={ic} size={28} /></span><h3>{t}</h3><p>{d}</p></div>)}</div></Sec>

      <Sec><Head eyebrow="SYSTEM TYPES" title="On-grid, off-grid" em="or hybrid" />
        <div className="cardGrid g3">{types.map(([t, d], i) => <div className="typeCard rv" key={t}><i className="flowLine" /><b>{String(i + 1).padStart(2, '0')}</b><h3>{t}</h3><p>{d}</p></div>)}</div></Sec>

      <Sec cls="alt"><div className="twoCol">
        <div><Head eyebrow="SOLAR EQUIPMENT" title="Tier-1 certified" em="equipment" text="IGO Green Energy uses Tier-1 certified equipment from leading manufacturers, selected for efficiency, durability, and long-term performance." /></div>
        <Check cols={1} items={['Solar panels', 'Inverters', 'Batteries', 'Mounting and electrical components']} />
      </div></Sec>

      <Sec><Head eyebrow="BENEFITS" title="Why go" em="solar" />
        <div className="cardGrid g3">{benefits.map(([t, d]) => <div className="benCard rv" key={t}><Ic n="check" /><h3>{t}</h3><p>{d}</p></div>)}</div></Sec>

      <Sec cls="alt"><Head eyebrow="OUR 7-STEP SOLAR PROCESS" title="From consultation" em="to handover" text="Select a step to see what happens." /><Flow steps={SOLAR_STEPS} variant="tabs" /></Sec>

      <Sec><div className="twoCol">
        <div><Head eyebrow="SOLAR SUPPORT" title="Support that" em="lasts" text="Our relationship doesn't end at commissioning. Warranty periods and terms vary by product and are shared in detail with every quotation." /></div>
        <Check cols={2} items={['Manufacturer warranties', 'Workmanship warranty', 'Remote performance monitoring', 'On-site service and repairs', 'Annual Maintenance (AMC) plans', 'Helpline by phone and WhatsApp', 'Warranty claim assistance', 'Customer training']} />
      </div></Sec>

      <Sec cls="alt"><div className="toolGrid g2">
        <ToolCard icon="sun" soon title="Solar Savings Calculator" text="Estimate your potential savings from solar. This tool is being prepared; request it with your quote." label="Request early access" onClick={onQuote} />
        <ToolCard icon="doc" soon title="Government Subsidy Finder" text="Subsidy availability and eligibility depend on current policy and customer category. We help with applications, net metering and approvals." label="Ask about subsidies" onClick={onQuote} />
      </div></Sec>

      <Sec><Cta eyebrow="GO SOLAR" title="Request your" em="solar quote" label="Get a Smart Quote" onClick={onQuote} tone="solar" /></Sec>
    </div>
  );
}

/* ============================== WIND ============================== */
const WIND_STEPS = [
  { t: 'Consultation', d: "We understand the customer's goals, budget, and land availability." },
  { t: 'Site Assessment', d: 'Wind resource measurement and feasibility study.' },
  { t: 'Design and Proposal', d: 'Turbine selection, layout, energy estimate, and quotation.' },
  { t: 'Approvals and Permits', d: 'Land, environmental, and grid connection clearances.' },
  { t: 'Procurement and Construction', d: 'Turbine supply, foundation, and civil and electrical works.' },
  { t: 'Installation and Commissioning', d: 'Turbine erection, testing, and grid synchronization.' },
  { t: 'Handover and O&M', d: 'Training, performance monitoring, and long-term maintenance.' },
];
export function WindPage({ onQuote }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="pg th-wind">
      <ServiceHero eyebrow="WIND ENERGY" title="Turn the Power of Wind into" em="Reliable Energy" fx="fxWind" img={IMG.wind} alt="Wind turbines on open land" onQuote={onQuote}
        text="From turbine installation to complete EPC and O&M, we turn the power of the wind into reliable, large-scale energy." />

      <Sec><Head eyebrow="WIND ENERGY SOLUTIONS" title="End-to-end" em="wind energy services" />
        <div className="cardGrid g5">{[['Wind Energy Consultation', 'Expert guidance on project planning, technology selection, and returns.'], ['Site Assessment and Feasibility Studies', 'Wind resource evaluation and technical and financial feasibility analysis.'], ['Wind Project EPC', 'Engineering, procurement, and construction managed from start to finish.'], ['Wind Turbine Installation', 'Safe, professional installation and commissioning of wind turbines.'], ['Maintenance and O&M Services', 'Operation and maintenance to maximize uptime and energy output.']].map(([t, d], i) => <div className="pCard rv" key={t}><span className="iIc"><Ic n="wind" /></span><h3>{t}</h3><p>{d}</p></div>)}</div></Sec>

      <Sec cls="alt"><Head eyebrow="WIND CONSULTATION" title="Three lenses on" em="every project" />
        <div className="cardGrid g3">{[['Technical Consultation', 'Turbine selection, project layout, and grid connectivity.'], ['Financial Consultation', 'Cost estimates, returns on investment, and funding options.'], ['Regulatory Consultation', 'Guidance on approvals, permits, and compliance requirements.']].map(([t, d], i) => <div className="segCard rv" key={t}><b className="bigNum">{i + 1}</b><h3>{t}</h3><p>{d}</p></div>)}</div></Sec>

      <Sec><Head eyebrow="TURBINE CATEGORIES" title="Small and" em="utility-scale" text="Turbine type and capacity are selected based on wind resource, site conditions, and project goals." />
        <div className="cardGrid g2">
          <div className="capCard rv"><Turbine /><small>SMALL WIND TURBINES</small><b>up to 100 kW</b><p>For farms, homes, small businesses, and remote or off-grid locations.</p></div>
          <div className="capCard big rv"><Turbine /><small>UTILITY-SCALE WIND TURBINES</small><b>1 MW to 3 MW and above</b><p>For large wind farms and commercial or industrial power generation.</p></div>
        </div></Sec>

      <Sec cls="alt"><Head eyebrow="SITE ASSESSMENT & FEASIBILITY" title="Invest with" em="confidence" text="Every wind project starts with a thorough study." />
        <div className="cardGrid g4">{[['Wind Resource Assessment', 'Measurement and analysis of wind speed, direction, and energy potential at the site.'], ['Site Evaluation', 'Terrain, land availability, access, and grid connectivity checks.'], ['Technical Feasibility', 'Turbine selection, layout, and expected energy generation.'], ['Financial Feasibility', 'Project cost, returns, payback period, and funding options.']].map(([t, d]) => <div className="benCard rv" key={t}><Ic n="search" /><h3>{t}</h3><p>{d}</p></div>)}</div></Sec>

      <Sec><Head eyebrow="TURNKEY WIND EPC" title="One point of" em="responsibility" text="Complete turnkey EPC for wind projects, from design to commissioning." />
        <div className="epc">{[['Engineering', 'Project design, layout planning, and technical studies.'], ['Procurement', 'Sourcing of turbines and balance-of-plant equipment.'], ['Construction', 'Civil, mechanical, and electrical works, including installation.'], ['Commissioning', 'Testing and grid synchronization.'], ['Handover', 'Project handover to the customer.']].map(([t, d], i) => <div className="epcStep rv" key={t} style={{ '--i': i }}><b>{t}</b><p>{d}</p></div>)}</div></Sec>

      <Sec cls="alt"><Head eyebrow="OUR 7-STEP WIND PROCESS" title="From consultation" em="to O&M" /><Flow steps={WIND_STEPS} variant="vert" /></Sec>

      <Sec><div className="twoCol">
        <div><Head eyebrow="WIND O&M" title="Keep turbines at" em="peak performance" text="Backed by the turbine manufacturer's warranty, plus our own O&M support and AMC plans. Warranty periods and terms vary by turbine and are shared with every proposal." /></div>
        <Check cols={1} items={['Preventive Maintenance: scheduled inspections, lubrication, and component checks', 'Corrective Maintenance: fast fault diagnosis and repair to minimize downtime', 'Full O&M Contracts: long-term agreements including performance monitoring and reporting']} />
      </div></Sec>

      <Sec cls="alt"><div className="coverage rv"><Ic n="pin" size={34} /><div><p className="pgEye">COVERAGE</p><h2>Pan-India <em>wind projects</em></h2><p>We serve wind energy projects across India, in all states with good wind potential. Project locations are selected after a detailed wind resource and site assessment.</p></div></div></Sec>

      <Sec><Cta eyebrow="WIND ENERGY" title="Request a Wind Project" em="Consultation" label="Request a Consultation" onClick={onQuote} tone="wind" /></Sec>
    </div>
  );
}

/* ============================== BIOGAS ============================== */
export function BiogasPage({ onQuote }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="pg th-bio">
      <ServiceHero eyebrow="BIOGAS SOLUTIONS" title="Turn Organic Waste into" em="Clean Energy" fx="fxBio" img={IMG.biogas} alt="Green organic landscape" onQuote={onQuote}
        text="We transform organic waste into clean fuel and lasting value, so waste becomes a resource." />

      <Sec><Head eyebrow="OUR BIOGAS SOLUTION" title="Biogas plants for" em="every scale" text="IGO Green Energy turns organic waste into clean energy with biogas solutions for every scale." />
        <div className="cardGrid g4">{[['Household and Domestic', 'Compact plants that convert kitchen and farm waste into cooking gas.'], ['Commercial', 'For hotels, canteens, restaurants, and institutions, cutting fuel costs and managing food waste.'], ['Industrial and Agricultural', 'For dairies, farms, and food industries, converting large volumes of organic waste into energy.'], ['Municipal and Organic Waste-to-Energy', 'For communities and local bodies, turning organic waste into a valuable resource.']].map(([t, d]) => <div className="pCard rv" key={t}><span className="iIc"><Ic n="leaf" /></span><h3>{t}</h3><p>{d}</p></div>)}</div></Sec>

      <Sec cls="alt"><Head eyebrow="WASTE-TO-VALUE" title="A wide range of" em="organic feedstock" text="The best feedstock mix is selected for each project based on availability and plant design." />
        <div className="pillCloud">{['Kitchen and food waste', 'Cow dung and animal manure', 'Agricultural residue and crop waste', 'Food processing and industrial organic waste', 'Municipal organic and market waste', 'Poultry and slaughterhouse waste'].map((t, i) => <span key={t} className="pill rv" style={{ '--i': i }}><Ic n="leaf" size={16} />{t}</span>)}</div></Sec>

      <Sec><Head eyebrow="PLANT CAPACITY RANGE" title="Small to" em="large-scale" />
        <div className="capLadder">{[['Domestic / small', '1–10 m³/day'], ['Community / farm', '10–100 m³/day'], ['Commercial / industrial', '100–1,000 m³/day'], ['Large-scale / CBG', 'Above 1,000 m³/day']].map(([t, v], i) => <div className="rung rv" key={t} style={{ '--h': 40 + i * 20 + '%' }}><b>{v}</b><span>{t}</span></div>)}</div></Sec>

      <Sec cls="alt"><Head eyebrow="INDUSTRIES SERVED" title="Where biogas" em="makes sense" />
        <Check cols={3} items={['Agriculture and dairy farms', 'Food processing and distilleries', 'Municipal and urban waste', 'Hotels', 'Hospitals and institutions', 'Poultry and meat processing']} /></Sec>

      <Sec><Head eyebrow="BENEFITS" title="Value from" em="every kilogram of waste" />
        <div className="cardGrid g4">{['Lower fuel and energy costs', 'Clean cooking gas', 'Electricity generation', 'Waste reduction', 'Safe disposal', 'Organic manure from slurry', 'Reduced carbon emissions', 'Environmental compliance'].map((t) => <div className="benCard slim rv" key={t}><Ic n="check" /><h3>{t}</h3></div>)}</div></Sec>

      <Sec cls="alt"><Head eyebrow="BIOGAS PROJECT PROCESS" title="Seven steps from" em="survey to O&M" />
        <Flow variant="chain" steps={['Site Survey', 'Design', 'Approval', 'Installation', 'Commissioning', 'Training', 'Operation & Maintenance'].map((t) => ({ t }))} /></Sec>

      <Sec><div className="twoCol">
        <div><Head eyebrow="CUSTOMIZED SOLUTIONS" title="Designed around your" em="waste" text="Solutions are customized based on waste type and quantity. Design and engineering are delivered through technical partners, with full turnkey installation and commissioning." /></div>
        <div className="amc rv"><Ic n="shield" size={30} /><h3>O&amp;M / AMC</h3><p>Operation and maintenance services are provided through annual maintenance contracts (AMC).</p><p className="note">Warranty and after-sales terms will be provided once finalized.</p></div>
      </div></Sec>

      <Sec cls="alt"><div className="coverage rv"><Ic n="doc" size={34} /><div><p className="pgEye">PROJECTS &amp; VISUALS</p><h2>Completed project details are <em>confidential</em></h2><p>Details of completed biogas projects cannot be shared. Images shown on this page are stock visuals; project images and videos will follow when available.</p></div></div></Sec>

      <Sec><Cta eyebrow="BIOGAS" title="Plan your" em="biogas plant" label="Get a Smart Quote" onClick={onQuote} tone="bio" /></Sec>
    </div>
  );
}

/* ============================== WATER ============================== */
export function WaterPage({ onQuote }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="pg th-water">
      <ServiceHero eyebrow="WATER TREATMENT" title="Safe, Reusable," em="Efficient Water" fx="fxWater" img={IMG.water} alt="Clean flowing water" onQuote={onQuote}
        text="Water systems that protect communities, industries, and the environment." />

      <Sec><div className="twoCol">
        <div><Head eyebrow="OVERVIEW" title="Water treatment," em="engineered for you" text="IGO Green Energy delivers safe, reusable, efficient water systems for industries, institutions and communities, designed, installed, commissioned and maintained by one team." /></div>
        <div className="statRow rv"><div><small>SOLUTIONS</small><b>RO &amp; Demineralization</b></div><div><small>PROJECT SCALE</small><b>10–100 KLD</b></div></div>
      </div></Sec>

      <Sec cls="alt"><Head eyebrow="SOLUTIONS" title="Two core" em="treatment technologies" />
        <div className="cardGrid g2">{[['Reverse Osmosis (RO)', 'Reverse Osmosis systems for treating water.'], ['Demineralization Systems', 'Demineralization systems for treating water.']].map(([t, d]) => <div className="segCard rv" key={t}><span className="iIc lg"><Ic n="drop" size={28} /></span><h3>{t}</h3><p>{d}</p></div>)}</div></Sec>

      <Sec><Head eyebrow="PROJECT TYPES" title="How we" em="deliver" />
        <div className="cardGrid g2">{[['New Plant Installation', 'Complete new water treatment plants.'], ['Turnkey EPC Projects', 'Engineering, procurement and construction delivered as one project.']].map(([t, d]) => <div className="typeCard rv" key={t}><i className="flowLine" /><h3>{t}</h3><p>{d}</p></div>)}</div></Sec>

      <Sec cls="alt"><Head eyebrow="APPLICATIONS / CUSTOMER TYPES" title="Who it's" em="built for" />
        <Check cols={3} items={['Industries and factories', 'Commercial buildings and hotels', 'Residential apartments and townships', 'Hospitals', 'Institutions', 'Municipal bodies']} /></Sec>

      <Sec><Head eyebrow="BENEFITS & APPLICATIONS" title="Better water," em="better outcomes" />
        <div className="cardGrid g4">{[['Safe Drinking Water', 'drop'], ['Wastewater Reuse & Recycling', 'leaf'], ['Regulatory Compliance', 'shield'], ['Environmental Sustainability', 'sun']].map(([t, ic]) => <div className="benCard rv" key={t}><Ic n={ic} /><h3>{t}</h3></div>)}</div></Sec>

      <Sec cls="alt"><div className="twoCol">
        <div><Head eyebrow="ENGINEERING & EXECUTION" title="Design to" em="maintenance" text="Design, installation, commissioning and maintenance are all provided." /></div>
        <Check cols={2} items={['Design', 'Installation', 'Commissioning', 'Maintenance']} />
      </div>
      <div className="coverage rv" style={{ marginTop: 40 }}><Ic n="search" size={34} /><div><p className="pgEye">CUSTOMIZED WATER SOLUTIONS</p><h2>Based on your <em>water-quality analysis</em></h2><p>Every solution is customized based on a water-quality analysis of your source.</p></div></div></Sec>

      <Sec><Head eyebrow="WATER TREATMENT PROCESS" title="Five steps to" em="clean water" />
        <Flow variant="drops" steps={['Site Visit', 'Feasibility', 'Engineering', 'Execution', 'Handover'].map((t) => ({ t }))} /></Sec>

      <Sec cls="alt"><div className="twoCol">
        <div><Head eyebrow="PROJECT SCALE" title="Medium-scale" em="projects" /><div className="bigStat rv"><b>10–100</b><span>KLD</span></div></div>
        <div className="amc rv"><Ic n="doc" size={30} /><h3>Projects</h3><p>Details of completed water treatment projects are confidential and cannot be shared. Visuals on this page are stock images.</p></div>
      </div></Sec>

      <Sec><div className="toolGrid g2">
        <ToolCard icon="drop" soon title="Water Quality / RO Advisor" text="Share your water quality and use case and get guidance on the right treatment approach. Being prepared; request it with your quote." label="Request early access" onClick={onQuote} />
        <ToolCard icon="doc" title="Smart Quote / Site Survey" text="Start with a site visit and feasibility review." label="Request a site survey" onClick={onQuote} />
      </div></Sec>

      <Sec cls="alt"><Cta eyebrow="WATER TREATMENT" title="Get a" em="Smart Quote" label="Get a Smart Quote" onClick={onQuote} tone="water" /></Sec>
    </div>
  );
}
