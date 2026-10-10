import React, { useEffect, useRef } from 'react';
import './about.css';

import { T } from './content/T.js';
const S = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' };
const I = {
  people: (p) => (<svg viewBox="0 0 32 32" {...S} {...p}><circle cx="16" cy="11" r="4" /><circle cx="7" cy="13" r="3" /><circle cx="25" cy="13" r="3" /><path d="M9 26c0-4.500 3-7 7-7s7 2.500 7 7M2 24c0-3 2-5 5-5M30 24c0-3-2-5-5-5" /></svg>),
  shield: (p) => (<svg viewBox="0 0 32 32" {...S} {...p}><path d="M16 4 6 8v8c0 6 4.200 10 10 12 5.800-2 10-6 10-12V8z" /><path d="m11 16 4 4 7-8" /></svg>),
  leaf: (p) => (<svg viewBox="0 0 32 32" {...S} {...p}><path d="M6 26C6 14 13 7 26 6c0 13-7 20-18 20z" /><path d="M6 26c4-6 8-10 13-13" /></svg>),
  gear: (p) => (<svg viewBox="0 0 32 32" {...S} {...p}><circle cx="16" cy="16" r="4.500" /><circle cx="16" cy="16" r="9" strokeDasharray="3 2.400" strokeWidth="3" /></svg>),
  sun: (p) => (<svg viewBox="0 0 32 32" {...S} {...p}><circle cx="16" cy="16" r="5.500" /><path d="M16 3v4M16 25v4M3 16h4M25 16h4M6.800 6.800l2.800 2.800M22.400 22.400l2.800 2.800M25.200 6.800l-2.800 2.800M9.600 22.400l-2.800 2.800" /></svg>),
  wind: (p) => (<svg viewBox="0 0 32 32" {...S} {...p}><path d="M16 14v15M16 14V3M16 14l-9 6M16 14l9 6" /><circle cx="16" cy="14" r="1.800" /></svg>),
  drop: (p) => (<svg viewBox="0 0 32 32" {...S} {...p}><path d="M16 4c5.500 6.500 8.500 10.500 8.500 15a8.500 8.500 0 0 1-17 0C7.500 14.500 10.500 10.500 16 4z" /><path d="M12 20a4 4 0 0 0 4 4" /></svg>),
  gearset: (p) => (<svg viewBox="0 0 32 32" {...S} {...p}><circle cx="16" cy="16" r="4" /><path d="M16 4v4M16 24v4M4 16h4M24 16h4M7.500 7.500l2.800 2.800M21.700 21.700l2.800 2.800M24.500 7.500l-2.800 2.800M10.300 21.700l-2.800 2.800" /></svg>),
  handshake: (p) => (<svg viewBox="0 0 32 32" {...S} {...p}><path d="M3 14l5-4 6 2 4-3 5 3 6-1M3 14v8l5 3 4-2 3 3 4-2 3 2 5-4v-8" /><path d="m12 19 3 3m2-6 4 4" /></svg>),
  wrench: (p) => (<svg viewBox="0 0 32 32" {...S} {...p}><path d="M22 4a6 6 0 0 0-5.500 8L5 23.500 8.500 27 20 15.500A6 6 0 0 0 28 10l-4 4-4-1-1-4z" /></svg>),
  headset: (p) => (<svg viewBox="0 0 32 32" {...S} {...p}><path d="M6 19v-4a10 10 0 0 1 20 0v4" /><rect x="4" y="18" width="5" height="8" rx="2" /><rect x="23" y="18" width="5" height="8" rx="2" /><path d="M25 26c0 2.500-3 3.500-6 3.500" /></svg>),
  bars: (p) => (<svg viewBox="0 0 32 32" {...S} {...p}><path d="M5 27V5M5 27h22" /><rect x="9" y="17" width="4" height="8" rx="1" /><rect x="15" y="12" width="4" height="13" rx="1" /><rect x="21" y="7" width="4" height="18" rx="1" /></svg>),
  target: (p) => (<svg viewBox="0 0 32 32" {...S} {...p}><circle cx="15" cy="17" r="10" /><circle cx="15" cy="17" r="6" /><circle cx="15" cy="17" r="2" /><path d="M16 16l11-11M23 5h4v4" /></svg>),
  eye: (p) => (<svg viewBox="0 0 32 32" {...S} {...p}><path d="M2 16s5-9 14-9 14 9 14 9-5 9-14 9S2 16 2 16z" /><circle cx="16" cy="16" r="4.500" /></svg>),
  search: (p) => (<svg viewBox="0 0 32 32" {...S} {...p}><circle cx="14" cy="14" r="8" /><path d="m20 20 8 8" /></svg>),
  pencil: (p) => (<svg viewBox="0 0 32 32" {...S} {...p}><path d="M5 27l1.500-6L21 6.500a3 3 0 0 1 4.500 4.500L11 25.500z" /><path d="M19 8.500l4.500 4.500" /></svg>),
  box: (p) => (<svg viewBox="0 0 32 32" {...S} {...p}><path d="M4 10l12-6 12 6v12l-12 6-12-6z" /><path d="M4 10l12 6 12-6M16 16v12" /></svg>),
  arrow: (p) => (<svg viewBox="0 0 24 24" {...S} strokeWidth="2.200" {...p}><path d="M5 12h13M13 6l6 6-6 6" /></svg>),
  quote: (p) => (<svg viewBox="0 0 32 24" fill="currentColor" {...p}><path d="M0 24V13C0 5 4 .8 12 0v4.500C8.300 5.200 6.800 7 6.600 10H12v14zM18 24V13c0-8 4-12.200 12-13v4.500c-3.700.7-5.200 2.500-5.400 5.500H30v14z" /></svg>)
};
const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

export const LEGACY = [
  { icon: 'people', title: T("about.001", "iGo Group"), text: [T("about.002", "A proven"), T("about.003", "foundation")] },
  { icon: 'shield', title: T("about.004", "Trust\nQuality\nCommitment"), text: [T("about.005", "Values that"), T("about.006", "drive us")] },
  { icon: 'leaf', title: T("about.007", "iGo Green Energy"), text: [T("about.008", "A new chapter"), T("about.009", "for a sustainable"), T("about.010", "tomorrow")] },
  { icon: 'gear', title: T("about.011", "Solar • Wind • Biogas\nWater Treatment"), text: [T("about.012", "Integrated solutions"), T("about.013", "for a cleaner, greener"), T("about.014", "future")] }
];
export const SOLUTIONS = [
  { icon: 'sun', title: T("about.015", "Solar Energy"), img: T("about.016", "/about/u-solar.jpg"), text: T("about.017", "Harness the power of the sun to reduce electricity bills and gain energy independence for homes, businesses and industries.") },
  { icon: 'wind', title: T("about.018", "Wind Energy"), img: T("about.019", "/about/u-wind.jpg"), text: T("about.020", "From turbine installation to complete EPC and O&M, we turn wind resources into reliable and large-scale clean energy.") },
  { icon: 'leaf', title: T("about.021", "Biogas Solutions"), img: T("about.022", "/about/u-biogas.jpg"), text: T("about.023", "Transform organic waste into clean fuel and lasting value for communities, industries and the environment.") },
  { icon: 'drop', title: T("about.024", "Water Treatment"), img: T("about.025", "/about/u-water.jpg"), text: T("about.026", "Deliver safe, reusable and efficient water systems for industries, communities and the environment.") }
];
export const WHY = [
  { icon: 'gearset', title: T("about.027", "All-in-One Provider"), text: T("about.028", "Solar, wind, biogas and water treatment under one roof.") },
  { icon: 'handshake', title: T("about.029", "End-to-End Solutions"), text: T("about.030", "From consulting and design to commissioning and long-term maintenance.") },
  { icon: 'wrench', title: T("about.031", "Tailor-Made Engineering"), text: T("about.032", "Designed for your site, goals, energy needs and budget.") },
  { icon: 'shield', title: T("about.033", "Quality Without Compromise"), text: T("about.034", "Dependable technology and skilled professionals.") },
  { icon: 'headset', title: T("about.035", "Support That Lasts"), text: T("about.036", "Ongoing maintenance and dedicated support.") },
  { icon: 'bars', title: T("about.037", "Real, Measurable Impact"), text: T("about.038", "Lower costs, fewer emissions and smarter resource use.") }
];
export const ELEMENTS = [
  { key: 'sun', no: '01', icon: 'sun', name: T("about.039", "Sun"), value: T("about.040", "Innovation"), img: T("about.041", "/about/a2-el1.jpg"), text: T("about.042", "Bright ideas and smart technology that keep us ahead.") },
  { key: 'wind', no: '02', icon: 'wind', name: T("about.043", "Wind"), value: T("about.044", "Agility"), img: T("about.045", "/about/a2-el2.jpg"), text: T("about.046", "Fast, flexible and responsive to every customer’s needs.") },
  { key: 'earth', no: '03', icon: 'leaf', name: T("about.047", "Earth"), value: T("about.048", "Responsibility"), img: T("about.049", "/about/a2-el3.jpg"), text: T("about.050", "Sustainable choices, with nothing wasted and everything put to good use.") },
  { key: 'water', no: '04', icon: 'drop', name: T("about.051", "Water"), value: T("about.052", "Purity"), img: T("about.053", "/about/a2-el4.jpg"), text: T("about.054", "Clarity, transparency and integrity in everything we do.") }
];
export const APPROACH = [
  { no: '01', icon: 'search', title: T("about.055", "Understand"), text: T("about.056", "Your goals, site conditions and requirements.") },
  { no: '02', icon: 'pencil', title: T("about.057", "Design"), text: T("about.058", "A customized solution for your specific needs.") },
  { no: '03', icon: 'box', title: T("about.059", "Deliver"), text: T("about.060", "Procurement, installation, commissioning and handover.") },
  { no: '04', icon: 'headset', title: T("about.061", "Support"), text: T("about.062", "Monitoring, maintenance, AMC and long-term support.") }
];

export default function AboutPage({ onQuote, onContact }) {
  const root = useRef(null);
  useEffect(() => {
    const els = root.current ? [...root.current.querySelectorAll('.abRv')] : [];
    if (!('IntersectionObserver' in window) || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) { els.forEach((e) => e.classList.add('in')); return; }
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.1 });
    els.forEach((e) => io.observe(e));
    if (!document.getElementById('abScriptFont')) {
      const l = document.createElement('link'); l.id = 'abScriptFont'; l.rel = 'stylesheet';
      l.href = 'https://fonts.googleapis.com/css2?family=Caveat:wght@600&display=swap'; document.head.appendChild(l);
    }
    return () => io.disconnect();
  }, []);
  const lines = (t) => t.split('\n').map((x, i) => <span key={i}>{x}</span>);

  return (
    <div className="ab" ref={root}>
      {/* 1. HERO */}
      <section className="abHero" aria-labelledby="abH1">
        <img className="abHeroImg" src={T("about.063", "/about/a3-office.jpg")} width="1795" height="876" alt={T("about.064", "iGo Green Energy office building with rooftop solar panels and biogas plant")} />
        <div className="abWrap abHeroIn">
          <div className="abHeroCopy abRv">
            <p className="abEyebrow">{T("about.065", "ABOUT US")}</p>
            <h1 id="abH1">{T("about.066", "A Cleaner")}<br />{T("about.067", "Tomorrow,")}<br /><em>{T("about.068", "Built Today")}</em></h1>
            <p className="abLead">{T("about.069", "At iGo Green Energy, we are committed to delivering integrated renewable energy and water treatment solutions that create a cleaner, healthier and more sustainable future for communities, industries and the planet.")}</p>
          </div>
        </div>
      </section>

      {/* 2. WHO WE ARE */}
      <section className="abSplit abWho">
        <img className="abSplitImg" src={T("about.071", "/about/u-who.jpg")} alt={T("about.072", "Engineers inspecting a solar and wind energy site")} loading="lazy" />
        <div className="abWrap abSplitIn">
          <div className="abSplitCopy abRv">
            <p className="abEyebrow abLine">{T("about.073", "WHO WE ARE")} <span /></p>
            <h2>{T("about.074", "Building a")}<br />{T("about.075", "Sustainable Future")}<br />{T("about.076", "Together")}</h2>
            <p className="abBody">{T("about.077", "iGo Green Energy is a trusted provider of integrated renewable energy and water treatment solutions. We combine technology, innovation and domain expertise to help homes, businesses, industries and institutions transition towards a cleaner and greener future.")}</p>
            <p className="abBody">{T("about.078", "With a strong foundation, a passion for sustainability and a customer-first approach, we deliver practical, reliable and long-term solutions that create real value for people and the environment.")}</p>
          </div>
        </div>
      </section>

      {/* 3. FOUNDER */}
      <section className="abFounder" id="abFounder">
        <img className="abFounderImg" src={T("about.080", "/about/u-founder.jpg")} alt={T("about.081", "Dr. John Yesudas, Founder and CEO of iGo Group of Companies")} loading="lazy" />
        <img className="abFounderBg" src={T("about.082", "/about/a2-founderbg.jpg")} alt="" aria-hidden="true" loading="lazy" />
        <div className="abWrap abFounderIn">
          <div className="abFounderCopy abRv">
            <p className="abEyebrow abLine">{T("about.083", "OUR FOUNDER")} <span /></p>
            <h2>{T("about.084", "A Vision Led by Its Founder")}</h2>
            <blockquote><I.quote className="abQ" /><p>{T("about.085", "Progress means nothing if it costs the planet.")}<br />{T("about.086", "Our goal is to power growth in a way that leaves")}<br />{T("about.087", "the world better than we found it.")}</p></blockquote>
            <p className="abWho"><b>{T("about.088", "Dr. John Yesudas")}</b><span>{T("about.089", "Founder & CEO")}</span><span>{T("about.090", "iGo Group of Companies")}</span></p>
            <p className="abBody">{T("about.091", "Under the leadership of Dr. John Yesudas, the iGo Group has earned a reputation for trust, quality and commitment. That legacy carries forward, bringing the same values into the renewable energy sector with a focus on innovation, sustainability and long-term impact.")}</p>
          </div>
        </div>
      </section>

      {/* 4. LEGACY */}
      <section className="abLegacy" id="abLegacy">
        <div className="abLegacyBg" aria-hidden="true" />
        <div className="abWrap abLegacyIn">
          <div className="abRv">
            <p className="abEyebrow abLine abLight">{T("about.092", "OUR LEGACY")} <span /></p>
            <h2>{T("about.093", "From the iGo Group")}<br />{T("about.094", "to iGo Green Energy")}</h2>
            <p className="abLegacyP">{T("about.095", "With a strong foundation across multiple industries, the iGo Group has always believed in creating long-term value for society. iGo Green Energy is the next chapter in this journey, focused on clean energy, cleaner water and a greener future.")}</p>
          </div>
          <ol className="abStages">
            {LEGACY.map((s, i) => { const Ic = I[s.icon]; return (
              <li className="abRv" key={s.title} style={{ '--d': `${0.15 * i}s` }}>
                <span className="abStageIc"><Ic /></span>
                <h3>{lines(s.title)}</h3>
                <p>{s.text.map((t, k) => <span key={k}>{t}</span>)}</p>
                {i < LEGACY.length - 1 && <I.arrow className="abStageArrow" />}
              </li>
            ); })}
          </ol>
        </div>
      </section>

      {/* 5. FOUR SOLUTIONS */}
      <section className="abBlock abWhat">
        <div className="abWrap">
          <div className="abHead abRv">
            <div><p className="abEyebrow abLine">{T("about.096", "WHAT WE DO")} <span /></p><h2>{T("about.097", "Four Solutions. A Cleaner, More Sustainable World.")}</h2></div>
            <p className="abHeadP">{T("about.098", "We deliver end-to-end renewable energy and water treatment solutions designed to meet the unique needs of our customers.")}</p>
          </div>
          <div className="abCards4">
            {SOLUTIONS.map((s, i) => { const Ic = I[s.icon]; return (
              <article className="abSol abRv" key={s.title} style={{ '--d': `${0.1 * i}s` }}>
                <img src={s.img} alt={s.title} loading="lazy" />
                <div className="abSolBody">
                  <h3><span className="abIc"><Ic /></span>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </article>
            ); })}
          </div>
        </div>
      </section>

      {/* 7. MISSION + VISION */}
      <section className="abBlock abMV">
        <div className="abWrap abMVGrid">
          <article className="abMVCard abMission abRv">
            <img src={T("about.099", "/about/u-mission.jpg")} alt="" aria-hidden="true" loading="lazy" />
            <span className="abIc abIcFill"><I.target /></span>
            <div><p className="abEyebrow">{T("about.100", "OUR MISSION")}</p><h3>{T("about.101", "Our Mission")}</h3><p>{T("about.102", "To deliver innovative and reliable renewable energy and water treatment solutions that improve lives and protect the environment.")}</p></div>
          </article>
          <article className="abMVCard abVision abRv" style={{ '--d': '.12s' }}>
            <img src={T("about.103", "/about/u-vision.jpg")} alt="" aria-hidden="true" loading="lazy" />
            <span className="abIc abIcFill abIcBlue"><I.eye /></span>
            <div><p className="abEyebrow">{T("about.104", "OUR VISION")}</p><h3>{T("about.105", "Our Vision")}</h3><p>{T("about.106", "To be a global leader in sustainable energy and water management, creating a cleaner, greener and healthier future for all.")}</p></div>
          </article>
        </div>
      </section>

      {/* 6. WHY */}
      <section className="abBlock abWhy">
        <div className="abWrap abWhyGrid">
          <div className="abRv">
            <p className="abEyebrow abLine">{T("about.107", "WHY iGO GREEN ENERGY")} <span /></p>
            <h2>{T("about.108", "More Than Solutions.")}<br />{T("about.109", "A Long-Term Partner.")}</h2>
            <p className="abBody">{T("about.110", "We go beyond installation. We deliver complete, reliable and customized solutions with continuous support, helping you reduce costs, improve efficiency and achieve a lasting positive impact.")}</p>
          </div>
          <div className="abWhyItems">
            {WHY.map((w, i) => { const Ic = I[w.icon]; return (
              <div className="abWhyItem abRv" key={w.title} style={{ '--d': `${0.07 * i}s` }}>
                <span className="abIc"><Ic /></span><div><h3>{w.title}</h3><p>{w.text}</p></div>
              </div>
            ); })}
          </div>
        </div>
      </section>

      {/* 10. APPROACH */}
      <section className="abApproach">
        <img className="abApproachImg" src={T("about.111", "/about/u-approach.jpg")} alt={T("about.112", "Engineers at a renewable energy site")} loading="lazy" />
        <div className="abWrap abApproachIn">
          <div className="abApproachCopy">
            <div className="abRv"><p className="abEyebrow abLine">{T("about.113", "OUR APPROACH")} <span /></p><h2>{T("about.114", "Engineering With Purpose")}</h2><p className="abBody abTight">{T("about.115", "A simple, structured approach to deliver reliable and long-term solutions.")}</p></div>
            <ol className="abSteps">
              {APPROACH.map((s, i) => { const Ic = I[s.icon]; return (
                <li className="abRv" key={s.no} style={{ '--d': `${0.14 * i}s` }}>
                  <span className="abStepNo">{s.no}</span>
                  <div><h3>{s.title}</h3><p>{s.text}</p><span className="abStepIc"><Ic /></span></div>
                  {i < APPROACH.length - 1 && <I.arrow className="abStepArrow" />}
                </li>
              ); })}
            </ol>
          </div>
        </div>
      </section>

      {/* 11. CTA */}
      <section className="abCta" aria-labelledby="abCtaT">
        <div className="abCtaBg" aria-hidden="true" />
        <div className="abWrap abCtaIn abRv">
          <div>
            <p className="abEyebrow abLine">{T("about.116", "OUR COMMITMENT")} <span /></p>
            <h2 id="abCtaT">{T("about.117", "We Don’t Just Install Systems.")}</h2>
            <p className="abBody">{T("about.118", "We build relationships that last and a future that is cleaner, greener and brighter for the next generation.")}</p>
          </div>
          <p className="abScript" aria-label="Go Green. Go Smart. Go iGo."><span>{T("about.119", "Go Green.")}</span><span>{T("about.120", "Go Smart,")}</span><span>{T("about.121", "Go iGo.")}</span><I.leaf className="abScriptLeaf" /></p>
        </div>
      </section>
    </div>
  );
}
