(function(l){"object"===typeof exports&&"undefined"!==typeof module?module.exports=l():"function"===typeof define&&define.amd?define([],l):("undefined"!==typeof window?window:"undefined"!==typeof global?global:"undefined"!==typeof self?self:this).Bebinesh=l()})(function(){return function a(f,e,g){function d(c,k){if(!e[c]){if(!f[c]){var h="function"==typeof require&&require;if(!k&&h)return h(c,!0);if(b)return b(c,!0);h=Error("Cannot find module '"+c+"'");throw h.code="MODULE_NOT_FOUND",h;}h=e[c]={exports:{}};
f[c][0].call(h.exports,function(b){var a=f[c][1][b];return d(a?a:b)},h,h.exports,a,f,e,g)}return e[c].exports}for(var b="function"==typeof require&&require,c=0;c<g.length;c++)d(g[c]);return d}({1:[function(a,f,e){function g(d,b){return b.querySelector(d)}e=f.exports=function(d,b){b=b||document;return g(d,b)};e.all=function(d,b){b=b||document;return b.querySelectorAll(d)};e.engine=function(d){if(!d.one)throw Error(".one callback required");if(!d.all)throw Error(".all callback required");g=d.one;e.all=
d.all;return e}},{}],2:[function(a,f,e){e=f.exports=function(a){a||(a={});"string"===typeof a&&(a={cookie:a});void 0===a.cookie&&(a.cookie="");return{get:function(d){for(var b=a.cookie.split(/;\s*/),c=0;c<b.length;c++){var e=b[c].split("=");if(unescape(e[0])===d)return unescape(e[1])}},set:function(d,b,c){c||(c={});d=escape(d)+"="+escape(b);c.expires&&(d+="; expires="+c.expires);c.path&&(d+="; path="+escape(c.path));return a.cookie=d}}};"undefined"!==typeof document&&(a=e(document),e.get=a.get,e.set=
a.set)},{}],3:[function(a,f,e){a=a("has-dom");f.exports=a()?document:null},{"has-dom":4}],4:[function(a,f,e){f.exports=function(){return"undefined"!==typeof window&&"undefined"!==typeof document&&"function"===typeof document.createElement}},{}],5:[function(a,f,e){f.exports=function(a){for(var b=1;b<arguments.length;b++){var c=arguments[b],d;for(d in c)g.call(c,d)&&(a[d]=c[d])}return a};var g=Object.prototype.hasOwnProperty},{}],6:[function(a,f,e){var g=a("xtend/mutable"),d=a("component-query"),b=
a("get-doc"),c=a("cookie-cutter"),m=Number(new Date),k=b&&b.documentElement;a=function(a,b){this.options=g({},{daysHidden:15,daysReminder:90,title:"",target:"_blank",force:!1,onProgress:function(){},onClose:function(){}},a||a||{});this.options.name=this.options.name?"-"+this.options.name.replace(/\s/g,"-"):"";var d=c.get("Bebinesh-closed"+this.options.name),e=c.get("Bebinesh-progressed"+this.options.name);if(this.options.force||!d&&!e)this.create(),this.show()};a.prototype={constructor:a,create:function(){var a=
b.createElement("div");a.className="bebinesh";a.innerHTML='<div class="bebinesh-overlay bebinesh-close"></div><div class="bebinesh-content"><a href="'+this.options.href+'" title="'+this.options.title+'" target="'+this.options.target+'" class="bebinesh-progress"><img src="'+this.options.src+'" alt="'+this.options.title+'"></a></div></div>';b.body?b.body.appendChild(a):b&&b.addEventListener("DOMContentLoaded",function(){b.body.appendChild(a)});d(".bebinesh-progress",a).addEventListener("click",this.progress.bind(this),
!1);d(".bebinesh-close",a).addEventListener("click",this.close.bind(this),!1)},hide:function(){k.classList.remove("bebinesh-show")},show:function(){k.classList.add("bebinesh-show")},close:function(){this.options.onClose.call();this.hide();c.set("Bebinesh-closed"+this.options.name,"true",{path:"/",expires:this.getExpirationDate(this.options.daysHidden)})},progress:function(){this.hide();c.set("Bebinesh-progressed"+this.options.name,"true",{path:"/",expires:this.getExpirationDate(this.options.daysReminder)})},
getExpirationDate:function(a){return new Date(m+864E5*a)}};f.exports=a},{"component-query":1,"cookie-cutter":2,"get-doc":3,"xtend/mutable":5}]},{},[6])(6)});
