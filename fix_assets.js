// Regenerate favicon.png as a byte-valid PNG so jimp's CRC check passes.
// ponytail: only needed because expo's web bundler hit "Crc error" while loading this asset.
const fs = require('fs');
const zlib = require('zlib');

const table = (() => {
  const t = [];
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();
const crc32 = (buf) => {
  let c = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) c = table[(c ^ buf[i]) & 0xFF] ^ (c >>> 8);
  return (c ^ 0xFFFFFFFF) >>> 0;
};
const chunk = (type, data) => {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length, 0);
  const tb = Buffer.from(type, 'ascii');
  const cr = Buffer.alloc(4); cr.writeUInt32BE(crc32(Buffer.concat([tb, data])), 0);
  return Buffer.concat([len, tb, data, cr]);
};
const solid = (w, h, [r, g, b, a]) => {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ih = Buffer.alloc(13);
  ih.writeUInt32BE(w, 0); ih.writeUInt32BE(h, 4);
  ih[8] = 8; ih[9] = 6;
  const row = Buffer.alloc(1 + w * 4);
  for (let x = 0; x < w; x++) {
    row[1 + x * 4] = r; row[2 + x * 4] = g; row[3 + x * 4] = b; row[4 + x * 4] = a;
  }
  const raw = Buffer.concat(Array.from({ length: h }, () => row));
  return Buffer.concat([sig, chunk('IHDR', ih), chunk('IDAT', zlib.deflateSync(raw)), chunk('IEND', Buffer.alloc(0))]);
};
const C = [255, 107, 53, 255];
const out = {
  'assets/icon.png': solid(1024, 1024, C),
  'assets/adaptive-icon.png': solid(1024, 1024, C),
  'assets/splash.png': solid(1242, 2436, C),
  'assets/favicon.png': solid(48, 48, C),
};
for (const f of Object.keys(out)) {
  fs.writeFileSync(f, out[f]);
  console.log('wrote', f, out[f].length, 'bytes');
}
