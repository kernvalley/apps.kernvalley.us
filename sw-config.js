---
layout: null
---
'use strict';
/* eslint-env serviceworker */
/* eslint no-unused-vars: 0 */

const config = {
	version: '{{ site.data.app.version | default: site.version }}',
	fresh: [
		'/manifest.json',
	].map(path => new URL(path, location.origin).href),
	stale: [
		'/',
		/* Other HTML */
		'/css/index.min.css',
		'/js/index.min.js',
		'/img/icons.svg',

		/* JS */
		'https://cdn.kernvalley.us/components/share-target.js',

		/* `customElements` templates */
		'https://cdn.kernvalley.us/components/toast-message.html',
		'https://cdn.kernvalley.us/components/share-to-button/share-to-button.html',
		'https://cdn.kernvalley.us/components/github/user.html',
		'https://cdn.kernvalley.us/components/pwa/prompt.html',

		/* CSS */
		'https://cdn.kernvalley.us/components/toast-message.css',
		'https://cdn.kernvalley.us/components/share-to-button/share-to-button.css',
		'https://cdn.kernvalley.us/components/github/user.css',
		'https://cdn.kernvalley.us/components/pwa/prompt.css',

		/* Images & Icons */
		'/img/apple-touch-icon.png',
		'/img/icon-512.png',
		'/img/icon-192.png',
		'/img/icon-32.png',
		'/img/favicon.svg',
		'https://cdn.kernvalley.us/img/logos/play-badge.svg',
		'https://cdn.kernvalley.us/img/logos/instagram.svg',

		/* Fonts */
		'https://cdn.kernvalley.us/fonts/roboto.woff2',
		/* Other */
	].map(path => new URL(path, location.origin).href),
	allowed: [
		/https:\/\/i\.imgur\.com\/*/,
		/https:\/\/*\.githubusercontent\.com\/u\/*/,
		/https:\/\/api\.github\.com\/users\/*/,
		/https:\/\/cdn\.kernvalley\.us\/img\/*/,
	],
};
