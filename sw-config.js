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
		/* HTML */
		'/',

		/* JS */
		'{{ site.data.importmap.imports["@shgysk8zer0/polyfills"] }}',
		'{{ site.data.importmap.imports["@shgysk8zer0/kazoo/"] }}harden.js',
		'/js/index.min.js',

		/* `customElements` templates */
		'{{ site.data.importmap.imports["@shgysk8zer0/components/"] }}/button/share-to.html',
		'{{ site.data.importmap.imports["@shgysk8zer0/components/"] }}/github/user.html',
		'{{ site.data.importmap.imports["@shgysk8zer0/components/"] }}/install/prompt.html',

		/* CSS */
		'/css/index.min.css',
		'{{ site.data.importmap.imports["@shgysk8zer0/components/"] }}/button/share-to.css',
		'{{ site.data.importmap.imports["@shgysk8zer0/components/"] }}/github/user.css',
		'{{ site.data.importmap.imports["@shgysk8zer0/components/"] }}/install/prompt.css',

		/* Images & Icons */
		'/img/icons.svg',
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
		'https://www.google-analytics.com/analytics.js',
		'https://www.googletagmanager.com/gtag/js',
		'https://i.imgur.com/',
		'https://cdn.kernvalley.us/img/',
		/https:\/\/\w+\.githubusercontent\.com\/u\/*/,
		/\.(jpg|png|webp|svg|gif)$/,
	],
	allowedFresh: [
		'https://api.github.com/users/',
		/\.(html|css|js|json)$/,
	]
};
