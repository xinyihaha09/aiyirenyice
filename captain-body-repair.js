// Rebuild the seated bust as one coherent silhouette. No legacy limb overlays.
const repairedHead=captainDrawing.querySelector('.captain-head').cloneNode(true);
const seatedBody=captainDrawing.querySelector('.captain-person');
captainDrawing.querySelector('defs').insertAdjacentHTML('beforeend','<clipPath id="pilot-seated-clip"><rect x="120" y="75" width="330" height="448"/></clipPath>');
seatedBody.setAttribute('clip-path','url(#pilot-seated-clip)');
seatedBody.innerHTML=`
<g class="pilot-rebuilt-body">
<!-- Sleeves share the shoulder contour and continue naturally behind the desk. -->
<path d="M253 328 190 338Q154 344 148 383L134 527Q132 544 151 548H177Q194 544 195 529L207 410H363L375 529Q376 544 393 548H419Q438 544 436 527L422 383Q416 344 380 338L315 328Z" fill="url(#pilot-jacket)"/>
<!-- A separate central shirt panel produces continuous, readable armholes. -->
<path d="M221 333Q285 319 349 333L380 370 370 443 376 534H194L200 443 190 370Z" fill="url(#pilot-jacket)"/>
<path d="M190 378Q197 397 199 422M380 378Q373 397 371 422" fill="none" stroke="#bdcfe4" stroke-width="1.6" stroke-linecap="round"/>
<path d="M169 440 162 505M401 440l7 65" fill="none" stroke="#d3dfed" stroke-width="1.4" stroke-linecap="round"/>
<!-- Neck connects the jaw to the open shirt collar without extra shoulder shapes. -->
<path d="M258 297V335Q285 359 312 335V297Z" fill="url(#pilot-face)"/>
<path d="M258 308Q285 324 312 308V322Q285 339 258 323Z" fill="#d6927d" opacity=".25"/>
</g>`;
seatedBody.appendChild(repairedHead);
seatedBody.insertAdjacentHTML('beforeend',`
<g class="pilot-uniform-details">
<path d="M254 330 285 353 256 388 231 340ZM316 330 285 353 314 388 339 340Z" fill="#fff" stroke="#ccdaea" stroke-width="1.25" stroke-linejoin="round"/>
<path d="m285 353-11 16 6 12h10l6-12Z" fill="#283a60"/>
<path d="M280 379h10l7 78-12 17-12-17Z" fill="#283a60"/>
<path d="M285 381v81l-5-8Z" fill="#172b4b" opacity=".38"/>
<path d="M285 475v47" fill="none" stroke="#ccd9e9" stroke-width="1.2"/>
<circle cx="285" cy="486" r="1.5" fill="#a8bbd2"/>
<path d="M329 403h33v32q-16 9-33 0Z" fill="none" stroke="#c4d3e6" stroke-width="1.3"/>
<path d="m330 391 10 2 5-3 5 3 11-2-3 7-13 3-12-3Z" fill="url(#pilot-gold)"/>
<!-- Matching four-stripe shoulder boards follow the shoulder slope. -->
<g transform="translate(166 351) rotate(12)"><rect width="42" height="38" rx="3" fill="#293d5a"/><path d="M4 7h34M4 15h34M4 23h34M4 31h34" stroke="url(#pilot-gold)" stroke-width="4"/></g>
<g transform="translate(363 360) rotate(-12)"><rect width="42" height="38" rx="3" fill="#293d5a"/><path d="M4 7h34M4 15h34M4 23h34M4 31h34" stroke="url(#pilot-gold)" stroke-width="4"/></g>
</g>`);
