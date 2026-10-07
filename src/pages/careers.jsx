import React from 'react';
import { useCms } from '../admin/store.js';
import { useReveal, Ic, Head, Sec, Cta, Check, Flow, go } from './common.jsx';
export { CareersPage } from './careersPage.jsx';

import { T } from '../content/T.js';
/* NOTE: programme / role details below are general placeholders - replace with the
   real programmes, requirements and dates before launch. */

const jump = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

function PageHero({ eyebrow, title, em, text, img, alt, primary, secondary }) {
  return (
    <div className="pgHero split">
      <div className="pgw heroGrid">
        <div className="heroCopy">
          <p className="pgEye">{eyebrow}</p>
          <h1>{title} <em>{em}</em></h1>
          <p className="heroText">{text}</p>
          <div className="heroBtns">
            <button className="pgBtn" onClick={primary.onClick}>{primary.label} <Ic n="arrow" size={18} /></button>
            {secondary && <button className="pgGhost" onClick={secondary.onClick}>{secondary.label}</button>}
          </div>
        </div>
        <div className="heroVis plain"><img src={img} alt={alt} loading="eager" /></div>
      </div>
    </div>
  );
}

const Cards = ({ items, cols = 'g3' }) => (
  <div className={'cardGrid ' + cols}>
    {items.map(([t, ic, d]) => (
      <div className="segCard rv" key={t}><span className="iIc lg"><Ic n={ic} size={28} /></span><h3>{t}</h3><p>{d}</p></div>
    ))}
  </div>
);

export function LearnershipsPage() {
  const ref = useReveal();
  const opps = [
    [T("careers.001", "Hands-on technical training"), 'tool', T("careers.002", "Learn practical skills in renewable energy systems through guided, on-site and workshop-based training.")],
    [T("careers.003", "Real project exposure"), 'build', T("careers.004", "Work alongside experienced teams on live solar, wind, biogas and water treatment projects.")],
    [T("careers.005", "Mentorship & guidance"), 'msg', T("careers.006", "Learn from engineers and technicians who guide you through safe, quality-focused work practices.")]
  ];
  const programs = [
    [T("careers.007", "Solar Energy Learnership"), 'sun', T("careers.008", "Foundations of solar PV systems: site assessment, installation, commissioning and maintenance.")],
    [T("careers.009", "Wind Energy Learnership"), 'wind', T("careers.010", "An introduction to wind energy projects, installation support and operation & maintenance.")],
    [T("careers.011", "Biogas Learnership"), 'leaf', T("careers.012", "Understand biogas plant operation, organic waste handling and safe day-to-day plant practices.")],
    [T("careers.013", "Water Treatment Learnership"), 'drop', T("careers.014", "Learn the basics of water treatment systems, monitoring, operation and upkeep.")]
  ];
  const steps = [
    { t: T("careers.015", "Check eligibility"), d: T("careers.016", "Review the eligibility criteria above and choose the programme that interests you.") },
    { t: T("careers.017", "Send your application"), d: T("careers.018", "Contact us with your details, your chosen programme and a short note about yourself.") },
    { t: T("careers.019", "Screening & interview"), d: T("careers.020", "Our team reviews applications and speaks with shortlisted candidates.") },
    { t: T("careers.021", "Start learning"), d: T("careers.022", "Selected learners are onboarded, briefed on safety and begin their programme.") }
  ];
  return (
    <div ref={ref} className="pg th-solar">
      <PageHero eyebrow={T("careers.023", "LEARNERSHIPS")} title={T("careers.024", "Learn. Train.")} em={T("careers.025", "Grow green.")} img="/solar-hero.jpg"
        alt={T("careers.026", "Technicians in hard hats installing solar panels on a rooftop")}
        text={T("careers.027", "Structured learning and on-the-job training that prepares the next generation of renewable energy professionals.")}
        primary={{ label: T("careers.028", "Apply Now"), onClick: () => go('/contact') }} secondary={{ label: T("careers.029", "View Programs"), onClick: () => jump('lrn-programs') }} />

      <Sec cls="alt"><Head eyebrow={T("careers.030", "LEARNING OPPORTUNITIES")} title={T("careers.031", "Build skills that")} em={T("careers.032", "power the future")} text={T("careers.033", "Our learnerships combine practical training with real project experience in renewable energy.")} /><Cards items={opps} /></Sec>

      <Sec id="lrn-programs"><Head eyebrow={T("careers.034", "AVAILABLE PROGRAMS")} title={T("careers.035", "Choose your")} em={T("careers.036", "learning path")} text={T("careers.037", "Programmes follow the four areas we work in. Intake details are shared when applications open.")} /><Cards items={programs} cols="g4" /></Sec>

      <Sec cls="alt"><div className="twoCol">
        <div><Head eyebrow={T("careers.038", "ELIGIBILITY")} title={T("careers.039", "Who can")} em={T("careers.040", "apply")} text={T("careers.041", "We welcome motivated learners who are keen to build a career in renewable energy. Specific requirements may vary by programme.")} /></div>
        <Check cols={1} items={['A genuine interest in renewable energy and sustainability', 'The basic educational or technical background required for the chosen programme', 'Willingness to learn hands-on and work on project sites', 'A commitment to safety, quality and teamwork', 'Good communication and a positive attitude']} />
      </div></Sec>

      <Sec><Head eyebrow={T("careers.042", "HOW TO APPLY")} title={T("careers.043", "Four simple steps")} em={T("careers.044", "to get started")} text={T("careers.045", "Select a step to see what happens.")} /><Flow steps={steps} variant="tabs" /></Sec>

      <Sec cls="alt"><Cta eyebrow={T("careers.046", "READY TO START?")} title={T("careers.047", "Begin your")} em={T("careers.048", "green career")} text={T("careers.049", "Tell us which programme interests you and we will get back to you.")} label={T("careers.050", "Apply Now")} to="/contact" /></Sec>
    </div>
  );
}

export function CareersPageOld() {
  const ref = useReveal();
  const why = [
    [T("careers.051", "Meaningful work"), 'leaf', T("careers.052", "Contribute to solar, wind, biogas and water projects that deliver cleaner energy and a better environment.")],
    [T("careers.053", "Learn & grow"), 'tool', T("careers.054", "Develop your skills through real projects, training and the guidance of experienced colleagues.")],
    [T("careers.055", "Safety & quality first"), 'shield', T("careers.056", "We build and maintain systems with a strong focus on safety, reliability and doing the job right.")],
    [T("careers.057", "Collaborative teams"), 'msg', T("careers.058", "Work with engineers, technicians and specialists who share a commitment to sustainable energy.")]
  ];
  const cj = useCms('careers');
  const ICONS = ['bolt', 'build', 'tool', 'home'];
  const areas = (Array.isArray(cj) ? cj : []).filter((x) => x.status === 'published').map((x, i) => [x.title, ICONS[i % 4], x.description ? x.description.replace(/<[^>]+>/g, '') : '']);
  const steps = [
    { t: T("careers.059", "Send your CV"), d: T("careers.060", "Share your CV and the area you are interested in through our Contact page.") },
    { t: T("careers.061", "Screening"), d: T("careers.062", "Our team reviews your profile against current and upcoming needs.") },
    { t: T("careers.063", "Interview"), d: T("careers.064", "Shortlisted candidates meet our team to discuss skills, experience and goals.") },
    { t: T("careers.065", "Offer & onboarding"), d: T("careers.066", "Selected candidates receive an offer and are onboarded with a safety and project briefing.") }
  ];
  return (
    <div ref={ref} className="pg th-solar">
      <PageHero eyebrow={T("careers.067", "CAREERS")} title={T("careers.068", "Build a career that")} em={T("careers.069", "powers tomorrow")} img="/about/u-who.jpg"
        alt={T("careers.070", "Engineers in safety vests and hard hats reviewing a solar farm with wind turbines at sunset")}
        text={T("careers.071", "Join Green Energy and help deliver reliable, sustainable energy solutions for homes, businesses and communities.")}
        primary={{ label: T("careers.072", "View Open Positions"), onClick: () => jump('car-open') }} secondary={{ label: T("careers.073", "Apply Now"), onClick: () => go('/contact') }} />

      <Sec cls="alt"><Head eyebrow={T("careers.074", "WORKING WITH GREEN ENERGY")} title={T("careers.075", "Why build your career")} em={T("careers.076", "with us")} text={T("careers.077", "We are a team focused on clean energy, quality work and long-term growth.")} /><Cards items={why} cols="g4" /></Sec>

      <Sec id="car-open"><Head eyebrow={T("careers.078", "AVAILABLE OPPORTUNITIES")} title={T("careers.079", "Where you could")} em={T("careers.080", "make an impact")} text={T("careers.081", "Opportunities arise across these areas. Send us your CV and we will contact you when a suitable role opens.")} /><Cards items={areas} cols="g4" />
        <p className="emptyNote">{T("careers.082", "Looking for a specific role?")} <button className="pgLink" onClick={() => go('/contact')}>{T("careers.083", "Contact us")} <Ic n="arrow" size={16} /></button></p></Sec>

      <Sec cls="alt"><div className="twoCol">
        <div><Head eyebrow={T("careers.084", "SKILLS & QUALIFICATIONS")} title={T("careers.085", "What we look")} em={T("careers.086", "for")} text={T("careers.087", "Requirements depend on the role. In general, we value:")} /></div>
        <Check cols={1} items={['Relevant education or technical training for the role', 'Hands-on or project experience in energy, engineering or related fields', 'Strong commitment to safety and quality', 'Clear communication and teamwork', 'Eagerness to learn and adapt to new technology']} />
      </div></Sec>

      <Sec><Head eyebrow={T("careers.088", "APPLICATION PROCESS")} title={T("careers.089", "From application")} em={T("careers.090", "to onboarding")} text={T("careers.091", "Select a step to see what happens.")} /><Flow steps={steps} variant="tabs" /></Sec>

      <Sec cls="alt"><Cta eyebrow={T("careers.092", "JOIN OUR TEAM")} title={T("careers.093", "Ready to go")} em={T("careers.094", "green with us?")} text={T("careers.095", "Send us your details and tell us how you would like to contribute.")} label={T("careers.096", "Apply Now")} to="/contact" /></Sec>
    </div>
  );
}
