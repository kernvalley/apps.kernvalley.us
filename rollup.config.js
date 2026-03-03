import { importmap } from '@shgysk8zer0/importmap';
import { getConfig } from '@shgysk8zer0/js-utils/rollup';
import { rollupImport, rollupImportMeta } from '@shgysk8zer0/rollup-import';

export default getConfig('./js/index.js', {
	plugins: [
		rollupImport(importmap),
		rollupImportMeta({ baseURL: 'https://apps.kernvalley.us/' }),
	],
	format: 'iife',
	minify: true,
	sourcemap: true,
});
