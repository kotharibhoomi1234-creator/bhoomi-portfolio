(() => {
 'use strict';
 const welcome=document.getElementById('welcome');
 if(!welcome || typeof welcome.showModal!=='function')return;
 const key='bhoomi-welcome-v2';
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
 let closing=false;let returnTarget=null;
 function openWelcome(){closing=false;returnTarget=document.activeElement;welcome.classList.remove('leaving');document.body.classList.remove('welcome-page-reveal');welcome.showModal();document.getElementById('welcome-enter').focus({preventScroll:true});}
 function finish(){welcome.close();welcome.classList.remove('leaving');document.body.classList.add('welcome-page-reveal');try{sessionStorage.setItem(key,'seen');}catch{}if(returnTarget?.id==='welcome-replay'){returnTarget.focus({preventScroll:true});}else{const target=document.getElementById('hero-name');target.setAttribute('tabindex','-1');target.focus({preventScroll:true});}closing=false;}
 function enter(){if(closing)return;closing=true;if(reduced.matches){finish();return;}welcome.classList.add('leaving');window.setTimeout(finish,650);}
 document.getElementById('welcome-enter').addEventListener('click',enter);
 document.getElementById('welcome-skip').addEventListener('click',enter);
 document.getElementById('welcome-replay').addEventListener('click',openWelcome);
 welcome.addEventListener('cancel',event=>{event.preventDefault();enter();});
 let seen=false;try{seen=sessionStorage.getItem(key)==='seen';}catch{}
 if(!seen && (!location.hash||location.hash==='#home'))openWelcome();
})();
