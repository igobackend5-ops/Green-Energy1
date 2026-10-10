/* Solar vertical content supplied by the Green Energy team. */
export const SOLAR_PRODUCTS = [
  { key: 'agri', title: 'Solar Agriculture Products', icon: 'leaf', items: ['Solar Water Pumps', 'Solar Irrigation Pumps', 'Solar Pump Controllers', 'Solar Sprayers', 'Solar Agriculture Fencing', 'Solar Farm Monitoring Systems'] },
  { key: 'security', title: 'Solar Security Products', icon: 'check', items: ['Solar CCTV Cameras', 'Solar CCTV Poles', 'Solar Camera + Light Systems', 'Solar Security Lights', 'Solar Electric Fence Systems'] },
  { key: 'lighting', title: 'Solar Lighting Products', icon: 'sun', items: ['Solar Street Lights', 'Solar Flood Lights', 'Solar Garden Lights', 'Solar Home Lighting Systems', 'Solar Wall Lights', 'Solar High-Mast Lights', 'Solar Warning Lights'] },
];
export const SOLAR_PROJECTS = [
  { key: 'install', title: 'Rooftop & Ground-Mounted Solar', icon: 'sun', items: ['Residential Rooftop Solar', 'Commercial Rooftop Solar', 'Industrial Rooftop Solar', 'Ground-Mounted Solar Power Plant'] },
  { key: 'systems', title: 'Solar System Types', icon: 'tool', items: ['On-Grid Solar System', 'Off-Grid Solar System', 'Hybrid Solar System'] },
  { key: 'agri', title: 'Agriculture Solar Projects', icon: 'leaf', items: ['Solar Water Pump', 'Solar Irrigation System', 'Solar Pump + Drip Irrigation', 'Solar Farm Power System', 'Solar Fencing', 'Solar Cold Storage'] },
];
export const countItems = (g) => g.reduce((n, x) => n + x.items.length, 0);
