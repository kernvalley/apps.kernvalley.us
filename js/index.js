import 'https://cdn.kernvalley.us/js/std-js/deprefixer.js';
import 'https://cdn.kernvalley.us/js/std-js/shims.js';
import 'https://cdn.kernvalley.us/js/std-js/theme-cookie.js';
import 'https://cdn.kernvalley.us/components/share-button.js';
import 'https://cdn.kernvalley.us/components/share-to-button/share-to-button.js';
import 'https://cdn.kernvalley.us/components/github/user.js';
import 'https://cdn.kernvalley.us/components/current-year.js';
import 'https://cdn.kernvalley.us/components/install/prompt.js';
import { ready, loaded, toggleClass, on, css } from 'https://cdn.kernvalley.us/js/std-js/dom.js';
import { getCustomElement } from 'https://cdn.kernvalley.us/js/std-js/custom-elements.js';
import { debounce } from 'https://cdn.kernvalley.us/js/std-js/events.js';
import { init } from 'https://cdn.kernvalley.us/js/std-js/data-handlers.js';
import { importGa, externalHandler, telHandler, mailtoHandler } from 'https://cdn.kernvalley.us/js/std-js/google-analytics.js';
import { GA } from './consts.js';

toggleClass([document.documentElement], {
	'js': true,
	'no-js': false,
	'no-dialog': document.createElement('dialog') instanceof HTMLUnknownElement,
	'no-details': document.createElement('details') instanceof HTMLUnknownElement,
});

requestIdleCallback(() => {
	on([window], {
		resize: debounce(() => css([document.documentElerment], {'--viewport-height': `${window.innerHeight}px`})),
		scroll: () => {
			requestAnimationFrame(() => css('#header', { 'background-position-y': `${-0.5 * scrollY}px` }));
		},
	}, { passive: true });
});

if (typeof GA === 'string' && GA.length !== 0) {
	loaded().then(() => {
		requestIdleCallback(() => {
			importGa(GA).then(async ({ ga }) => {
				if (ga instanceof Function) {
					ga('create', GA, 'auto');
					ga('set', 'transport', 'beacon');
					ga('send', 'pageview');

					on('a[rel~="external"]', ['click'], externalHandler, { passive: true, capture: true });
					on('a[href^="tel:"]', ['click'], telHandler, { passive: true, capture: true });
					on('a[href^="mailto:"]', ['click'], mailtoHandler, { passive: true, capture: true });
				}
			});
		});
	});
}

Promise.all([
	getCustomElement('install-prompt'),
	ready(),
]).then(([HTMLInstallPromptElement]) => {
	init();

	on('#install-btn', ['click'], () => new HTMLInstallPromptElement().show())
		.forEach(el => el.hidden = false);
});
