/* Maps every editable text/image (registry.json) to an admin "page" and "section". */
import REG from './registry.json';

const pretty = (s) => String(s || '').replace(/([a-z])([A-Z])/g, '$1 $2').replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()).replace(/\bSol\b/, 'Solar');
const LABELS = {
  SubsidyPage: 'Subsidy page text & schemes',
  PrivacyPage: 'Privacy Policy text', TermsPage: 'Terms & Conditions text', SitemapPage: 'Sitemap page', NotFoundPage: '404 page', Shell: 'Legal page headings', SolarCalculator: 'Solar calculator (text & default numbers)', BiogasCalculator: 'Biogas calculator (text & default numbers)', WaterGuide: 'Water guide text', BANDS: 'Water guide recommendations', QuoteModal: 'Smart Quote pop-up', SolarChoice: 'Solar chooser pop-up',
  HeroBanner: 'Hero banner', STRIP: 'Top strip', SOLUTIONS: 'Solution cards', OurSolutions: 'Section heading & text', ELEMENTS_IMAGE: 'Four elements image', INDUSTRIES: 'Industry cards', Industries: 'Section heading & text',
  JOURNEY: 'Process steps', ProjectJourney: 'Section heading & text', PartnersCerts: 'Partners & certificates', BENEFITS: 'Benefit points', GoGreenCta: 'Call-to-action block', BRANDS: 'Brand logos', BrandsMarquee: 'Section heading',
  QUICK: 'Quick links', SUPPORT: 'Support links', LEGAL: 'Legal links', SOCIAL: 'Social links', SiteFooter: 'Footer text', NAV_ITEMS: 'Menu items', Navbar: 'Header buttons', SubsidyMenu: 'Subsidy dropdown menu', WindHero: 'Top banner', WindSolutions: 'Wind solutions section',
  LEGACY: 'Our legacy', WHY: 'Why choose us', ELEMENTS: 'Four elements', APPROACH: 'Our approach', AboutPage: 'Page text',
  CARDS: 'Service cards', CAPS: 'Capabilities', ServicesPage: 'Page text', SOLAR_STEPS: 'Solar steps', WIND_STEPS: 'Wind steps', solutions: 'Solutions', segs: 'Customer segments', types: 'System types', benefits: 'Benefits',
  SolarPage: 'Page text', WindPage: 'Page text', BiogasPage: 'Page text', WaterPage: 'Page text', STEPS: 'Steps', E2E_FOOT: 'Footer note', CapabilityMatrix: 'Capability matrix', FEATS: 'Feature list', NODES: 'Network nodes', HowTogether: 'How it works together',
  TOOLS: 'Smart tools', SmartTools: 'Smart tools heading', SOL_STEPS: 'Solar steps', SolarComplete: 'Complete solar solution', opps: 'Opportunities', programs: 'Programs', steps: 'Steps', LearnershipsPage: 'Page text', why: 'Why join us', CareersPage: 'Page text',
  ProjectsPage: 'Page text', TestimonialsPage: 'Page text', BlogsPage: 'Page text', ContactPage: 'Page text', FaqPage: 'Page text', ChatWidget: 'Chat widget', LeadershipPage: 'Page text', QuoteModal: 'Quote pop-up', PrivacyPage: 'Privacy Policy', TermsPage: 'Terms & Conditions', SitemapPage: 'Sitemap', NotFoundPage: '404 page', SolarCalculator: 'Solar calculator', BiogasCalculator: 'Biogas calculator', WaterGuide: 'Water guide', SolarChoice: 'Solar chooser pop-up'
};

export function pageOf(e) {
  const f = e.file, fn = e.fn, g = e.group;
  if (/HeroBanner|OurSolutions|FourElements|Industries|ProjectJourney|PartnersCerts|GoGreenCta|BrandsMarquee/.test(f)) return 'Home page';
  if (/SiteFooter|Navbar/.test(f)) return 'Header & Footer';
  if (/windSolutions\.jsx/.test(f)) return 'Wind Energy page';
  if (/windHero\.jsx/.test(f)) return 'Wind Energy page';
  if (/subsidy\.jsx/.test(f)) return 'Subsidy page';
  if (/main\.jsx/.test(f)) return fn === 'QuoteModal' ? 'Quote pop-up' : 'SEO & browser titles';
  if (/leadership\.jsx/.test(f)) return 'Leadership page';
  if (/extra2\.jsx/.test(f)) return g === 'WaterGuide' || fn === 'WaterGuide' ? 'Water Treatment page' : 'Biogas page';
  if (/extra\.jsx/.test(f)) return fn === 'SolarCalculator' ? 'Solar Energy page' : fn === 'NotFoundPage' ? 'Legal & 404 pages' : 'Legal & 404 pages';
  if (/SolarChoice/.test(f)) return 'Solar Energy page';
  if (/AboutPage/.test(f)) return 'About Us';
  if (/svSections/.test(f)) return 'Services (all)';
  if (/services\.jsx/.test(f)) {
    if (fn === 'SolarPage' || g === 'SOLAR_STEPS') return 'Solar Energy page';
    if (fn === 'WindPage' || g === 'WIND_STEPS') return 'Wind Energy page';
    if (fn === 'BiogasPage') return 'Biogas page';
    if (fn === 'WaterPage') return 'Water Treatment page';
    return 'Services (all)';
  }
  if (/careers\.jsx/.test(f)) return fn === 'LearnershipsPage' ? 'Learnerships page' : 'Careers page';
  const M = { ProjectsPage: 'Projects page', TestimonialsPage: 'Testimonials page', BlogsPage: 'Blogs page', ContactPage: 'Contact page', FaqPage: 'FAQ page', ChatWidget: 'Chat widget' };
  return M[fn] || 'Other';
}
export const PAGE_ORDER = ['Home page', 'Header & Footer', 'About Us', 'Services (all)', 'Solar Energy page', 'Wind Energy page', 'Biogas page', 'Water Treatment page', 'Projects page', 'Testimonials page', 'Blogs page', 'Contact page', 'FAQ page', 'Subsidy page', 'Leadership page', 'Legal & 404 pages', 'Quote pop-up', 'SEO & browser titles', 'Careers page', 'Learnerships page', 'Chat widget'];
export const PAGE_URL = { 'Home page': '/', 'Header & Footer': '/', 'About Us': '/about', 'Services (all)': '/services', 'Solar Energy page': '/services/solar', 'Wind Energy page': '/services/wind', 'Biogas page': '/services/biogas', 'Water Treatment page': '/services/water', 'Projects page': '/projects', 'Testimonials page': '/projects', 'Blogs page': '/blogs', 'Contact page': '/contact', 'FAQ page': '/faq', 'Leadership page': '/leadership', 'Subsidy page': '/subsidy', 'Legal & 404 pages': '/privacy-policy', 'Quote pop-up': '/', 'SEO & browser titles': '/', 'Careers page': '/careers', 'Learnerships page': '/learnerships', 'Chat widget': '/' };

export function buildPages() {
  const pages = {};
  REG.forEach((e) => {
    const p = pageOf(e); const sec = LABELS[e.group] || pretty(e.group) || 'Page text';
    const secKey = sec + (e.group && LABELS[e.group] === 'Page text' ? '' : '');
    ((pages[p] ||= {})[secKey] ||= []).push(e);
  });
  return PAGE_ORDER.filter((p) => pages[p]).map((p) => ({ name: p, url: PAGE_URL[p], count: Object.values(pages[p]).reduce((n, a) => n + a.length, 0), sections: Object.entries(pages[p]).map(([title, items]) => ({ title, items })) }));
}
