import fs from 'fs';
const file = 'C:\\live green\\igo-green-energy-website (1)\\igo-green-energy\\src\\styles.css';
let css = fs.readFileSync(file, 'utf8');

// Remove .earth and related
css = css.replace(/\.earth\{[^}]+\}/g, '');
css = css.replace(/\.earth:after\{[^}]+\}/g, '');
css = css.replace(/\.earthLight\{[^}]+\}/g, '');
css = css.replace(/\.continent\{[^}]+\}/g, '');
css = css.replace(/\.c1\{[^}]+\}/g, '');
css = css.replace(/\.c2\{[^}]+\}/g, '');
css = css.replace(/\.c3\{[^}]+\}/g, '');
css = css.replace(/\.orbit\{[^}]+\}/g, '');
css = css.replace(/\.o1\{[^}]+\}/g, '');
css = css.replace(/\.o2\{[^}]+\}/g, '');
css = css.replace(/@keyframes rotateEarth\{[^}]+\}/g, '');
css = css.replace(/@keyframes orbit\{[^}]+\}/g, '');
css = css.replace(/@keyframes orbit2\{[^}]+\}/g, '');

// Inject .earthStage3D and float animation
css = css.replace('.earthStage{', '.earthStage3D { pointer-events: none; z-index: 10; } .earthStage3D > div { pointer-events: auto; z-index: 1; } .earthStage{');

if (!css.includes('@keyframes floatLabels')) {
  css += '\n@keyframes floatLabels { 50% { transform: translateY(-10px); } }';
}
css = css.replace('.f1{', '.f1{animation: floatLabels 6s ease-in-out infinite;');
css = css.replace('.f2{', '.f2{animation: floatLabels 5s ease-in-out infinite reverse;');
css = css.replace('.f3{', '.f3{animation: floatLabels 7s ease-in-out infinite;');
css = css.replace('.f4{', '.f4{animation: floatLabels 6.5s ease-in-out infinite reverse;');

fs.writeFileSync(file, css);
console.log('CSS updated successfully');
