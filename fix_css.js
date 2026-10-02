import fs from 'fs';
const file = 'C:\\live green\\igo-green-energy-website (1)\\igo-green-energy\\src\\styles.css';
let css = fs.readFileSync(file, 'utf8');

// The script left behind extra } from the keyframes.
// I will replace all instances of multiple closing braces that shouldn't be there at the end of line 2.
// Actually, I can just replace `}}}}` with `}` at the end of .heroGlow.
css = css.replace('.heroGlow{position:absolute;width:600px;height:600px;right:15%;top:120px;background:radial-gradient(circle,rgba(100,255,151,.11),transparent 67%);filter:blur(20px)}}}}', '.heroGlow{position:absolute;width:600px;height:600px;right:15%;top:120px;background:radial-gradient(circle,rgba(100,255,151,.11),transparent 67%);filter:blur(20px)}');
css = css.replace('filter:blur(20px)}}}}}', 'filter:blur(20px)}'); // Just in case
css = css.replace('filter:blur(20px)}}}}', 'filter:blur(20px)}');
css = css.replace('filter:blur(20px)}}}', 'filter:blur(20px)}');
css = css.replace('filter:blur(20px)}}', 'filter:blur(20px)}');

fs.writeFileSync(file, css);
console.log('CSS fixed');
