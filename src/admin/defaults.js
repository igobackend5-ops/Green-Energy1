import { LEADERS } from '../pages/leadershipData.js';
import { FAQ_DEFAULT } from './faqDefault.js';
import { BLOGS_RAW } from './blogsDefault.js';

const P = 'published';
const slug = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/* Home sections. `linked` = this block exists on the public Home page and is controlled by the CMS. */
const H = (key, title, linked, description = '', image = '') => ({ id: key, key, title, linked, status: P, enabled: true, heading: title, subheading: '', description, image, ctaText: '', ctaLink: '' });
export const HOME_SECTIONS = [
  H('hero', 'Hero Banner', true, 'Main banner at the top of the Home page.'),
  H('powering', 'Powering a Sustainable Tomorrow', false, 'Intro statement section.'),
  H('solutions', 'Renewable Energy Solutions', true, 'Our solutions overview cards.', '/solutions/section-bg.jpg'),
  H('elements', 'Four Elements (Solar · Wind · Biogas · Water)', true, 'Overview of the four core energy and water solutions.', '/solutions/four-elements.jpg'),
  H('solar', 'Solar Energy', false, '', '/solutions/solar.jpg'),
  H('wind', 'Wind Energy', false, '', '/solutions/wind.jpg'),
  H('biogas', 'Biogas / Bio Energy', false, '', '/solutions/biogas.jpg'),
  H('water', 'Water Treatment', false, '', '/solutions/water.jpg'),
  H('industries', 'Industries We Serve', true, 'Residential, commercial, industrial, agriculture and government sectors.'),
  H('projects', 'Projects / Featured Projects', false),
  H('whyus', 'Why Choose Us', false),
  H('capabilities', 'Our Capabilities', false),
  H('process', 'Our Process (Sustainability journey)', true, 'The eight-step project journey.'),
  H('testimonials', 'Clients / Testimonials', true, 'Client testimonials carousel.'),
  H('partners', 'Partners', true, 'Partner logo row.'),
  H('certifications', 'Certifications', false),
  H('blogs', 'Latest Blogs', false),
  H('cta', 'Call To Action (Ready to Go Green?)', true, 'Closing call-to-action banner.', '/solar-house.jpg'),
  H('footer', 'Footer', true, 'Site footer.')
].map((s, i) => ({ ...s, order: i }));

export const DEFAULTS = {
  homeSections: HOME_SECTIONS,
  leadership: LEADERS,

  hero: {
    heading: 'Energy That Respects the Earth. Solutions That Reward You.',
    subheading: 'CLEAN ENERGY. CLEANER TOMORROW.',
    description: 'Integrated renewable energy and water treatment solutions for a cleaner, greener and more prosperous tomorrow.',
    ctaText: 'Explore Our Solutions', ctaLink: '/services', secondText: 'Watch Our Story', secondLink: '',
    overlay: 0, align: 'left', height: 'auto',
    imgDesktop: '', imgTablet: '', imgMobile: ''
  },

  about: [
    ['about-company', 'About Company'], ['our-story', 'Our Story'], ['mission', 'Mission'], ['vision', 'Vision'], ['core-values', 'Core Values'],
    ['why-choose-us', 'Why Choose Us'], ['sustainability', 'Sustainability Commitment'], ['statistics', 'Company Statistics'], ['leadership', 'Leadership / Team']
  ].map(([id, title]) => ({ id, title, heading: title, description: '', image: '', gallery: [], ctaText: '', ctaLink: '', status: P })),

  services: [
    ['solar', 'Solar Energy', '/solutions/solar.jpg', 'Complete, end-to-end solar solutions from 1 kW to 5 MW and above, for homes, businesses and industries.'],
    ['wind', 'Wind Energy', '/solutions/wind.jpg', 'From turbine installation to complete EPC and O&M, we turn wind into reliable energy.'],
    ['biogas', 'Biogas / Bio Energy', '/solutions/biogas.jpg', 'Transform organic waste into clean fuel and lasting value.'],
    ['water', 'Water Treatment', '/solutions/water.jpg', 'Safe, reusable and efficient water systems for a cleaner future.']
  ].map(([id, title, img, d]) => ({ id, title, slug: id, shortDesc: d, detailDesc: '', heroImage: img, gallery: [], features: '', benefits: '', applications: '', industries: '', ctaText: 'Get a Smart Quote', ctaLink: '/services/' + id, faq: '', status: P })),

  projects: [
    ['solar', 'Solar project details coming soon'], ['solar', 'Solar project details coming soon'], ['wind', 'Wind project details coming soon'],
    ['wind', 'Wind project details coming soon'], ['biogas', 'Biogas project (details confidential)'], ['water', 'Water treatment project (details confidential)']
  ].map(([c, t], i) => ({ id: 'prj-' + (i + 1), title: t, category: c, location: '', client: '', description: i < 4 ? c[0].toUpperCase() + c.slice(1) + ' project details will be added as projects are delivered.' : 'Details of completed projects of this type are confidential and cannot be shared.', capacity: '', projectStatus: 'Upcoming', completion: '', image: '/solutions/' + c + '.jpg', gallery: [], highlights: '', technologies: '', ctaText: '', ctaLink: '', status: P })),

  testimonials: [
    'Green Energy delivered our solar project on time with excellent support. Our electricity costs have reduced significantly.',
    'Professional team, smooth installation and great after-sales support. Highly recommend for industrial solar solutions.',
    'Reliable and efficient service from consultation to commissioning. We are very happy with the results.'
  ].map((text, i) => ({ id: 'tst-' + (i + 1), name: '', company: '', designation: '', text, image: '', logo: '', rating: 5, status: P })),

  partners: [['tata', 'TATA POWER'], ['adani', 'adani'], ['suzlon', 'SUZLON'], ['abb', 'ABB'], ['scatec', 'Scatec'], ['canadian', 'CanadianSolar'], ['sungrow', 'SUNGROW']]
    .map(([id, name]) => ({ id, name, logo: '', url: '', description: '', category: 'Technology Partner', status: P })),

  certificates: [
    ['ISO 9001:2015', 'ISO'], ['ISO 14001:2015', 'ISO'], ['ISO 45001:2018', 'ISO'], ['MNRE', 'Ministry of New and Renewable Energy'], ['IEC', 'IEC'], ['CE', 'CE']
  ].map(([name, org], i) => ({ id: 'crt-' + (i + 1), name, org, number: '', issued: '', expiry: '', file: '', description: '', status: P })),

  blogs: BLOGS_RAW.map((b, i) => ({ id: 'blg-' + (i + 1), title: b.title, slug: slug(b.title), author: 'Green Energy Team', category: b.cat, shortDesc: b.desc, content: '<p>' + b.desc + '</p>', image: b.img, gallery: [], publishDate: b.date, tags: b.cat, seoTitle: '', seoDesc: '', link: b.to, status: P })),

  careers: [
    ['Engineering & Design', 'System design, energy assessments and technical planning for renewable energy projects.'],
    ['Installation & Site Operations', 'Project execution, installation, commissioning and on-site supervision.'],
    ['Operations & Maintenance', 'Monitoring, servicing and keeping installed systems performing at their best.'],
    ['Sales & Customer Engagement', 'Helping homes, businesses and industries find the right clean energy solution.']
  ].map(([title, d], i) => ({ id: 'job-' + (i + 1), title, department: title, location: '', type: 'Full-time', experience: '', description: d, responsibilities: '', requirements: '', skills: '', apply: '/contact', lastDate: '', status: P })),

  contact: {
    address: 'Chennai, Tamil Nadu, India', phone: '+91 98765 43210', email: 'info@greenenergy.com', whatsapp: '', mapUrl: '', hours: '',
    facebook: '', linkedin: '', instagram: '', youtube: ''
  },

  faq: Object.entries(FAQ_DEFAULT).flatMap(([category, rows], ci) => rows.map(([question, answer], i) => ({ id: 'faq-' + ci + '-' + i, question, answer, category, status: P }))),

  settings: {
    siteName: 'Green Energy', logo: '/logo.png', favicon: '', primary: '#1d7a37', secondary: '#9cf06a',
    tagline: 'Clean Energy. Cleaner Tomorrow.', footerText: 'We provide reliable and innovative renewable energy solutions for a sustainable and greener future.',
    seoTitle: 'Green Energy | Solar, Wind, Biogas & Water Treatment', seoDesc: 'Reliable and innovative renewable energy and water treatment solutions.', gaId: '', copyright: '© 2026 Green Energy. All rights reserved.'
  }
};

export const COLLECTIONS = ['homeSections', 'about', 'services', 'projects', 'testimonials', 'partners', 'certificates', 'blogs', 'careers', 'faq'];
