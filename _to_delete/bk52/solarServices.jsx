import React from 'react';
import { Ic, Head, Sec } from './common.jsx';
import './solarServices.css';

const SS = [
  ['01', 'doc', 'Pre-sales and Design', '/about/a2-approach.jpg', [
    'Site survey and feasibility check (roof area, shadow analysis, load and structural check)',
    'Electricity bill and consumption analysis',
    'System sizing and PVsyst-based design, with single-line diagram and layout',
    'Quotation with generation estimate and ROI/payback calculation',
    'Advice on subsidy and non-subsidy options'] ],
  ['02', 'tool', 'Supply and Installation', '/solutions/ind-industrial.jpg', [
    'Rooftop solar (grid-connected) for homes, commercial buildings and industries',
    'Agri land solar installations',
    'Supply of DCR modules for subsidy projects and non-DCR modules for non-subsidy projects',
    'Inverters, mounting structures, cables, earthing, lightning and surge protection',
    'Civil and structural work for mounting',
    'Electrical work, testing and commissioning'] ],
  ['03', 'gov', 'Approvals and Subsidy Support', '/about/u-solar.jpg', [
    'Registration of the customer on the PM Surya Ghar portal, and subsidy application support',
    'Feasibility approval and net-metering application with the DISCOM',
    'Inspection coordination and meter installation',
    'Completion documents and subsidy claim follow-up',
    'State scheme support through TEDA once registered'] ],
  ['04', 'bolt', 'Finance Support', '/solutions/ind-residential.jpg', [
    'Help with bank loan applications for solar',
    'Guidance on loan and subsidy documentation'] ],
  ['05', 'shield', 'After-sales', '/products/' + encodeURI('solar farm monitoring.jpg'), [
    'Warranty handling for panels, inverters and workmanship',
    'Preventive maintenance visits',
    'Breakdown and complaint service',
    'Panel cleaning',
    'Performance monitoring and generation reports',
    'Annual maintenance contracts (AMC): basic, standard and premium'] ],
];

export function SolarServices() {
  return (
    <Sec id="solar-services" cls="ssSec">
      <Head eyebrow="SOLAR SERVICES" title="Complete solar services," em="from first survey to after-sales" center />
      <div className="ssGrid">
        {SS.map(([n, ic, t, img, pts]) => (
          <article className="ssCard" key={n}>
            <div className="ssImg"><img src={img} alt={t} loading="lazy" /><span className="ssIc"><Ic n={ic} size={24} /></span><span className="ssNo">{n}</span></div>
            <div className="ssBody">
              <h3>{t}</h3>
              <ul>{pts.map((p) => <li key={p}><Ic n="check" size={16} /><span>{p}</span></li>)}</ul>
            </div>
          </article>
        ))}
      </div>
    </Sec>
  );
}
