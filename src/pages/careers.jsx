import React from 'react';
import { useReveal, Ic, Head, Sec, Cta, Check, Flow, go } from './common.jsx';

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
    ['Hands-on technical training', 'tool', 'Learn practical skills in renewable energy systems through guided, on-site and workshop-based training.'],
    ['Real project exposure', 'build', 'Work alongside experienced teams on live solar, wind, biogas and water treatment projects.'],
    ['Mentorship & guidance', 'msg', 'Learn from engineers and technicians who guide you through safe, quality-focused work practices.']
  ];
  const programs = [
    ['Solar Energy Learnership', 'sun', 'Foundations of solar PV systems: site assessment, installation, commissioning and maintenance.'],
    ['Wind Energy Learnership', 'wind', 'An introduction to wind energy projects, installation support and operation & maintenance.'],
    ['Biogas Learnership', 'leaf', 'Understand biogas plant operation, organic waste handling and safe day-to-day plant practices.'],
    ['Water Treatment Learnership', 'drop', 'Learn the basics of water treatment systems, monitoring, operation and upkeep.']
  ];
  const steps = [
    { t: 'Check eligibility', d: 'Review the eligibility criteria above and choose the programme that interests you.' },
    { t: 'Send your application', d: 'Contact us with your details, your chosen programme and a short note about yourself.' },
    { t: 'Screening & interview', d: 'Our team reviews applications and speaks with shortlisted candidates.' },
    { t: 'Start learning', d: 'Selected learners are onboarded, briefed on safety and begin their programme.' }
  ];
  return (
    <div ref={ref} className="pg th-solar">
      <PageHero eyebrow="LEARNERSHIPS" title="Learn. Train." em="Grow green." img="/solar-hero.jpg"
        alt="Technicians in hard hats installing solar panels on a rooftop"
        text="Structured learning and on-the-job training that prepares the next generation of renewable energy professionals."
        primary={{ label: 'Apply Now', onClick: () => go('/contact') }} secondary={{ label: 'View Programs', onClick: () => jump('lrn-programs') }} />

      <Sec cls="alt"><Head eyebrow="LEARNING OPPORTUNITIES" title="Build skills that" em="power the future" text="Our learnerships combine practical training with real project experience in renewable energy." /><Cards items={opps} /></Sec>

      <Sec id="lrn-programs"><Head eyebrow="AVAILABLE PROGRAMS" title="Choose your" em="learning path" text="Programmes follow the four areas we work in. Intake details are shared when applications open." /><Cards items={programs} cols="g4" /></Sec>

      <Sec cls="alt"><div className="twoCol">
        <div><Head eyebrow="ELIGIBILITY" title="Who can" em="apply" text="We welcome motivated learners who are keen to build a career in renewable energy. Specific requirements may vary by programme." /></div>
        <Check cols={1} items={['A genuine interest in renewable energy and sustainability', 'The basic educational or technical background required for the chosen programme', 'Willingness to learn hands-on and work on project sites', 'A commitment to safety, quality and teamwork', 'Good communication and a positive attitude']} />
      </div></Sec>

      <Sec><Head eyebrow="HOW TO APPLY" title="Four simple steps" em="to get started" text="Select a step to see what happens." /><Flow steps={steps} variant="tabs" /></Sec>

      <Sec cls="alt"><Cta eyebrow="READY TO START?" title="Begin your" em="green career" text="Tell us which programme interests you and we will get back to you." label="Apply Now" to="/contact" /></Sec>
    </div>
  );
}

export function CareersPage() {
  const ref = useReveal();
  const why = [
    ['Meaningful work', 'leaf', 'Contribute to solar, wind, biogas and water projects that deliver cleaner energy and a better environment.'],
    ['Learn & grow', 'tool', 'Develop your skills through real projects, training and the guidance of experienced colleagues.'],
    ['Safety & quality first', 'shield', 'We build and maintain systems with a strong focus on safety, reliability and doing the job right.'],
    ['Collaborative teams', 'msg', 'Work with engineers, technicians and specialists who share a commitment to sustainable energy.']
  ];
  const areas = [
    ['Engineering & Design', 'bolt', 'System design, energy assessments and technical planning for renewable energy projects.'],
    ['Installation & Site Operations', 'build', 'Project execution, installation, commissioning and on-site supervision.'],
    ['Operations & Maintenance', 'tool', 'Monitoring, servicing and keeping installed systems performing at their best.'],
    ['Sales & Customer Engagement', 'home', 'Helping homes, businesses and industries find the right clean energy solution.']
  ];
  const steps = [
    { t: 'Send your CV', d: 'Share your CV and the area you are interested in through our Contact page.' },
    { t: 'Screening', d: 'Our team reviews your profile against current and upcoming needs.' },
    { t: 'Interview', d: 'Shortlisted candidates meet our team to discuss skills, experience and goals.' },
    { t: 'Offer & onboarding', d: 'Selected candidates receive an offer and are onboarded with a safety and project briefing.' }
  ];
  return (
    <div ref={ref} className="pg th-solar">
      <PageHero eyebrow="CAREERS" title="Build a career that" em="powers tomorrow" img="/about/u-who.jpg"
        alt="Engineers in safety vests and hard hats reviewing a solar farm with wind turbines at sunset"
        text="Join Green Energy and help deliver reliable, sustainable energy solutions for homes, businesses and communities."
        primary={{ label: 'View Open Positions', onClick: () => jump('car-open') }} secondary={{ label: 'Apply Now', onClick: () => go('/contact') }} />

      <Sec cls="alt"><Head eyebrow="WORKING WITH GREEN ENERGY" title="Why build your career" em="with us" text="We are a team focused on clean energy, quality work and long-term growth." /><Cards items={why} cols="g4" /></Sec>

      <Sec id="car-open"><Head eyebrow="AVAILABLE OPPORTUNITIES" title="Where you could" em="make an impact" text="Opportunities arise across these areas. Send us your CV and we will contact you when a suitable role opens." /><Cards items={areas} cols="g4" />
        <p className="emptyNote">Looking for a specific role? <button className="pgLink" onClick={() => go('/contact')}>Contact us <Ic n="arrow" size={16} /></button></p></Sec>

      <Sec cls="alt"><div className="twoCol">
        <div><Head eyebrow="SKILLS & QUALIFICATIONS" title="What we look" em="for" text="Requirements depend on the role. In general, we value:" /></div>
        <Check cols={1} items={['Relevant education or technical training for the role', 'Hands-on or project experience in energy, engineering or related fields', 'Strong commitment to safety and quality', 'Clear communication and teamwork', 'Eagerness to learn and adapt to new technology']} />
      </div></Sec>

      <Sec><Head eyebrow="APPLICATION PROCESS" title="From application" em="to onboarding" text="Select a step to see what happens." /><Flow steps={steps} variant="tabs" /></Sec>

      <Sec cls="alt"><Cta eyebrow="JOIN OUR TEAM" title="Ready to go" em="green with us?" text="Send us your details and tell us how you would like to contribute." label="Apply Now" to="/contact" /></Sec>
    </div>
  );
}
