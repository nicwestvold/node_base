const fs = require('fs');
const resolve = require('path').resolve;
const join = require('path').join;
const cp = require('child_process');

// get the path to `lib`
const src = resolve(__dirname, '../src');

fs.readdirSync(src).forEach(function(mod) {
  const modPath = join(src, mod);

  // if the path doesn't have a package.json, return
  if (!fs.existsSync(join(modPath, 'package.json'))) return;

  // run npm install for each directory
  cp.spawn('npm', ['i'], { env: process.env, cwd: modPath, stdio: 'inherit' });
});
