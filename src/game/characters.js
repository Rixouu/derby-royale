import { shade, lite } from './color.js';
import { DARK, SKIN, WHT, EYE, SHOE } from './palette.js';

/* ============================================================
   SPRITE REGISTRY
   Each character draws into a grid via g(x,y,w,h,color).
   Grid is GW x GH "art pixels"; origin top-left; racer faces RIGHT.
   frame: 0/1 alternating run pose. tint = player's single color.
   kind: 'critter' | 'hero' (affects nothing but grouping/labels).
   ============================================================ */

// shared leg/arm cycles for bipeds
/* 4-frame run cycle. frame 0..3:
   0 = left leg forward (contact)   1 = passing (legs together, body lifts)
   2 = right leg forward (contact)  3 = passing (other side)
   Legs swing forward/back; arms pump opposite to legs; body leans forward. */
function bipedLegs(g,f){
  // hip anchor around y=15. thighs are DARK, feet SHOE.
  if(f===0){            // left fwd, right back
    g(8,15,2,3,DARK);  g(9,18,3,1,SHOE);     // front leg planted ahead
    g(6,15,2,3,DARK);  g(4,18,3,1,SHOE);     // back leg trailing
  } else if(f===1){     // gather, slight lift
    g(7,15,2,4,DARK);  g(7,18,3,1,SHOE);
    g(9,15,2,4,DARK);  g(9,18,3,1,SHOE);
  } else if(f===2){     // right fwd, left back (mirror of 0)
    g(8,15,2,3,DARK);  g(9,18,3,1,SHOE);
    g(6,15,2,3,DARK);  g(4,18,3,1,SHOE);
  } else {              // gather (other pass)
    g(7,15,2,4,DARK);  g(7,18,3,1,SHOE);
    g(9,15,2,4,DARK);  g(9,18,3,1,SHOE);
  }
}
function bipedArms(g,f,c){
  // arms pump: forward arm high+front, back arm low+behind. opposite phase to legs.
  if(f===0){ g(11,8,2,3,c); g(4,10,2,3,c); }        // right arm up front, left back
  else if(f===1){ g(5,9,2,3,c); g(12,9,2,3,c); }    // mid swing
  else if(f===2){ g(4,8,2,3,c); g(12,10,2,3,c); }   // left arm up front, right back
  else { g(5,9,2,3,c); g(12,9,2,3,c); }             // mid swing
}
/* tiny horizontal body lean per frame (art-pixels) for biped torsos/heads */
function lean(f){ return (f===0||f===2)?1:0; }

const CHARACTERS=[
  {key:'turtle',name:'Turtle',kind:'critter',draw:function(g,f,t){
    // four legs shuffle in two diagonal pairs; gentle body bob
    var bob=(f===1||f===3)?1:0;
    var legSet=(f===0||f===1);
    if(legSet){ g(4,18,3,2,shade(t,0.7)); g(11,17,3,2,shade(t,0.7)); }   // front-left + back-right down
    else { g(7,18,3,2,shade(t,0.7)); g(12,18,2,2,shade(t,0.7)); }        // other pair
    g(4,9-bob,10,8,t); g(3,11-bob,12,4,t);                               // shell
    g(6,10-bob,2,2,shade(t,0.65)); g(9,12-bob,2,2,shade(t,0.65)); g(8,10-bob,2,2,shade(t,0.65));
    g(13,8-bob,4,4,lite(t,0.3));                                         // head
    g(15,9-bob,1,1,EYE);
    g(3,19,12,1,'rgba(0,0,0,.16)');
  }},
  {key:'duck',name:'Duck',kind:'critter',draw:function(g,f,t){
    // stepping feet + head bob + little wing flap
    var bob=(f===0||f===2)?0:1;
    if(f===0){ g(6,18,2,2,'#ff9f1c'); g(10,17,2,3,'#ff9f1c'); }
    else if(f===1){ g(7,18,2,2,'#ff9f1c'); g(9,18,2,2,'#ff9f1c'); }
    else if(f===2){ g(6,17,2,3,'#ff9f1c'); g(10,18,2,2,'#ff9f1c'); }
    else { g(7,18,2,2,'#ff9f1c'); g(9,18,2,2,'#ff9f1c'); }
    g(4,9-bob,9,8,t);                       // body
    g(11,5-bob,5,5,t);                      // head
    g(15,7-bob,2,2,'#ff9f1c');              // beak
    g(13,6-bob,1,1,EYE);
    g(4,11-bob,3,4,lite(t,0.32));           // wing (flaps with bob)
    if(bob){ g(3,12,4,2,lite(t,0.32)); }
    g(3,19,11,1,'rgba(0,0,0,.16)');
  }},
  {key:'frog',name:'Frog',kind:'critter',draw:function(g,f,t){
    // hop cycle: 0 crouch, 1 launch (airborne, legs back), 2 peak/stretch, 3 land
    var yo, legBack;
    if(f===0){ yo=2; legBack=false; }        // crouch low
    else if(f===1){ yo=-3; legBack=true; }    // leap up, legs kicked back
    else if(f===2){ yo=-4; legBack=true; }    // peak
    else { yo=0; legBack=false; }             // landing
    if(legBack){ g(2,12+yo,4,2,shade(t,0.8)); g(13,12+yo,4,2,shade(t,0.8)); } // legs stretched back
    else { g(3,16+yo,3,2,shade(t,0.8)); g(12,16+yo,3,2,shade(t,0.8)); }       // tucked under
    g(4,11+yo,10,7,t);                        // body
    g(5,8+yo,3,3,t); g(10,8+yo,3,3,t);        // eye bulges
    g(6,9+yo,1,1,WHT); g(11,9+yo,1,1,WHT);
    g(6,9+yo,1,1,EYE); g(11,9+yo,1,1,EYE);
    g(6,15+yo,6,1,shade(t,0.7));              // mouth
    g(4,19,10,1,'rgba(0,0,0,.16)');
  }},
  {key:'penguin',name:'Penguin',kind:'critter',draw:function(g,f,t){
    // waddle: whole body tilts left/right, feet alternate
    var tilt=(f===0)?-1:(f===2)?1:0;
    var fa=(f===0||f===1);
    if(fa){ g(5,18,3,2,'#ff9f1c'); g(10,17,2,2,'#ff9f1c'); }
    else { g(6,17,2,2,'#ff9f1c'); g(10,18,3,2,'#ff9f1c'); }
    g(5+tilt,8,8,10,'#2a2030');              // body (tilts)
    g(7+tilt,10,5,7,WHT);                    // belly
    g(6+tilt,4,7,5,'#2a2030');               // head
    g(8+tilt,6,4,3,WHT);                     // face
    g(12+tilt,6,2,2,'#ff9f1c');              // beak
    g(10+tilt,6,1,1,EYE);
    // flippers swing with waddle
    if(fa){ g(4+tilt,11,2,4,t); g(12+tilt,12,2,3,t); }
    else { g(4+tilt,12,2,3,t); g(12+tilt,11,2,4,t); }
    g(7+tilt,9,5,1,t);                       // scarf
    g(4,19,10,1,'rgba(0,0,0,.16)');
  }},
  {key:'bunny',name:'Bunny',kind:'critter',draw:function(g,f,t){
    // bounding hop: 0 crouch, 1 launch, 2 airborne stretch, 3 land
    var yo, stretch;
    if(f===0){ yo=2; stretch=false; }
    else if(f===1){ yo=-2; stretch=true; }
    else if(f===2){ yo=-4; stretch=true; }
    else { yo=0; stretch=false; }
    if(stretch){ g(3,15+yo,3,2,lite(t,0.2)); g(12,16+yo,3,2,lite(t,0.2)); g(13,17+yo,3,2,lite(t,0.2)); } // legs out
    else { g(5,17+yo,3,2,lite(t,0.2)); g(10,17+yo,3,2,lite(t,0.2)); }
    g(5,10+yo,9,8,t);                        // body
    g(11,5+yo,5,5,t);                        // head
    var ear=stretch?-1:0;                    // ears stream back when bounding
    g(11,1+yo+ear,2,4,lite(t,0.2)); g(14,1+yo+ear,2,4,lite(t,0.2));
    g(11,2+yo+ear,1,2,'#ff9fc0'); g(14,2+yo+ear,1,2,'#ff9fc0');
    g(14,7+yo,1,1,EYE);
    g(15,8+yo,1,1,'#ff9fc0');                // nose
    g(5,19,10,1,'rgba(0,0,0,.16)');
  }},
  // ---- hero archetypes (original; genre-evoking, not licensed designs) ----
  {key:'ninja',name:'Ninja',kind:'hero',draw:function(g,f,t){
    bipedLegs(g,f); var L=lean(f);
    g(6+L,8,6,7,t);                     // gi
    g(5+L,11,8,1,shade(t,0.7));         // belt
    g(6+L,3,6,5,SKIN);                  // face
    g(6+L,3,6,2,t);                     // mask top
    g(5+L,5,8,1,'#e23b3b'); g(4+L,5,1,2,'#e23b3b'); // headband + tail
    g(9+L,6,1,1,EYE);
    bipedArms(g,f,t);
  }},
  {key:'speedster',name:'Speedster',kind:'hero',draw:function(g,f,t){
    bipedLegs(g,f); var L=lean(f);
    g(6+L,8,6,7,t);
    g(6+L,3,6,5,t);                     // head all tint
    g(4+L,4,2,2,t); g(12+L,4,2,2,t); g(5+L,2,2,2,t); // spikes
    g(8+L,11,4,2,WHT);                  // chest emblem
    g(9+L,5,2,2,WHT); g(9+L,5,1,1,EYE);
    bipedArms(g,f,t);
  }},
  {key:'runner',name:'Runner',kind:'hero',draw:function(g,f,t){
    bipedLegs(g,f); var L=lean(f);
    g(6+L,8,6,7,'#2e6bd8');             // overalls
    g(6+L,8,6,3,t);                     // shirt (tint)
    g(7+L,11,1,4,shade('#2e6bd8',1.2)); g(10+L,11,1,4,shade('#2e6bd8',1.2)); // straps
    g(6+L,3,6,5,SKIN);                  // head
    g(5+L,2,8,2,t); g(11+L,3,3,1,t);    // cap + brim (tint)
    g(9+L,5,1,1,EYE);
    g(7+L,6,3,1,'#7a4a2a');             // mustache
    bipedArms(g,f,t);
  }},
  {key:'knight',name:'Knight',kind:'hero',draw:function(g,f,t){
    bipedLegs(g,f); var L=lean(f);
    g(6+L,8,6,7,'#c9ced6');             // armor
    g(6+L,9,6,2,t);                     // tabard (tint)
    g(6+L,3,6,5,'#c9ced6');             // helm
    g(7+L,5,4,1,EYE);                   // visor slit
    g(8+L,1,2,2,t);                     // plume
    if(f===0||f===2){ g(3+L,9,3,4,'#c9ced6'); g(3+L,9,3,4,t); g(12+L,8,2,4,'#aab0b8'); }
    else { g(4+L,8,3,4,'#c9ced6'); g(4+L,8,3,4,t); g(11+L,9,2,4,'#aab0b8'); }
  }},
  {key:'wizard',name:'Wizard',kind:'hero',draw:function(g,f,t){
    bipedLegs(g,f); var L=lean(f);
    g(5+L,8,8,8,t);                     // robe
    g(6+L,3,6,5,SKIN);                  // face
    g(5+L,0,8,3,t); g(7+L,-1,4,2,t);    // hat (tint)
    g(4+L,3,10,1,t);                    // hat brim
    g(9+L,5,1,1,EYE);
    g(7+L,7,5,3,WHT);                   // beard
    g(13+L,6,1,8,'#8b5a2b');            // staff
    g(12+L,5,3,2,'#ffe14d');            // orb glow
    bipedArms(g,f,t);
  }},
];
const CHAR_COUNT=CHARACTERS.length;

export { CHARACTERS, CHAR_COUNT, bipedLegs, bipedArms, lean };
