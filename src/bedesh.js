'use strict';

const extend = require('xtend/mutable');
const q = require('component-query');
const doc = require('get-doc');
const cookie = require('cookie-cutter');

console.log('here is Bedesh');

// date parsing
const msInOneDay = 1000 * 60 * 60 * 24;
const today = Number(new Date());

// root and Dom
let root = doc && doc.documentElement;

let Bedesh = function (options) {

	this.options = extend({}, {
    daysHidden: 15, // Numbers of days to hide banner after dismissed
    daysReminder: 90, // Numbers of days to hide banner after downloaded
    headerContent: '',
    bodyContent: '',
    force: false, // always show banner
    onSubmit: function(){}, // On Submit callback
    onClose: function() {} // On Dismiss callback
	}, options || arguments[0] || {});

	const userDismissed = cookie.get('Bedesh-closed');
	const userSubmited = cookie.get('Bedesh-submited');

	if (!this.options.force && (userDismissed || userSubmited)) return;

	this.create();
	this.show();
};

Bedesh.prototype = {
	constructor: Bedesh,

	create: function () {

    console.log('creat');

		let modal = doc.createElement('div');

		modal.className = 'bedesh';
		modal.innerHTML = '<div class="bedesh-overlay bedesh-close"></div>'+
                        '<div class="bedesh-container">'+
                          '<div class="bedesh-header">'+
                            this.options.headerContent +
                          '</div>'+
                          '<div class="bedesh-body">'+
                            '<form action="">'+
                              this.options.bodyContent +
                              '<input type="email" placeholder="ایمیل خود را وارد کنید">'+
                              '<input type="submit" value="ثبت ایمیل">'+
                            '</form>'+
                          '</div>'+
                        '</div>';

		// there isn’t neccessary a body
		if (doc.body) {
			doc.body.appendChild(modal);
		}	else if (doc) {
			doc.addEventListener('DOMContentLoaded', function () {
				doc.body.appendChild(modal);
			});
		}

		// q('.Bedesh-download', modal).addEventListener('click', this.submit.bind(this), false);
		q('.bedesh-close', modal).addEventListener('click', this.close.bind(this), false);
	},
	hide: function () {
    console.log('hide');
		root.classList.remove('bedesh-show');
	},
	show: function () {
    console.log('show');
		root.classList.add('bedesh-show');
	},
	close: function () {
    console.log('close');
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
