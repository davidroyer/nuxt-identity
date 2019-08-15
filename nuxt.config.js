'use strict';

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

console.log('process.env.NETLIFY_IDENTITY_URL: ', process.env.NETLIFY_IDENTITY_URL);

const config = {
	env: {
		NETLIFY_IDENTITY_URL: process.env.NETLIFY_IDENTITY_URL,
	},
	generate: {
		dir: './../dist',
	},
	head: {
		title: 'Nuxt & Netlify Identity',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{
				hid: 'description',
				name: 'description',
				content: 'A fun way to integrate nuxt with netlify identity service',
			},
		],
		link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
	},
	// mode: 'spa',
	plugins: ['~/plugins/identity.js'],
	rootDir: './src',
	css: ['~/assets/main.css']

};

module.exports = config;
