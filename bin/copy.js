import fs from 'fs-extra';
import paths from '../config/paths';

// Async with promises:
fs
  .copy(paths.viewsDir, paths.distViewsDir)
  .then(() => console.log('success!'))
  .catch(err => console.error(err));
