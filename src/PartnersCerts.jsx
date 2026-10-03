import React from 'react';
import './partnersCerts.css';

/* Partner wordmarks are live text. To use an official logo file instead,
   drop it in /public/partners and add  src: '/partners/<file>'  to the entry. */
const PARTNERS = [
  { id: 'tata', name: 'TATA POWER', cls: 'wTata', render: () => <><b>TATA</b> <span>POWER</span></> },
  { id: 'adani', name: 'adani', cls: 'wAdani', render: () => <>adani</> },
  { id: 'suzlon', name: 'SUZLON', cls: 'wSuzlon', render: () => <>SUZLON</> },
  { id: 'abb', name: 'ABB', cls: 'wAbb', render: () => <>ABB</> },
  { id: 'scatec', name: 'Scatec', cls: 'wScatec', render: () => <>Scatec</> },
  { id: 'canadian', name: 'CanadianSolar', cls: 'wCan', render: () => <>Canadian<b>Solar</b></> },
  { id: 'sungrow', name: 'SUNGROW', cls: 'wSun', render: () => <>SUNGROW<small>Clean power for all</small></> }
];

const IsoMark = ({ no }) => (
  <div className="pcIso">
    <svg viewBox="0 0 80 52" aria-hidden="true">
      <g fill="none" stroke="#1b4f9c" strokeWidth="1.6">
        <ellipse cx="40" cy="26" rx="34" ry="22" />
        <ellipse cx="40" cy="26" rx="14" ry="22" />
        <path d="M6 26h68M12 14h56M12 38h56" />
      </g>
      <text x="40" y="35" textAnchor="middle" fontFamily="Arial Black,Arial,sans-serif" fontWeight="900" fontSize="28" fill="#1b4f9c" stroke="#fff" strokeWidth="6" paintOrder="stroke">ISO</text>
    </svg>
    <span>{no}</span>
  </div>
);

const CERTS = [
  { id: 'i9', label: 'ISO 9001:2015', render: () => <IsoMark no="9001:2015" /> },
  { id: 'i14', label: 'ISO 14001:2015', render: () => <IsoMark no="14001:2015" /> },
  { id: 'i45', label: 'ISO 45001:2018', render: () => <IsoMark no="45001:2018" /> },
  { id: 'mnre', label: 'MNRE', render: () => <div className="pcMnre"><b>MNRE</b><small>Ministry of New and Renewable Energy</small></div> },
  { id: 'iec', label: 'IEC', render: () => <img src="/partners/cert-iec.png" alt="IEC" loading="lazy" /> },
  { id: 'ce', label: 'CE', render: () => <img src="/partners/cert-ce.png" alt="CE" loading="lazy" /> }
];

const Bush = ({ flip }) => (
  <svg className={'pcBush' + (flip ? ' flip' : '')} viewBox="0 0 200 90" aria-hidden="true">
    {[[20, 70, -50, 1], [45, 60, -25, 1.15], [75, 52, -8, 1.25], [105, 56, 12, 1.2], [135, 58, 32, 1.1], [160, 68, 55, 1], [90, 74, 0, .9], [55, 76, -35, .8], [125, 76, 40, .8]].map(([x, y, r, s], i) => (
      <path key={i} transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} d="M0 0C-14-14-12-34 0-48 12-34 14-14 0 0Z" fill={i % 2 ? '#3f9a45' : '#2b7d3a'} />
    ))}
  </svg>
);

export default function PartnersCerts({ showCerts = true }) {
  return (
    <section className="pc" id="partners" aria-label="Partners and certifications">
      <div className="pcP">
        <div className="pcBgP" aria-hidden="true">
          <img className="pcMap" src="/partners/world-map.png" alt="" loading="lazy" />
          <div className="pcScene"><img src="/partners/energy-landscape.jpg" alt="" loading="lazy" /></div>
        </div>
        <div className="pcWrap">
          <header className="pcHead">
            <p className="pcEye"><span />OUR PARTNERS</p>
            <h2><span className="d">Trusted Partners</span><span className="g">for a Cleaner Tomorrow</span></h2>
            <p className="pcLead">We collaborate with global technology leaders to deliver{' '}<br />high-quality, reliable, and sustainable energy solutions.</p>
          </header>
          <ul className="pcLogos">
            {PARTNERS.map((p) => (
              <li className="pcLogo" key={p.id} aria-label={p.name}>
                {p.src ? <img src={p.src} alt={p.name} loading="lazy" /> : <span className={'pcWord ' + p.cls}>{p.render()}</span>}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {showCerts && <div className="pcC">
        <div className="pcWrap pcCGrid">
          <header className="pcHead pcHeadC">
            <p className="pcEye"><span />OUR CERTIFICATIONS</p>
            <h2><span className="d">Certified for</span><span className="g">Quality &amp; Reliability</span></h2>
            <p className="pcLead">Our solutions and processes comply with international{' '}<br />standards for quality, safety, and environmental responsibility.</p>
          </header>
          <div className="pcStage">
            <Bush /><Bush flip />
            <div className="pcPed" aria-hidden="true" />
            <ul className="pcCerts">
              {CERTS.map((c) => (
                <li className="pcCert" key={c.id} aria-label={c.label}>{c.render()}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>}
    </section>
  );
}
