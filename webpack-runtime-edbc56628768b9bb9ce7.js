!function(){"use strict";var e,t,n,r,o,c={},a={};function u(e){var t=a[e];if(void 0!==t)return t.exports;var n=a[e]={exports:{}};return c[e](n,n.exports,u),n.exports}u.m=c,e=[],u.O=function(t,n,r,o){if(!n){var c=1/0;for(f=0;f<e.length;f++){n=e[f][0],r=e[f][1],o=e[f][2];for(var a=!0,s=0;s<n.length;s++)(!1&o||c>=o)&&Object.keys(u.O).every((function(e){return u.O[e](n[s])}))?n.splice(s--,1):(a=!1,o<c&&(c=o));if(a){e.splice(f--,1);var i=r();void 0!==i&&(t=i)}}return t}o=o||0;for(var f=e.length;f>0&&e[f-1][2]>o;f--)e[f]=e[f-1];e[f]=[n,r,o]},u.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return u.d(t,{a:t}),t},n=Object.getPrototypeOf?function(e){return Object.getPrototypeOf(e)}:function(e){return e.__proto__},u.t=function(e,r){if(1&r&&(e=this(e)),8&r)return e;if("object"==typeof e&&e){if(4&r&&e.__esModule)return e;if(16&r&&"function"==typeof e.then)return e}var o=Object.create(null);u.r(o);var c={};t=t||[null,n({}),n([]),n(n)];for(var a=2&r&&e;"object"==typeof a&&!~t.indexOf(a);a=n(a))Object.getOwnPropertyNames(a).forEach((function(t){c[t]=function(){return e[t]}}));return c.default=function(){return e},u.d(o,c),o},u.d=function(e,t){for(var n in t)u.o(t,n)&&!u.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},u.f={},u.e=function(e){return Promise.all(Object.keys(u.f).reduce((function(t,n){return u.f[n](e,t),t}),[]))},u.u=function(e){return({3:"component---src-pages-news-js",91:"component---src-pages-getting-started-js",185:"component---src-pages-talks-js",207:"component---src-pages-technical-charter-js",302:"component---src-pages-security-policy-js",351:"commons",501:"component---src-pages-contact-js",502:"component---src-pages-using-typescript-tsx",638:"component---src-pages-docs-js",647:"component---src-pages-markdown-remark-frontmatter-slug-js",678:"component---src-pages-index-js",883:"component---src-pages-404-js",970:"component---src-pages-help-js",974:"component---src-pages-usecases-js"}[e]||e)+"-"+{3:"fe3bd6f583f20d227668",91:"0390709e06b5660a1eef",175:"4f5eec3dd4c4a5e05eef",185:"13917023b0f6ff736747",207:"8496defebed0fe681b39",231:"b2d35ff9bb1952aa22d1",302:"fe641c834713953175cb",351:"3b5e99c2356f29e3a448",501:"9d1cc6f8537c5267df3c",502:"e42ea6fd3f052f153eaf",503:"12b6e675064f7faadd10",638:"24c8b8db9481549f8c30",647:"6bc1fe4bd641bb669fc8",678:"4c3250fa97cad1471f47",883:"a03ea97f79c7a0fc8768",970:"eb8690b4e5b6f08fc019",974:"479888ff19b309e2a563"}[e]+".js"},u.miniCssF=function(e){return"styles.6400bb7578179fc52307.css"},u.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),u.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r={},o="gatsby-starter-default:",u.l=function(e,t,n,c){if(r[e])r[e].push(t);else{var a,s;if(void 0!==n)for(var i=document.getElementsByTagName("script"),f=0;f<i.length;f++){var d=i[f];if(d.getAttribute("src")==e||d.getAttribute("data-webpack")==o+n){a=d;break}}a||(s=!0,(a=document.createElement("script")).charset="utf-8",a.timeout=120,u.nc&&a.setAttribute("nonce",u.nc),a.setAttribute("data-webpack",o+n),a.src=e),r[e]=[t];var p=function(t,n){a.onerror=a.onload=null,clearTimeout(l);var o=r[e];if(delete r[e],a.parentNode&&a.parentNode.removeChild(a),o&&o.forEach((function(e){return e(n)})),t)return t(n)},l=setTimeout(p.bind(null,void 0,{type:"timeout",target:a}),12e4);a.onerror=p.bind(null,a.onerror),a.onload=p.bind(null,a.onload),s&&document.head.appendChild(a)}},u.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.p="/",function(){var e={658:0,532:0};u.f.j=function(t,n){var r=u.o(e,t)?e[t]:void 0;if(0!==r)if(r)n.push(r[2]);else if(/^(532|658)$/.test(t))e[t]=0;else{var o=new Promise((function(n,o){r=e[t]=[n,o]}));n.push(r[2]=o);var c=u.p+u.u(t),a=new Error;u.l(c,(function(n){if(u.o(e,t)&&(0!==(r=e[t])&&(e[t]=void 0),r)){var o=n&&("load"===n.type?"missing":n.type),c=n&&n.target&&n.target.src;a.message="Loading chunk "+t+" failed.\n("+o+": "+c+")",a.name="ChunkLoadError",a.type=o,a.request=c,r[1](a)}}),"chunk-"+t,t)}},u.O.j=function(t){return 0===e[t]};var t=function(t,n){var r,o,c=n[0],a=n[1],s=n[2],i=0;if(c.some((function(t){return 0!==e[t]}))){for(r in a)u.o(a,r)&&(u.m[r]=a[r]);if(s)var f=s(u)}for(t&&t(n);i<c.length;i++)o=c[i],u.o(e,o)&&e[o]&&e[o][0](),e[c[i]]=0;return u.O(f)},n=self.webpackChunkgatsby_starter_default=self.webpackChunkgatsby_starter_default||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}()}();
//# sourceMappingURL=webpack-runtime-edbc56628768b9bb9ce7.js.map