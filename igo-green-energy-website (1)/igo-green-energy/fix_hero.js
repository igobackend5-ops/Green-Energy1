import fs from 'fs';
const file = 'C:\\live green\\igo-green-energy-website (1)\\igo-green-energy\\src\\styles.css';
let css = fs.readFileSync(file, 'utf8');

// Remove old hero CSS definitions that might be causing conflicts
css = css.replace('.hero{min-height:900px;position:relative;display:flex;align-items:center;padding:120px 5vw 80px;background:linear-gradient(to bottom, #ffffff 40%, #eef6ed 100%)}', '');
css = css.replace('.heroCopy{width:51%;position:relative;z-index:3}', '');
css = css.replace('.heroGlow{position:absolute;width:600px;height:600px;right:15%;top:120px;background:radial-gradient(circle,rgba(100,255,151,.11),transparent 67%);filter:blur(20px)}', '');
css = css.replace('.heroGlow { background: radial-gradient(circle, rgba(160,255,180,0.4), transparent 70%); }', '');

// Now replace the layout CSS at the bottom
const newLayout = `
.hero {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 100vh;
  padding: 0; /* Remove padding here so image hits edges */
  background: #fdfdfd;
  position: relative;
  overflow: hidden;
}
.heroCopy {
  width: 45%;
  z-index: 3;
  padding: 120px 0 80px 5vw;
}
.heroImageContainer {
  width: 55%;
  height: 100vh;
  display: flex;
  z-index: 1;
}
.heroImage {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
@media(max-width: 950px) {
  .hero {
    flex-direction: column;
    height: auto;
  }
  .heroCopy { 
    width: 100%; 
    padding: 120px 5vw 40px; 
  }
  .heroImageContainer {
    width: 100%;
    height: 60vh;
    min-height: 400px;
  }
}
`;

// Replace the previous layout block
css = css.replace(/\.hero\s*\{\s*display:\s*flex;[\s\S]*?\@media\(max-width:\s*950px\)\s*\{[\s\S]*?\}\s*\}/, newLayout);

// Ensure navbar is super clean and no extra background
css = css.replace('.nav{position:fixed;z-index:20;top:0;width:100%;height:78px;display:flex;align-items:center;justify-content:space-between;padding:0 5vw;transition:.35s;background:transparent; z-index: 100;}', '.nav{position:fixed;top:0;width:100%;height:78px;display:flex;align-items:center;justify-content:space-between;padding:0 5vw;transition:.35s;background:transparent; z-index: 999;}');
css = css.replace('.nav.scrolled{background:rgba(3,18,13,.9);border-bottom:1px solid var(--line)}', '.nav.scrolled{background:rgba(255,255,255,0.95);border-bottom:1px solid #eaeaea; z-index: 999;}');

// Ensure app body is white for light theme
css = css.replace('body{margin:0;background:var(--bg);', 'body{margin:0;background:#fdfdfd;');
css = css.replace('.app{overflow:hidden;background:radial-gradient(circle at 80% 10%,rgba(42,129,83,.16),transparent 30%),var(--bg)}', '.app{overflow:hidden;background:#fdfdfd}');

fs.writeFileSync(file, css);
console.log('Hero fixed');
