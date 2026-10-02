import fs from 'fs';
const file = 'C:\\live green\\igo-green-energy-website (1)\\igo-green-energy\\src\\styles.css';
let css = fs.readFileSync(file, 'utf8');

css = css.replace('background:linear-gradient(to bottom,rgba(3,17,13,.72),transparent);backdrop-filter:blur(8px)', 'background:transparent; z-index: 100;');
css = css.replace('.nav nav button,footer button{background:none;color:#dbe5de;font-size:13px}', '.nav nav button,footer button{background:none;color:#111;font-size:14px;font-weight:600}');
css = css.replace('.logo small{font-size:8px;letter-spacing:2px;color:#dfe9e1;margin-left:3px}', '.logo small{font-size:8px;letter-spacing:2px;color:#333;margin-left:3px}');
css = css.replace('.logo span{font:800 30px Manrope;color:var(--green);letter-spacing:-2px}', '.logo span{font:800 30px Manrope;color:#217340;letter-spacing:-2px}');

fs.writeFileSync(file, css);
console.log('navbar fixed');
