const T = (k, label, extra = {}) => ({ k, label, t: 'text', ...extra });
const X = (k, label, t, extra = {}) => ({ k, label, t, ...extra });
const STATUS = (opts = ['published', 'draft']) => X('status', 'Status', 'select', { opts: opts.map((o) => [o, o[0].toUpperCase() + o.slice(1)]) });

export const NAV = [
  ['dashboard', '/admin', 'Dashboard', 'dash'], ['home', '/admin/home', 'Home', 'home'], ['about', '/admin/about', 'About Us', 'info'], ['services', '/admin/services', 'Services', 'tool'],
  ['projects', '/admin/projects', 'Projects', 'folder'], ['testimonials', '/admin/testimonials', 'Clients / Testimonials', 'quote'], ['partners', '/admin/partners', 'Partners', 'link'],
  ['certificates', '/admin/certificates', 'Certificates', 'cert'], ['blogs', '/admin/blogs', 'Blogs', 'doc'], ['careers', '/admin/careers', 'Careers', 'brief'],
  ['contact', '/admin/contact', 'Contact Us', 'mail'], ['faq', '/admin/faq', 'FAQ', 'help'], ['settings', '/admin/settings', 'Website Settings', 'gear']
].map(([id, path, label, icon]) => ({ id, path, label, icon }));

/* Collection managers */
export const LISTS = {
  homeSectionsEdit: [T('heading', 'Section heading'), T('subheading', 'Subheading'), X('description', 'Description', 'textarea'), X('image', 'Section image', 'image', { rec: '1600 × 900 px' }), T('ctaText', 'CTA button text'), X('ctaLink', 'CTA button link', 'url')],

  about: { coll: 'about', singular: 'Section', title: 'title', sub: ['heading'], img: 'image', fixed: false, fields: [T('title', 'Section name', { req: true }), T('heading', 'Heading'), X('description', 'Description', 'rich'), X('image', 'Image', 'image', { rec: '1200 × 800 px' }), X('gallery', 'Additional images', 'gallery', { rec: '1200 × 800 px' }), T('ctaText', 'CTA text'), X('ctaLink', 'CTA link', 'url'), STATUS()] },

  services: { coll: 'services', singular: 'Service', title: 'title', sub: ['shortDesc'], img: 'heroImage', fields: [T('title', 'Service title', { req: true }), T('slug', 'URL slug', { help: 'Used in the page address, e.g. solar' }), X('shortDesc', 'Short description', 'textarea', { rows: 3 }), X('detailDesc', 'Detailed description', 'rich'), X('heroImage', 'Hero image', 'image', { rec: '1600 × 900 px' }), X('gallery', 'Service gallery', 'gallery', { rec: '1200 × 800 px' }), X('features', 'Features', 'lines'), X('benefits', 'Benefits', 'lines'), X('applications', 'Applications', 'lines'), X('industries', 'Industries served', 'lines'), T('ctaText', 'CTA text'), X('ctaLink', 'CTA link', 'url'), X('faq', 'Service FAQ', 'lines', { help: 'One per line:  Question | Answer' }), STATUS()] },

  projects: { coll: 'projects', singular: 'Project', title: 'title', sub: ['category', 'location'], img: 'image', fields: [T('title', 'Project title', { req: true }), X('category', 'Category', 'select', { opts: [['solar', 'Solar'], ['wind', 'Wind'], ['biogas', 'Biogas'], ['water', 'Water Treatment'], ['other', 'Other Renewable Energy']] }), T('location', 'Location'), T('client', 'Client name'), X('description', 'Project description', 'textarea'), T('capacity', 'Project capacity', { ph: 'e.g. 500 kW' }), X('projectStatus', 'Project status', 'select', { opts: ['Upcoming', 'Ongoing', 'Completed'] }), X('completion', 'Completion date', 'date'), X('image', 'Project image', 'image', { rec: '1200 × 800 px' }), X('gallery', 'Project gallery', 'gallery', { rec: '1200 × 800 px' }), X('highlights', 'Key highlights', 'lines'), X('technologies', 'Technologies used', 'lines'), T('ctaText', 'CTA text'), X('ctaLink', 'CTA link', 'url'), STATUS()] },

  testimonials: { coll: 'testimonials', singular: 'Testimonial', title: 'text', sub: ['name', 'company'], img: 'image', fields: [X('text', 'Testimonial text', 'textarea', { req: true }), T('name', 'Client name', { help: 'Optional' }), T('company', 'Company name', { help: 'Optional' }), T('designation', 'Designation'), X('image', 'Client image (optional)', 'image', { rec: '400 × 400 px' }), X('logo', 'Company logo (optional)', 'image', { rec: '400 × 200 px' }), X('rating', 'Rating (optional)', 'select', { opts: [['', 'No rating'], ['5', '5'], ['4', '4'], ['3', '3']] }), STATUS(['published', 'draft'])] },

  partners: { coll: 'partners', singular: 'Partner', title: 'name', sub: ['category'], img: 'logo', fields: [T('name', 'Partner name', { req: true }), X('logo', 'Logo', 'image', { rec: '400 × 200 px, transparent PNG' }), X('url', 'Website URL', 'url'), X('description', 'Short description', 'textarea', { rows: 3 }), T('category', 'Category'), STATUS()] },

  certificates: { coll: 'certificates', singular: 'Certificate', title: 'name', sub: ['org', 'number'], img: 'file', fields: [T('name', 'Certificate name', { req: true }), T('org', 'Issuing organization'), T('number', 'Certificate number'), X('issued', 'Issue date', 'date'), X('expiry', 'Expiry date', 'date'), X('file', 'Certificate image / PDF', 'file', { rec: '1200 × 900 px' }), X('description', 'Description', 'textarea', { rows: 3 }), STATUS()] },

  blogs: { coll: 'blogs', singular: 'Blog', title: 'title', sub: ['category', 'publishDate'], img: 'image', fields: [T('title', 'Blog title', { req: true }), T('slug', 'Slug'), T('author', 'Author'), X('category', 'Category', 'select', { opts: ['Solar', 'Wind', 'Biogas', 'Water Treatment', 'Sustainability', 'Energy Efficiency'] }), X('shortDesc', 'Short description', 'textarea', { rows: 3 }), X('content', 'Full content', 'rich'), X('image', 'Featured image', 'image', { rec: '1200 × 675 px' }), X('gallery', 'Additional images', 'gallery', { rec: '1200 × 675 px' }), X('publishDate', 'Publish date', 'date'), T('tags', 'Tags', { help: 'Comma separated' }), T('seoTitle', 'SEO title'), X('seoDesc', 'SEO description', 'textarea', { rows: 2 }), X('link', 'Read More link', 'url', { help: 'Page the “Read More” button opens' }), STATUS(['draft', 'published', 'scheduled'])] },

  careers: { coll: 'careers', singular: 'Job', title: 'title', sub: ['department', 'location'], img: null, fields: [T('title', 'Job title', { req: true }), T('department', 'Department'), T('location', 'Location'), X('type', 'Employment type', 'select', { opts: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Learnership'] }), T('experience', 'Experience'), X('description', 'Job description', 'rich'), X('responsibilities', 'Responsibilities', 'lines'), X('requirements', 'Requirements', 'lines'), X('skills', 'Skills', 'lines'), X('apply', 'Application email / link', 'url', { ph: 'jobs@company.com or /contact' }), X('lastDate', 'Last date to apply', 'date'), STATUS(['published', 'draft', 'closed'])] },

  faq: { coll: 'faq', singular: 'FAQ', title: 'question', sub: ['category'], img: null, fields: [T('question', 'Question', { req: true }), X('answer', 'Answer', 'textarea', { req: true }), T('category', 'Category', { help: 'Questions are grouped by category on the FAQ page' }), STATUS()] }
};

/* Single-document editors */
export const HERO_FIELDS = [
  { g: 'Content' }, T('heading', 'Heading'), T('subheading', 'Subheading'), X('description', 'Description', 'textarea', { rows: 3 }),
  { g: 'Buttons' }, T('ctaText', 'Primary button text'), X('ctaLink', 'Primary button link', 'url'), T('secondText', 'Secondary button text'), X('secondLink', 'Secondary button link', 'url'),
  { g: 'Layout' }, X('overlay', 'Overlay opacity', 'range', { min: 0, max: 80, unit: '%' }), X('align', 'Text alignment', 'select', { opts: [['left', 'Left'], ['center', 'Center'], ['right', 'Right']] }), X('height', 'Banner height', 'select', { opts: [['auto', 'Auto (image ratio)'], ['60vh', 'Medium (60% of screen)'], ['80vh', 'Tall (80% of screen)'], ['100vh', 'Full screen']] }),
  { g: 'Images' }, X('imgDesktop', 'Desktop image', 'image', { rec: '1920 × 900 px' }), X('imgTablet', 'Tablet image', 'image', { rec: '1200 × 900 px' }), X('imgMobile', 'Mobile image', 'image', { rec: '800 × 1000 px' })
];
export const CONTACT_FIELDS = [
  { g: 'Company details' }, X('address', 'Company address', 'textarea', { rows: 3 }), T('phone', 'Phone'), X('email', 'Email', 'email'), T('whatsapp', 'WhatsApp number'), X('mapUrl', 'Google Maps URL', 'url'), X('hours', 'Office timings', 'lines', { rows: 3, ph: 'e.g. Mon–Sat, 9:00 AM – 6:00 PM' }),
  { g: 'Social media links' }, X('facebook', 'Facebook', 'url'), X('linkedin', 'LinkedIn', 'url'), X('instagram', 'Instagram', 'url'), X('youtube', 'YouTube', 'url')
];
export const SETTINGS_FIELDS = [
  { g: 'Brand' }, T('siteName', 'Website name'), T('tagline', 'Tagline'), X('logo', 'Website logo', 'image', { rec: '800 × 700 px, transparent PNG' }), X('favicon', 'Favicon', 'image', { rec: '64 × 64 px PNG' }),
  { g: 'Colours' }, X('primary', 'Primary colour', 'color'), X('secondary', 'Secondary colour', 'color'),
  { g: 'Footer' }, X('footerText', 'Footer description', 'textarea', { rows: 3 }), T('copyright', 'Copyright text'),
  { g: 'SEO & analytics' }, T('seoTitle', 'SEO title'), X('seoDesc', 'SEO description', 'textarea', { rows: 3 }), T('gaId', 'Google Analytics ID', { ph: 'G-XXXXXXXXXX' })
];
