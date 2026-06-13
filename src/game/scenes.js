const SCENES=[
  {key:'beach', name:'Beach',  sky:['#7fd5f0','#bdeaf6'], ground:'#f2d49b', groundDark:'#e4c184', track:'#ead9b0', laneLine:'#cdb98a', finishWord:'the finish', prop:'palm'},
  {key:'meadow',name:'Meadow', sky:['#8fd0f5','#cdeeff'], ground:'#7cbf5a', groundDark:'#5fa247', track:'#9ad07f', laneLine:'#79b35f', finishWord:'the finish', prop:'pine'},
  {key:'snow',  name:'Snow',   sky:['#bfe0f2','#e7f3fb'], ground:'#eef4fb', groundDark:'#d4e2f0', track:'#f6fbff', laneLine:'#cfe0ef', finishWord:'the finish', prop:'pinesnow'},
  {key:'desert',name:'Desert', sky:['#ffd089','#ffe9c2'], ground:'#e8c98f', groundDark:'#d0a85f', track:'#ecd6a8', laneLine:'#cdb178', finishWord:'the finish', prop:'cactus'},
  {key:'volcano',name:'Volcano',sky:['#3a2740','#6b3a4a'],ground:'#3a3338', groundDark:'#2a2428', track:'#4a4048', laneLine:'#2e262e', finishWord:'the finish', prop:'lavarock'},
];

/* time-of-day tints overlaid on scene */
const THEMES=[
  {key:'day',    overlay:'rgba(255,240,200,0)',   sky:null, star:false},
  {key:'sunset', overlay:'rgba(255,120,60,0.18)', sky:['#f2784b','#ffd089'], star:false},
  {key:'night',  overlay:'rgba(20,20,60,0.42)',   sky:['#0a1838','#243a63'], star:true},
];

export { SCENES, THEMES };
