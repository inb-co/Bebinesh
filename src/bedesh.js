'use strict';

const extend = require('xtend/mutable');
const q = require('component-query');
const doc = require('get-doc');
const cookie = require('cookie-cutter');

// date parsing
const msInOneDay = 1000 * 60 * 60 * 24;
const today = Number(new Date());

// root and Dom
let root = doc && doc.documentElement;


let Bedesh = function (options) {

	this.options = extend({}, {
	}, options || arguments[0] || {});

	const userDismissed = cookie.get('Bedesh-closed');
	const userSubmited = cookie.get('Bedesh-submited')

	if (!this.options.force && (userDismissed || userSubmited)) return;

	extend(this, mixins[this.options.store]);

	this.create();
	this.show();
};

Bedesh.prototype = {
	constructor: Bedesh,

	create: function () {


		let modal = doc.createElement('div');

		modal.className = 'Bedesh';
		modal.innerHTML = '';

		// there isn’t neccessary a body
		if (doc.body) {
			doc.body.appendChild(modal);
		}	else if (doc) {
			doc.addEventListener('DOMContentLoaded', function () {
				doc.body.appendChild(modal);
			});
		}

		q('.Bedesh-download', modal).addEventListener('click', this.submit.bind(this), false);
		q('.Bedesh-close', modal).addEventListener('click', this.close.bind(this), false);
	},
	hide: function () {
		root.classList.remove('Bedesh-show');
	},
	show: function () {
		root.classList.add('Bedesh-show');
	},
	close: function () {
		this.hide();
		cookie.set('Bedesh-closed', 'true', {
			path: '/',
			expires: this.getExpirationDate(this.options.daysHidden)
		});
	},
	submit: function () {
		this.hide();
		cookie.set('Bedesh-submited', 'true', {
			path: '/',
			expires: this.getExpirationDate(this.options.daysReminder)
		});
	},
	getExpirationDate: function (remainingDays) {
		return new Date(today + (remainingDays * msInOneDay))
	}
};

module.exports = Bedesh;
