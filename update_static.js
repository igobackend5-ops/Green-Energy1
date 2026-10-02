import fs from 'fs';
const mainFile = 'C:\\live green\\igo-green-energy-website (1)\\igo-green-energy\\src\\main.jsx';
const styleFile = 'C:\\live green\\igo-green-energy-website (1)\\igo-green-energy\\src\\styles.css';

let main = fs.readFileSync(mainFile, 'utf8');
// Remove EarthVisual import
main = main.replace("import EarthVisual from './EarthVisual';\n", '');

// Replace <EarthVisual /> with an img or div for the new visual
main = main.replace('<EarthVisual />', '<div className="heroImageContainer"><img src="/hero-banner.png" alt="Renewable Energy Earth" className="heroImage" /></div>');

fs.writeFileSync(mainFile, main);

let css = fs.readFileSync(styleFile, 'utf8');
// Remove old EarthStage CSS
css = css.replace('.earthStage3D { pointer-events: none; z-index: 10; } .earthStage3D > div { pointer-events: auto; z-index: 1; } .earthStage{position:absolute;width:58vw;height:650px;right:-5vw;top:155px}', '');
// Remove .float CSS as they are in the image now, or keep them hidden?
// Wait, the user said "floating labels The floating labels must remain readable and horizontal."
// The prompt said: "If the website currently uses a 3D Earth: Keep the Earth as a realistic sphere. Add... Do NOT rotate the labels together with the Earth. The floating labels must remain readable and horizontal." But then says "Use the existing image... Replace the current hero visual with this existing image. Remove the previous incorrect rotating rectangular/glass object... If the existing Earth rotation code was specifically created for the previous incorrect visual, remove/disable that geometry. Do not rotate the new banner image unless the image itself is specifically intended to be animated."
// Actually, I don\'t need to do anything complex, just insert the CSS for the new image container.
css += `
.hero {
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  min-height: 100vh;
  padding: 120px 5vw 0;
  background: #fdfdfd;
}
.heroCopy {
  width: 45%;
  z-index: 3;
}
.heroImageContainer {
  width: 55%;
  height: 100vh;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.heroImage {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: right center;
}
@media(max-width: 950px) {
  .hero {
    flex-direction: column;
    padding-top: 100px;
  }
  .heroCopy { width: 100%; }
  .heroImageContainer {
    position: relative;
    width: 100%;
    height: 600px;
    margin-top: 40px;
  }
  .heroImage {
    object-position: center;
  }
}
`;

fs.writeFileSync(styleFile, css);
console.log('Main and CSS updated');
