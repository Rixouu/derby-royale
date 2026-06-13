export function hx(h){ h=(''+h).replace('#',''); return { r: parseInt(h.slice(0,2),16), g: parseInt(h.slice(2,4),16), b: parseInt(h.slice(4,6),16) }; }
export function rgb(r,g,b){ return 'rgb('+(r|0)+','+(g|0)+','+(b|0)+')'; }
export function shade(hex,k){ const c=hx(hex); return rgb(c.r*k,c.g*k,c.b*k); }
export function lite(hex,k){ const c=hx(hex); return rgb(c.r+(255-c.r)*k,c.g+(255-c.g)*k,c.b+(255-c.b)*k); }
export function rnd(a,b){ return a+Math.random()*(b-a); }
