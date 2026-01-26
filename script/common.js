
let shapes = gsap.utils.toArray(".shape");

let tl = gsap.timeline({
  defaults: { duration: 2, ease: "expo.inOut" },
  repeat: -1
});

shapes.forEach((shape, i) => {
  tl.to("#morph", { morphSVG: shapes[i] });
});



gsap.set('#svg-stage', {opacity: 1});

const tl2 = gsap.timeline({repeat:-1, repeatDelay:0.5})

.fromTo('.group1', {scale:0.1, transformOrigin:'124 124'}, {duration:0.35, scale:0.5, ease:'expo.inOut'})
.to('.group1', {duration:1.2, rotate:15, ease:'none'}, 0.1)
.to('.group1 image', {scale:(i)=>[0.4,0.2,0.3][i], x:(i)=>[0,135,100][i], y:(i)=>[90,24,124][i], ease:'back'}, 0.4)
.to('.group1 image', {duration:0.01, opacity:0, stagger:0.06}, 1.1)

.to('#g2_mask circle', {duration:1, attr:{r:"124"}, ease:'circ'}, 1.3)
.fromTo('.group2', {scale:1, transformOrigin:'124 124'}, {duration:1.5, scale:0.9, ease:'none'}, 1.3)
.to('#g2_mask circle', {duration:0.3, attr:{cx:(i)=>["+=248","-=248"][i]}, ease:'sine.in'}, 2.45)

.fromTo('.group3', {transformOrigin:'124 124', rotate:-90}, {duration:0.9, rotate:0, ease:'expo'}, 2.6)
.fromTo('#g3_mask rect', {transformOrigin:(i)=>['0 124','124 0','124 124','248 124'][i], scale:0},{duration:0.4, scale:1, ease:'expo', stagger:-0.03}, 2.6)
.to('.group3', {duration:0.01, scale:0}, 3.7)

.from('.group4 image', {duration:0.01, opacity:0}, 3.8)
.fromTo('.group4', {transformOrigin:'83 124', rotate:15, scale:0.2}, {duration:0.5, rotate:0, scale:0.85, ease:'bounce'}, 3.8)
.to('.group4 image', {duration:0.01, opacity:0}, 4.7)

.fromTo('#g5_mask path', {transformOrigin:'124 124', scale:0},{duration:0.8, scale:1, ease:'expo'}, 4.7)
.fromTo('#g5_mask circle', {transformOrigin:'83 0', scale:0},{scale:1, ease:'expo'}, 4.7)

//GSDevTools.create({animation: tl2});
