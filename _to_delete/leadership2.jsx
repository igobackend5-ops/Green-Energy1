import React from 'react';
import { useReveal, Ic, Link } from './common.jsx';
import './leadership.css';

/* Names, designations and hierarchy follow the iGo Group leadership list supplied by the client.
   Photos are not imported (not available to the project): each card shows a neutral photo placeholder.
   To add photos: drop the .webp files into /public/leadership using the names in PHOTO below (e.g. shiva.webp); cards fall back to a placeholder until the file exists. */
const T1 = [{ n: 'Dr. John Yesudhas', d: 'Founder & Group CEO' }];
const T2 = [{ n: 'Mrs. Reega Merlin Esther Newton', d: 'Director, IGO Group' }];
const T3 = [
  { n: 'Mr. Vignesh Sridharan', d: 'General Manager, IGO Group' },
  { n: 'Mr. Venkatnarayanan', d: 'National Sales Head, IGO Group' },
  { n: 'Mr. Basha', d: 'National Head, L1 Officer — IGO Agri Estate & Vendor Dpt' },
  { n: 'Mr. Shiva', d: 'National Head, L1 Officer — IGO Buyback, Farmers Factory, Valluvam, Farm Gate Mandi' },
  { n: 'Mr. Deepak', d: 'National Head, L1 Officer — IFIN, IGO Academy, Marketing, Engineering, Site Visit, CRM, Rental, Polyhouse' },
  { n: 'Mr. Saravanan', d: 'National Head, L1 Officer — IGO Purchase, Agri Mart' }
];
const T4 = [
  ['Mr. Amirthalingam', 'Head, Farmers Factory'], ['Mr. Velladurai', 'Head, Legal and Data Management'],
  ['Mr. Ramprasath', 'SMO, Agri Dpt'], ['Mr. Karthikeyan', 'SMO, Agri Dpt'], ['Mr. Prasath', 'SMO, Engineering Dpt'],
  ['Mr. Vignesh', 'Head, IT & AI'], ['Mr. Tharun', 'Head, CEO Office Admin'], ['Mr. Yuthish', 'Head, IGO R&D & New Projects'],
  ['Mr. Udaykiran', 'SMO, IGO Business Development'], ['Ms. Aarthi', 'Head, IGO Marketing'], ['Mr. Sharu', 'Head, IGO Marketing'],
  ['Ms. Shanmathi S', 'Head, IGO Academy'], ['Ms. Maheshwari', 'Head, IGO Accounts'], ['Mr. Hariharan', 'SMO, IGO R&D & New Projects'],
  ['Mr. Surya', 'SMO, IGO Cocopeat Factory'], ['Mr. Punith', 'SMO, IGO Site Visits'], ['Ms. Amritha', 'Head, Valluvam Products'],
  ['Mr. Douglas', 'SMO, Legal & IGO Hostel'], ['Mr. Sathish', 'HR, IGO Group'], ['Mr. Raagul Raj R', 'Head, JV Engineering'],
  ['Mr. Mowli', 'SMO, FF Field Business Development'], ['Mr. Rajesh', 'SMO, IGO Engineering Dpt']
].map(([n, d]) => ({ n, d }));
const T5 = ['Mr. Sanjay Vasanthakumar', 'Mr. Ranjeet Kumar', 'Mr. Jitendra Kumar', 'Mr. Keerthieeswaran'].map((n) => ({ n, d: 'Area Manager, Agri Dpt' }));
const STATS = [['26+', 'Brands'], ['18+', 'Divisions'], ['2000+', 'Team Strength'], ['28', 'States'], ['700+', 'Districts']];

const PHOTO = {"Dr. John Yesudhas": "ceo-john-yesudhas", "Mrs. Reega Merlin Esther Newton": "reega-merlin-esther-newton", "Mr. Vignesh Sridharan": "vignesh-sridharan", "Mr. Venkatnarayanan": "venkatnarayanan", "Mr. Basha": "am-basha", "Mr. Shiva": "shiva", "Mr. Deepak": "deepak-adithiya", "Mr. Saravanan": "saravanan", "Mr. Amirthalingam": "amirthalingam-s", "Mr. Velladurai": "velladurai", "Mr. Ramprasath": "ram-prasath", "Mr. Karthikeyan": "karthikeyan", "Mr. Prasath": "prasath-rajeswaran", "Mr. Vignesh": "vignesh-a", "Mr. Tharun": "tharun-kumar-a", "Mr. Yuthish": "yuthish-priyan", "Mr. Udaykiran": "udaykiran", "Ms. Aarthi": "aarthi", "Mr. Sharu": "sharuk", "Ms. Shanmathi S": "shanmathi-vignesh", "Ms. Maheshwari": "maheshwari", "Mr. Hariharan": "hari-haran-k", "Mr. Surya": "surya", "Mr. Punith": "punith", "Ms. Amritha": "amritha", "Mr. Douglas": "douglas", "Mr. Sathish": "sathish", "Mr. Raagul Raj R": "raagul-raj-r", "Mr. Mowli": "mowli", "Mr. Rajesh": "rajesh", "Mr. Sanjay Vasanthakumar": "sanjay-vasanthakumar", "Mr. Ranjeet Kumar": "ranjeet-kumar", "Mr. Jitendra Kumar": "jitendra-kumar", "Mr. Keerthieeswaran": "keerthieeswaran"};
const initials = (n) => n.replace(/^(Mr|Mrs|Ms|Dr)\.?\s+/i, '').split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join('');

function Card({ p, size = 'md', i = 0 }) {
  const [bad, setBad] = React.useState(false);
  const src = p.photo || (PHOTO[p.n] ? '/leadership/' + PHOTO[p.n] + '.webp' : '');
  return (
    <article className={'ldCard ld-' + size + ' rv'} style={{ '--d': (i % 6) * 60 + 'ms' }}>
      <div className="ldPhoto">
        {src && !bad ? <img src={src} alt={p.n} loading="lazy" onError={() => setBad(true)} /> : (
          <>
            <svg viewBox="0 0 100 125" aria-hidden="true"><circle cx="50" cy="46" r="19" /><path d="M14 125c0-26 16-42 36-42s36 16 36 42z" /></svg>
            <span className="ldIni" aria-hidden="true">{initials(p.n)}</span>
          </>
        )}
      </div>
      <div className="ldInfo"><h3>{p.n}</h3><p>{p.d}</p></div>
    </article>
  );
}

const Tier = ({ no, label, sub, children, cls = '' }) => (
  <section className={'ldTier ' + cls} aria-label={label}>
    <div className="ldTierHead rv"><span className="ldNo">TIER {no}</span><h2>{label}</h2>{sub && <p>{sub}</p>}</div>
    {children}
  </section>
);

export function LeadershipPage() {
  const ref = useReveal();
  return (
    <div ref={ref} className="pg ldr">
      <header className="ldHero">
        <div className="ldWrap">
          <p className="ldEye rv">OUR LEADERSHIP</p>
          <h1 className="rv">The Minds Behind <em>IGO</em></h1>
          <p className="ldLead rv">Meet the leaders driving India's fastest-growing farming ecosystem — from executive vision to department excellence.</p>
        </div>
      </header>

      <div className="ldWrap ldChart">
        <div className="ldGroup rv"><span /><h2>IGO Group of Companies</h2><span /></div>

        <Tier no="1" label="Founder & Group CEO" cls="ld1"><div className="ldRow r1">{T1.map((p, i) => <Card key={p.n} p={p} size="xl" i={i} />)}</div></Tier>
        <Tier no="2" label="Directors" cls="ld2"><div className="ldRow r1">{T2.map((p, i) => <Card key={p.n} p={p} size="lg" i={i} />)}</div></Tier>
        <Tier no="3" label="General Manager, National Sales Head & National Heads" cls="ld3"><div className="ldGrid g3">{T3.map((p, i) => <Card key={p.n} p={p} size="md" i={i} />)}</div></Tier>
        <Tier no="4" label="Core Managers & Department Heads" cls="ld4"><div className="ldGrid g4">{T4.map((p, i) => <Card key={p.n} p={p} size="sm" i={i} />)}</div></Tier>
        <Tier no="5" label="Area Managers, Agri Dpt" cls="ld5"><div className="ldGrid g4">{T5.map((p, i) => <Card key={p.n} p={p} size="sm" i={i} />)}</div></Tier>
      </div>

      <section className="ldStats">
        <div className="ldWrap">
          <ul className="ldStatRow">{STATS.map(([v, l]) => <li key={l} className="rv"><b>{v}</b><span>{l}</span></li>)}</ul>
          <p className="ldStatTxt rv">A diversified farming-tech conglomerate connecting farms, food, fintech and technology across India.</p>
          <address className="ldAddr rv"><Ic n="pin" size={20} /><span><strong>Head Office</strong>No. 17, Kovalan Street,<br />2nd Main Road, Uthandi Kanathur,<br />Chennai – 600119, India</span></address>
        </div>
      </section>
    </div>
  );
}
