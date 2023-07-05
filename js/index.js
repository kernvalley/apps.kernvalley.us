import '@shgysk8zer0/kazoo/theme-cookie.js';
import { ready, toggleClass, on, css } from '@shgysk8zer0/kazoo/dom.js';
import { getCustomElement } from '@shgysk8zer0/kazoo/custom-elements.js';
import { debounce } from '@shgysk8zer0/kazoo/events.js';
import { init } from '@shgysk8zer0/kazoo/data-handlers.js';
import { getGooglePolicy } from '@shgysk8zer0/kazoo/trust-policies.js';
import { createPolicy } from '@shgysk8zer0/kazoo/trust.js';
import { importGa, externalHandler, telHandler, mailtoHandler } from '@shgysk8zer0/kazoo/google-analytics.js';
import { GA } from './consts.js';
import './components.js';

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
	const policy = getGooglePolicy();
	scheduler.postTask(() => {
		requestIdleCallback(async () => {
			const { ga, hasGa } = await importGa(GA, {}, { policy });

			if (hasGa()) {
				ga('create', GA, 'auto');
				ga('set', 'transport', 'beacon');
				ga('send', 'pageview');

				on('a[rel~="external"]', 'click', externalHandler, { passive: true, capture: true });
				on('a[href^="tel:"]', 'click', telHandler, { passive: true, capture: true });
				on('a[href^="mailto:"]', 'click', mailtoHandler, { passive: true, capture: true });
			}
		});
	}, { priority: 'background' });
} else {
	createPolicy('goog#html', {});
	createPolicy('goog#script-url', {});
	getGooglePolicy();
}

Promise.all([
	getCustomElement('install-prompt'),
	ready(),
]).then(([HTMLInstallPromptElement]) => {
	init();

	on('#install-btn', ['click'], () => new HTMLInstallPromptElement().show())
		.forEach(el => el.hidden = false);
});
