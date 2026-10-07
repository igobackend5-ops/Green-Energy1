import fs from 'fs';
const file = 'C:\\live green\\igo-green-energy-website (1)\\igo-green-energy\\src\\styles.css';
let css = fs.readFileSync(file, 'utf8');

// Update Hero Background
css = css.replace('.hero{min-height:900px;position:relative;display:flex;align-items:center;padding:120px 5vw 80px}', '.hero{min-height:900px;position:relative;display:flex;align-items:center;padding:120px 5vw 80px;background:linear-gradient(to bottom, #ffffff 40%, #eef6ed 100%)}');

// Update Hero text colors
css = css.replace('.hero h1 em,.sectionHead h2 em,.elementIntro h2 em,.storyCopy h2 em,.sustain h2 em,.contact h2 em{font-style:normal;color:var(--green)}', '.hero h1 em,.sectionHead h2 em,.elementIntro h2 em,.storyCopy h2 em,.sustain h2 em,.contact h2 em{font-style:normal;color:#1e7b39}');
// Need to separate hero h1 specifically
css = css.replace('.hero h1,.sectionHead h2', '.hero h1 { color: #111; } .sectionHead h2');
css = css.replace('.hero h1 em', '.hero h1 em { color: #1e7b39; } .hero h1 em.hidden'); // hacky but ensures we override it if needed. Actually it's better to append to the end.

css += `
.hero h1 { color: #111111; }
.hero h1 em { color: #217340; }
.hero .lead { color: #4a5c52; }
.hero .ghost { background: #ffffff; color: #111; border: 1px solid #217340; }
.hero .ghost:hover { background: #f0f7f2; }
.hero .micro { color: #222; }
.hero .micro span { color: #222; }
.hero .micro span::before { color: #217340; }
.heroGlow { background: radial-gradient(circle, rgba(160,255,180,0.4), transparent 70%); }
.nav.scrolled { background: rgba(255,255,255,0.95); border-bottom: 1px solid #eaeaea; }
.nav.scrolled nav button, .nav.scrolled .logo small { color: #333; }
.float {
  background: rgba(255, 255, 255, 0.85);
  border: 1px solid rgba(33, 115, 64, 0.2);
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  color: #111;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 12px 16px;
  gap: 4px;
  min-width: 160px;
}
.float b {
  font-size: 11px;
  color: #217340;
  display: flex;
  align-items: center;
  gap: 6px;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.float span {
  font-size: 12px;
  color: #555;
  font-weight: 500;
  text-transform: none;
  letter-spacing: 0;
}
.earthStage3D {
  position: absolute;
  width: 55vw;
  height: 800px;
  right: -5vw;
  top: 80px;
}
@media(max-width:950px) {
  .earthStage3D { width: 100vw; right: 0; top: 400px; height: 600px; }
}
`;

fs.writeFileSync(file, css);
console.log('CSS updated successfully');
