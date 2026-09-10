/* ==========================================
 CHIELO AGRAPANA PORTFOLIO MOTION SYSTEM
 GSAP + 3D PARALLAX + SCROLL EXPERIENCE
========================================== */


gsap.registerPlugin(ScrollTrigger);



/* ===============================
 HERO TEXT INTRO
================================ */


const hero = gsap.timeline();


hero

.from(".badge",{

opacity:0,

y:40,

duration:1

})


.from(".hero-title .line",{

opacity:0,

y:100,

rotateX:90,

stagger:0.15,

duration:1,

ease:"power4.out"

})


.from(".hero p",{

opacity:0,

y:40,

duration:.8

})


.from(".hero-buttons",{

opacity:0,

y:30,

duration:.7

});







/* ===============================
 SCROLL REVEAL
================================ */


const revealElements =
document.querySelectorAll(".reveal");



revealElements.forEach((item)=>{


gsap.to(item,{

scrollTrigger:{


trigger:item,

start:"top 85%",


toggleActions:

"play none none reverse"


},


opacity:1,


y:0,


duration:1.2,


ease:"power4.out"


});


});







/* ===============================
 FLOATING DEVICE
================================ */


gsap.to(".phone",{


y:-35,

duration:3,

repeat:-1,

yoyo:true,

ease:"sine.inOut"


});




gsap.to(".laptop",{


y:-25,

duration:4,

repeat:-1,

yoyo:true,

ease:"sine.inOut"


});




gsap.to(".person",{


y:-20,

duration:3,

repeat:-1,

yoyo:true,

ease:"sine.inOut"


});









/* ===============================
 3D MOUSE INTERACTION
================================ */


const phone =
document.querySelector(".phone");


const laptop =
document.querySelector(".laptop");


const person =
document.querySelector(".person");




window.addEventListener(

"mousemove",

(e)=>{


const mouseX =

(e.clientX /
window.innerWidth -
0.5);



const mouseY =

(e.clientY /
window.innerHeight -
0.5);





gsap.to(phone,{

rotateY:
mouseX * 45,


rotateX:
mouseY * -35,


x:
mouseX * 40,


duration:1,


ease:"power3.out"


});







gsap.to(laptop,{

rotateY:
mouseX * 35,


rotateX:
mouseY * -25,


x:
mouseX * 50,


duration:1,


ease:"power3.out"


});







gsap.to(person,{

x:
mouseX * 25,


duration:1


});



}

);









/* ===============================
 SCROLL DEVICE STORY
================================ */



gsap.to(".phone",{


scrollTrigger:{


trigger:".about",


start:"top bottom",


end:"bottom top",


scrub:1


},


x:-300,


rotationY:180,


rotationZ:-20



});







gsap.to(".laptop",{


scrollTrigger:{


trigger:".about",


start:"top bottom",


end:"bottom top",


scrub:1


},


x:300,


rotationY:-180,


rotationZ:15



});









/* ===============================
 ORBIT ROTATION
================================ */



gsap.to(".orbit",{


scrollTrigger:{


trigger:".hero",


start:"top top",


end:"bottom top",


scrub:true


},


rotation:360


});








/* ===============================
 BACKGROUND PARALLAX
================================ */



window.addEventListener(

"scroll",

()=>{


let scroll =
window.scrollY;




gsap.to(".ambient-1",{


y:
scroll * .15,


duration:.5


});





gsap.to(".ambient-2",{


y:
-scroll * .12,


duration:.5


});



}

);









/* ===============================
 CARD 3D TILT
================================ */


const cards =
document.querySelectorAll(".card");



cards.forEach(card=>{


card.addEventListener(

"mousemove",

(e)=>{


const rect =
card.getBoundingClientRect();



const x =
e.clientX - rect.left;



const y =
e.clientY - rect.top;




const rotateX =
(y - rect.height/2)/15;



const rotateY =
(rect.width/2 - x)/15;





gsap.to(card,{

rotateX,

rotateY,

duration:.3,

ease:"power2.out"


});



}

);






card.addEventListener(

"mouseleave",

()=>{


gsap.to(card,{

rotateX:0,

rotateY:0,

duration:.5


});


}


);



});









/* ===============================
 SMOOTH NAVIGATION
================================ */


document.querySelectorAll(
'a[href^="#"]'
)
.forEach(anchor=>{


anchor.addEventListener(
"click",

function(e){


e.preventDefault();



document.querySelector(

this.getAttribute("href")

)

.scrollIntoView({

behavior:"smooth"

});



}

);


});









/* ===============================
 REDUCE MOTION
================================ */


if(
window.matchMedia(
"(prefers-reduced-motion: reduce)"
).matches
){


gsap.globalTimeline.timeScale(0);


}
// DIGITAL THINKING SEQUENTIAL ANIMATION


gsap.utils.toArray(".thinking-step").forEach((step,index)=>{


gsap.from(step,{


scrollTrigger:{


trigger:step,


start:"top 80%"


},


opacity:0,


y:80,


duration:1,


delay:index * 0.25,


ease:"power4.out"


});


});
// DIGITAL THINKING STEP BY STEP


gsap.utils.toArray(".process-step")
.forEach((step,index)=>{


gsap.fromTo(step,

{

opacity:0,

y:80

},

{


scrollTrigger:{


trigger:step,


start:"top 75%",


toggleActions:"play none none reverse"


},


opacity:1,

y:0,

duration:1,


delay:index * 0.35,


ease:"power4.out"


});


});