import React, { useState, useEffect } from 'react';
import { useReveal, Head, Sec, go } from './common.jsx';
import { T } from '../content/T.js';
import './subsidy.css';

const GROUPS = [T("subsidy.012", "Residential Rooftop Project"), T("subsidy.013", "Commercial and Institutional Project"), T("subsidy.014", "Agri Land Solar and Pumping Project"), T("subsidy.015", "Fencing, Estate and Nursery Project"), T("subsidy.016", "Biogas (future)")];
const SCHEMES = [
  { n: 1, title: T("subsidy.017", "PM Surya Ghar"), tag: T("subsidy.018", "Central"), grp: 0, fields: [[T("subsidy.019", "Who"), T("subsidy.020", "Homes only, with DCR panels")], [T("subsidy.021", "Gets"), T("subsidy.022", "Rs 60,000 for 2 kW, Rs 78,000 for 3 kW and above"), true], [T("subsidy.023", "Paid"), T("subsidy.024", "After the net meter is commissioned")]], note: '' },
  { n: 2, title: T("subsidy.025", "PM Surya Ghar bank loan"), tag: T("subsidy.026", "Central"), grp: 0, fields: [[T("subsidy.027", "Who"), T("subsidy.028", "Home customers")], [T("subsidy.029", "Gets"), T("subsidy.030", "Up to Rs 2 lakh at around 7%, no collateral"), true]], note: '' },
  { n: 3, title: T("subsidy.031", "Tamil Nadu rooftop top-up"), tag: T("subsidy.032", "State"), grp: 0, fields: [[T("subsidy.033", "Who"), T("subsidy.034", "Tamil Nadu homes")], [T("subsidy.035", "Gets"), T("subsidy.036", "Extra Rs 22,000 on 3 kW, total Rs 1,00,000"), true]], note: '' },
  { n: 4, title: T("subsidy.037", "Accelerated depreciation"), tag: T("subsidy.038", "Income tax"), grp: 1, fields: [[T("subsidy.039", "Who"), T("subsidy.040", "Businesses that own the plant")], [T("subsidy.041", "Gets"), T("subsidy.042", "40% tax write-off in year 1"), true]], note: T("subsidy.043", "The client's CA must confirm") },
  { n: 5, title: T("subsidy.044", "GST at 5%"), tag: T("subsidy.045", "Tax"), grp: 1, fields: [[T("subsidy.046", "Gets"), T("subsidy.047", "5% GST on panels and inverters"), true]], note: '' },
  { n: 6, title: T("subsidy.048", "PM-KUSUM"), tag: T("subsidy.049", "Central"), grp: 2, fields: [[T("subsidy.050", "Gets"), T("subsidy.051", "30% central + 30% state, farmer pays the rest"), true]], note: T("subsidy.052", "Component B deadline passed on 30 Sept 2026. Do not promise.") },
  { n: 7, title: T("subsidy.053", "CM Solar Pumpset Scheme"), tag: T("subsidy.054", "Tamil Nadu"), grp: 2, fields: [[T("subsidy.055", "Gets"), T("subsidy.056", "70% subsidy, farmer pays 30%"), true], [T("subsidy.057", "Through"), T("subsidy.058", "Agricultural Engineering Department")]], note: '' },
  { n: 8, title: T("subsidy.059", "TN Solar Fencing Scheme"), tag: T("subsidy.060", "Tamil Nadu"), grp: 3, fields: [[T("subsidy.061", "Gets"), T("subsidy.062", "40% of the cost paid back to the farmer"), true]], note: T("subsidy.063", "Only empanelled firms can supply") },
  { n: 9, title: T("subsidy.064", "Himachal Pradesh Solar Fencing"), tag: T("subsidy.065", "Himachal Pradesh"), grp: 3, fields: [[T("subsidy.066", "Gets"), T("subsidy.067", "80% for individuals, 85% for groups"), true]], note: T("subsidy.068", "Verify the rate") },
  { n: 10, title: T("subsidy.069", "Goa Assistance for Fencing"), tag: T("subsidy.070", "Goa"), grp: 3, fields: [[T("subsidy.071", "Gets"), T("subsidy.072", "Includes solar battery fencing"), true]], note: T("subsidy.073", "Check the state office") },
  { n: 11, title: T("subsidy.074", "GOBARdhan"), tag: T("subsidy.075", "Central"), grp: 4, fields: [[T("subsidy.076", "Gets"), T("subsidy.077", "Rs 23,731 crore programme, approved August 2026"), true]], note: T("subsidy.078", "Mainly for compressed biogas") }
];

const DET = {
  1: { about: T("subsidy.301", "Launched on 13 February 2024 with an outlay of Rs 75,021 crore, the scheme aims to put rooftop solar on 1 crore homes and give up to 300 units of free electricity a month."), rows: [[T("subsidy.302", "Central support"), T("subsidy.303", "Rs 60,000 for 2 kW and Rs 78,000 for 3 kW and above")], [T("subsidy.304", "Eligible"), T("subsidy.305", "Residential homes with a suitable roof, using DCR panels")], [T("subsidy.306", "When paid"), T("subsidy.307", "After the net meter is commissioned")]], steps: [T("subsidy.308", "Register on the national portal and choose your electricity company"), T("subsidy.309", "Apply for rooftop solar and get approval"), T("subsidy.310", "Install the plant through a registered vendor"), T("subsidy.311", "Net meter fitting and inspection"), T("subsidy.312", "Submit the commissioning report and receive the subsidy in your bank account")], docs: [], src: { label: T("subsidy.313", "pmsuryaghar.gov.in"), url: "https://pmsuryaghar.gov.in" }, warn: '' },
  2: { about: T("subsidy.314", "Home customers installing rooftop solar can take a collateral-free bank loan under the scheme to cover the part not covered by the subsidy."), rows: [[T("subsidy.315", "Loan"), T("subsidy.316", "Up to Rs 2 lakh at around 7%, no collateral")], [T("subsidy.317", "Eligible"), T("subsidy.318", "Home customers installing rooftop solar")], [T("subsidy.319", "Where"), T("subsidy.320", "Participating banks, for example Indian Bank")]], steps: [T("subsidy.321", "Get your rooftop solar quotation"), T("subsidy.322", "Apply to a participating bank branch"), T("subsidy.323", "Bank sanctions the loan and pays the vendor"), T("subsidy.324", "Install and commission the plant, then claim the subsidy")], docs: [], src: { label: T("subsidy.325", "pmsuryaghar.gov.in"), url: "https://pmsuryaghar.gov.in" }, warn: '' },
  3: { about: T("subsidy.326", "Tamil Nadu homes may get a state top-up on top of the central PM Surya Ghar subsidy."), rows: [[T("subsidy.327", "State top-up"), T("subsidy.328", "Extra Rs 22,000 on 3 kW, total Rs 1,00,000")], [T("subsidy.329", "Eligible"), T("subsidy.330", "Tamil Nadu homes")]], steps: [T("subsidy.331", "Apply under PM Surya Ghar first"), T("subsidy.332", "Ask your Tamil Nadu electricity office about the state top-up")], docs: [], src: { label: T("subsidy.333", "pmsuryaghar.gov.in"), url: "https://pmsuryaghar.gov.in" }, warn: T("subsidy.334", "Some sources describe this only as up to Rs 1 lakh of extra state support, with guidelines still to come. Confirm the exact figure with your Tamil Nadu electricity office.") },
  4: { about: T("subsidy.335", "Businesses that own a solar plant can write off a large part of its cost against income tax in the first year."), rows: [[T("subsidy.336", "Benefit"), T("subsidy.337", "40% tax write-off in year 1")], [T("subsidy.338", "Eligible"), T("subsidy.339", "Businesses that own the plant")]], steps: [T("subsidy.340", "Buy and own the plant"), T("subsidy.341", "Claim the depreciation in the income tax return")], docs: [], src: null, warn: T("subsidy.342", "The client's CA must confirm the rate and whether it applies to your case.") },
  5: { about: T("subsidy.343", "Solar panels and inverters are charged a reduced GST rate."), rows: [[T("subsidy.344", "Rate"), T("subsidy.345", "5% GST on panels and inverters")]], steps: [T("subsidy.346", "The rate is applied on the invoice by your vendor")], docs: [], src: null, warn: T("subsidy.347", "Rates can change. Confirm with your CA or the GST council notification.") },
  6: { about: T("subsidy.348", "PM-KUSUM supports farmers with stand-alone solar pumps (Component B) and solarisation of existing grid pumps (Component C)."), rows: [[T("subsidy.349", "Normal states"), T("subsidy.350", "30% central + 30% state + 10% farmer + 30% bank finance")], [T("subsidy.351", "Special category states"), T("subsidy.352", "50% central + 30% state + 10% farmer + 10% bank")], [T("subsidy.353", "Eligible"), T("subsidy.354", "Landowner farmers, with preference for micro-irrigation")], [T("subsidy.355", "Pump size"), T("subsidy.356", "Up to 7.5 HP")], [T("subsidy.357", "Bank loan"), T("subsidy.358", "Rs 25,000 to 10 lakh, up to 120 months, 1-year MCLR + 350 bps (SBI)")]], steps: [T("subsidy.359", "Apply to your state nodal agency or the portal"), T("subsidy.360", "Submit documents and get approval"), T("subsidy.361", "Install through an empanelled vendor"), T("subsidy.362", "Inspection, then subsidy is released")], docs: [T("subsidy.363", "Application form"), T("subsidy.364", "Photographs"), T("subsidy.365", "ID and address proof"), T("subsidy.366", "Land holding certificate"), T("subsidy.367", "Cropping pattern"), T("subsidy.368", "MNRE benchmark cost")], src: { label: T("subsidy.369", "pmkusum.mnre.gov.in"), url: "https://pmkusum.mnre.gov.in" }, warn: T("subsidy.370", "MNRE set 30 September 2026 as the last date to commission pumps under Components B and C. That date has passed, so do not promise this to customers.") },
  7: { about: T("subsidy.371", "The Tamil Nadu Chief Minister's scheme gives farmers off-grid stand-alone solar pumpsets at a high subsidy."), rows: [[T("subsidy.372", "Subsidy"), T("subsidy.373", "70% = 40% state + 30% MNRE, farmer pays 30%")], [T("subsidy.374", "Extra"), T("subsidy.375", "A further 20% for SC/ST small and marginal farmers")], [T("subsidy.376", "Eligible"), T("subsidy.377", "All farmers and farmer groups")], [T("subsidy.378", "Area"), T("subsidy.379", "All districts except Chennai")]], steps: [T("subsidy.380", "Apply to the Assistant Executive Engineer, Agricultural Engineering Department, at revenue division level"), T("subsidy.381", "Department verifies and approves"), T("subsidy.382", "Empanelled firm installs the pump"), T("subsidy.383", "Subsidy is given to the supplier and farmer pays the balance")], docs: [], src: { label: T("subsidy.384", "aed.tn.gov.in"), url: "https://aed.tn.gov.in" }, warn: '' },
  8: { about: T("subsidy.385", "Solar fencing protects farm land from animals, with part of the cost paid back to the farmer."), rows: [[T("subsidy.386", "Subsidy"), T("subsidy.387", "40% of the cost, back-ended to the farmer's bank account")], [T("subsidy.388", "Standard units"), T("subsidy.389", "5, 7 and 10 line fences for all animals except elephants")], [T("subsidy.390", "Hanging type"), T("subsidy.391", "Hanging-type units, including for elephants")], [T("subsidy.392", "Supplier"), T("subsidy.393", "Only empanelled firms")]], steps: [T("subsidy.394", "Apply through the Tamil Nadu agriculture or horticulture office"), T("subsidy.395", "Choose an empanelled firm and install the fence"), T("subsidy.396", "Submit proof of installation"), T("subsidy.397", "The subsidy is credited to the farmer's account")], docs: [], src: null, warn: T("subsidy.398", "Eligibility and the empanelled firm list were not stated on the sources we checked. Confirm with your district office.") },
  9: { about: T("subsidy.399", "Himachal Pradesh supports solar and other fencing to protect crops from wild and stray animals."), rows: [[T("subsidy.400", "Rate"), T("subsidy.401", "80% for individuals and 85% for groups")], [T("subsidy.402", "Fence types"), T("subsidy.403", "Solar, solar-interlinked chain, interlink chain and barbed wire")], [T("subsidy.404", "Installed by"), T("subsidy.405", "Registered service providers for solar fences")], [T("subsidy.406", "Apply at"), T("subsidy.407", "agridbt.hp.gov.in")]], steps: [T("subsidy.408", "Apply on the Himachal agriculture portal"), T("subsidy.409", "Department approves the application"), T("subsidy.410", "A registered service provider installs the fence")], docs: [], src: { label: T("subsidy.411", "agridbt.hp.gov.in"), url: "https://agridbt.hp.gov.in/", phone: T("subsidy.412", "0177-2830162") }, warn: T("subsidy.413", "The Himachal agriculture department page lists a 70% subsidy. Verify the rate before quoting. Email: krishibhawan-hp@gov.in") },
  10: { about: T("subsidy.414", "Goa offers assistance for farm fencing, including solar battery fencing."), rows: [[T("subsidy.415", "Includes"), T("subsidy.416", "Solar battery fencing")]], steps: [T("subsidy.417", "Contact the Goa agriculture office for the current application process")], docs: [], src: null, warn: T("subsidy.418", "Rate and eligibility were not confirmed. Check with the state office.") },
  11: { about: T("subsidy.419", "A programme to grow compressed biogas (CBG), approved in August 2026 for FY2026-27 to FY2035-36."), rows: [[T("subsidy.420", "Outlay"), T("subsidy.421", "Rs 23,731 crore")], [T("subsidy.422", "Capital help"), T("subsidy.423", "Up to Rs 2 crore per tonne per day for new CBG plants, plus support for existing ones")], [T("subsidy.424", "Blending"), T("subsidy.425", "CGD blending of 3%, 4% and 5% from FY2028-29")], [T("subsidy.426", "Price"), T("subsidy.427", "Administered price Rs 2,110 per MMBtu with a ten-year framework")], [T("subsidy.428", "Also"), T("subsidy.429", "MSME credit guarantees, pipeline connectivity and a CBG Ecosystem Challenge Fund")]], steps: [T("subsidy.430", "Check CBG plant eligibility with the nodal ministry"), T("subsidy.431", "Prepare the project report and apply"), T("subsidy.432", "Plant is built and supplies gas under the framework")], docs: [], src: null, warn: T("subsidy.433", "Mainly for compressed biogas. Guidelines may still be issued, so confirm before planning.") },
};
const UI = { view: T("subsidy.434", "View full details"), close: T("subsidy.435", "Close"), ben: T("subsidy.436", "Benefit and key facts"), steps: T("subsidy.437", "How to apply"), docs: T("subsidy.438", "Documents needed"), src: T("subsidy.439", "Official source"), call: T("subsidy.440", "Call"), help: T("subsidy.441", "Get help applying"), conf: T("subsidy.442", "Please confirm"), about: T("subsidy.443", "About this scheme"), disc: T("subsidy.444", "Always confirm current rates and eligibility with the official source before applying.") };

const IMG = { 1: '/solar-house.jpg', 2: '/solutions/ind-residential.jpg', 3: '/about/u-solar.jpg', 4: '/solutions/ind-commercial.jpg', 5: '/solutions/ind-industrial.jpg', 6: '/solutions/solar.jpg', 7: '/solutions/ind-agriculture.jpg', 8: '/about/a2-sol1.jpg', 9: '/partners/energy-landscape.jpg', 10: '/about/u-who.jpg', 11: '/solutions/biogas.jpg' };
const FILT = [[0, null], [1, [2, 3]], [2, [0]], [3, [4]], [4, []], [5, [1]]];
const FLAB = [T("subsidy.500", "All"), T("subsidy.501", "Farmers"), T("subsidy.502", "Solar"), T("subsidy.503", "Renewable Energy"), T("subsidy.504", "Water"), T("subsidy.505", "Other")];
const GI = [
  <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>,
  <path d="M3 21h18M5 21V9l7-5 7 5v12M10 21v-6h4v6" key="1" />,
  <path d="M12 22V9M12 13c-3 0-5-2-5-5 3 0 5 2 5 5zM12 10c0-3 2-5 5-5 0 3-2 5-5 5z" key="2" />,
  <path d="M4 20h16M6 20V10h12v10M9 10V6h6v4" key="3" />,
  <path d="M5 20c0-8 5-14 15-15 0 9-5 15-13 15M5 20c2-5 5-8 9-10" key="4" />,
];

export function SubsidyPage({ onQuote }) {
  const ref = useReveal();
  const [g, setG] = useState(-1);
  const [open, setOpen] = useState(null);
  const [gf, setGf] = useState(0);
  const rc = () => new URLSearchParams(window.location.search).get('c');
  const [cat, setCat] = useState(rc());
  useEffect(() => { const f = () => { setCat(rc()); setG(-1); }; window.addEventListener('popstate', f); return () => window.removeEventListener('popstate', f); }, []);
  useEffect(() => { if (!open) return; const k = (e) => e.key === 'Escape' && setOpen(null); document.addEventListener('keydown', k); const o = document.body.style.overflow; document.body.style.overflow = 'hidden'; return () => { document.removeEventListener('keydown', k); document.body.style.overflow = o; }; }, [open]);
  const cur = open && SCHEMES.find((x) => x.n === open); const dt = cur && DET[cur.n];
  const CAT = { solar: [0, 1], wind: [], biogas: [4], water: [], agri: [2, 3] };
  const CN = { solar: T("subsidy.401", "Solar Subsidy"), wind: T("subsidy.402", "Wind Subsidy"), biogas: T("subsidy.403", "Biogas Subsidy"), water: T("subsidy.404", "Water Treatment Subsidy"), agri: T("subsidy.405", "Agriculture Subsidy") };
  const list = SCHEMES.filter((s) => (g < 0 || s.grp === g) && (!cat || !CAT[cat] || CAT[cat].includes(s.grp)));
  const gl = SCHEMES.filter((x) => !FILT[gf][1] || FILT[gf][1].includes(x.grp));
  const clr = () => { setCat(null); window.history.replaceState(null, '', '/subsidy'); };
  return (
    <div ref={ref} className="pg subPage">
      <div className="subHero"><div className="pgs"><div className="pgw subHeroIn"><Head eyebrow={T("subsidy.001", "SUBSIDY")} title={T("subsidy.002", "Government")} em={T("subsidy.003", "support & subsidy")} text={T("subsidy.004", "Schemes available for solar, biogas and related projects. Choose a project type to see what applies, then talk to us and we will help you apply.")} />
        <div className="subStats"><div><b>{SCHEMES.length}</b><span>{T("subsidy.201", "Schemes")}</span></div><div><b>{GROUPS.length}</b><span>{T("subsidy.202", "Project types")}</span></div></div></div></div></div>
      <section className="gsSec" id="gov-schemes"><div className="pgs"><div className="pgw">
        <div className="gsGrid" key={gf}>
          {gl.map((c, i) => (
            <article className="gsCard rv" style={{ '--d': (i % 3) * 90 + 'ms' }} key={c.n} role="button" tabIndex={0} onClick={() => setOpen(c.n)} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), setOpen(c.n))}>
              <div className="gsNo"><span>{String(c.n).padStart(2, '0')}</span><i /></div>
              <span className="gsBadge">{c.tag}</span>
              <div className="gsImg"><img src={IMG[c.n]} alt="" loading="lazy" /><span className="gsIc"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{GI[c.grp]}</svg></span></div>
              <div className="gsBody">
                <h3>{c.title}</h3>
                <p className="gsSub">{GROUPS[c.grp]}</p>
                <dl>{c.fields.slice(0, 2).map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
                <span className="gsBtn">{T("subsidy.513", "View Full Details")} →</span>
              </div>
            </article>
          ))}
        </div>
        {gl.length === 0 && <div className="subEmpty"><p>{T("subsidy.408", "We have not listed a dedicated scheme for this category yet. Talk to our team and we will check what support is available for your project.")}</p><button className="pgBtn" onClick={onQuote}>{T("subsidy.009", "Talk to our team")}</button></div>}
        <div className="gsCta">
          <span className="gsLeaf" aria-hidden="true"><svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 20c0-8 5-14 15-15 0 9-5 15-13 15M5 20c2-5 5-8 9-10" /></svg></span>
          <div><h2>{T("subsidy.514", "Let's Build a Greener Tomorrow")}</h2><p>{T("subsidy.515", "Take advantage of government subsidies and make your farming, nursery, or landscaping projects more affordable and sustainable.")}</p></div>
          <button className="gsCtaBtn" onClick={() => { setGf(0); const el = document.getElementById('gov-schemes'); el && el.scrollIntoView({ behavior: 'smooth' }); }}>{T("subsidy.516", "Explore All Schemes")} →</button>
        </div>
      </div></div></section>
      {cur && dt && (
        <div className="subOv" onClick={() => setOpen(null)}>
          <div className="subMd" role="dialog" aria-modal="true" aria-label={cur.title} onClick={(e) => e.stopPropagation()}>
            <button className="subX" onClick={() => setOpen(null)} aria-label={UI.close}>×</button>
            <div className="subMdTop"><span className="subTag">{cur.tag}</span><span className="subPj">{GROUPS[cur.grp]}</span></div>
            <h2>{cur.title}</h2>
            <p className="subAbout">{dt.about}</p>
            {dt.warn && <p className="subNote"><b>{UI.conf}:</b> {dt.warn}</p>}
            <h4>{UI.ben}</h4>
            <dl className="subFacts">{cur.fields.filter((f) => f[2]).map(([k, v]) => <div key={k} className="hl"><dt>{k}</dt><dd>{v}</dd></div>)}{dt.rows.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
            {dt.docs.length > 0 && (<><h4>{UI.docs}</h4><ul className="subList">{dt.docs.map((x, i) => <li key={i}>{x}</li>)}</ul></>)}
            <h4>{UI.steps}</h4>
            <ol className="subList">{dt.steps.map((x, i) => <li key={i}>{x}</li>)}</ol>
            {dt.src && <p className="subSrc"><b>{UI.src}:</b> <a href={dt.src.url} target="_blank" rel="noopener noreferrer">{dt.src.label}</a>{dt.src.phone ? <> · {UI.call} {dt.src.phone}</> : null}</p>}
            <p className="subDisc">{UI.disc}</p>
            <button className="pgBtn" onClick={() => { setOpen(null); onQuote && onQuote(); }}>{UI.help}</button>
          </div>
        </div>
      )}
    </div>
  );
}
