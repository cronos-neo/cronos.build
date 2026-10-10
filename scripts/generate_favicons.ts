import { Resvg } from '@resvg/resvg-js';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const svgPath = path.resolve('public/favicon.svg');
const svgContent = fs.readFileSync(svgPath, 'utf8');

function renderSvg(size: number): Buffer {
  const resvg = new Resvg(svgContent, {
    fitTo: { mode: 'width', value: size },
    shapeRendering: 2, // geometricPrecision
    textRendering: 1,
    imageRendering: 0,
  });
  return resvg.render().asPng();
}

console.log('Rendering high-resolution vector favicons with @resvg/resvg-js...');

// 1. Apple Touch Icon (180x180)
const png180 = renderSvg(180);
fs.writeFileSync('public/apple-touch-icon.png', png180);
console.log('Created public/apple-touch-icon.png (180x180)');

// 2. Favicon PNG (64x64)
const png64 = renderSvg(64);
fs.writeFileSync('public/favicon.png', png64);
console.log('Created public/favicon.png (64x64)');

// 3. Render multi-size images for ICO
const png16 = renderSvg(16);
const png32 = renderSvg(32);
const png48 = renderSvg(48);

fs.writeFileSync('scripts/_tmp_16.png', png16);
fs.writeFileSync('scripts/_tmp_32.png', png32);
fs.writeFileSync('scripts/_tmp_48.png', png48);
fs.writeFileSync('scripts/_tmp_64.png', png64);

// Pack into clean multi-resolution favicon.ico via Python PIL
execSync(`python3 -c "
from PIL import Image
im16 = Image.open('scripts/_tmp_16.png')
im32 = Image.open('scripts/_tmp_32.png')
im48 = Image.open('scripts/_tmp_48.png')
im64 = Image.open('scripts/_tmp_64.png')

im64.save('public/favicon.ico', format='ICO', append_images=[im48, im32, im16])
print('Created public/favicon.ico with sizes [64, 48, 32, 16]')
"`);

// Clean temporary files
fs.unlinkSync('scripts/_tmp_16.png');
fs.unlinkSync('scripts/_tmp_32.png');
fs.unlinkSync('scripts/_tmp_48.png');
fs.unlinkSync('scripts/_tmp_64.png');

console.log('All favicons successfully generated with pixel-perfect vector anti-aliasing!');
