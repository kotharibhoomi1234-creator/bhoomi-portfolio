/* An optional opening: content remains available if animation or storage fails. */
(()=>{
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let seen=false;try{seen=sessionStorage.getItem('bhoomi-sky-flight-v3')==='seen'}catch{}
 if(!reduced.matches&&!seen&&!location.hash){
  const opening=document.createElement('div');opening.className='flight-opening';opening.setAttribute('aria-label','Welcome to Bhoomi’s Desk');
  opening.innerHTML='<div class="flight-greeting"><span lang="hi">नमस्ते</span><p>Welcome to my little world.</p></div><button type="button" class="skip-flight">Enter the desk ↗</button>';
  const bird='<svg viewBox="0 0 180 190" aria-hidden="true"><g stroke="#3e5055" stroke-width="1.5" stroke-linejoin="round"><path fill="#68797b" d="M79 116 65 174Q89 185 110 172L99 116Z"/><g class="left-wing"><path fill="#eee9da" d="M87 95Q52 37 7 14L16 57 26 52 26 69 37 62 39 81 48 73 57 97 72 115Z"/><path fill="#728181" d="M87 95Q65 73 26 52L39 81 57 97 72 115Z"/><path fill="none" d="M24 35 66 88M34 30 73 78M17 47 59 94" opacity=".5"/></g><g class="right-wing"><path fill="#eee9da" d="M93 95Q128 37 173 14L164 57 154 52 154 69 143 62 141 81 132 73 123 97 108 115Z"/><path fill="#728181" d="M93 95Q115 73 154 52L141 81 123 97 108 115Z"/><path fill="none" d="M156 35 114 88M146 30 107 78M163 47 121 94" opacity=".5"/></g><path fill="#d7dcd3" d="M80 72Q72 88 75 122Q90 149 105 122Q108 88 100 72Z"/><path fill="#4c6b68" d="M80 72Q90 62 100 72L103 90Q90 98 77 90Z"/><ellipse fill="#889b99" cx="90" cy="65" rx="12" ry="18"/><path fill="#d8c9ac" d="M86 49 90 38 94 49Z"/><circle cx="85" cy="61" r="2" fill="#242e31"/></g></svg>';
  for(let i=0;i<22;i++){const b=document.createElement('span');b.className='flying-swallow';b.style.cssText=`--offset-x:${(i%6)*64-170}px;--offset-y:${Math.floor(i/6)*98-180}px;--delay:${(i%5)*.13}s;--size:${38+(i*17%79)}px;--flap:${.55+(i%4)*.12}s;--bank:${25+(i%5)*7}deg`;b.innerHTML=bird;opening.append(b)}
  document.body.append(opening);
  let done=false;const finish=()=>{if(done)return;done=true;opening.remove();try{sessionStorage.setItem('bhoomi-sky-flight-v3','seen')}catch{}};
  opening.querySelector('button').onclick=finish;
  opening.addEventListener('keydown',e=>{if(e.key==='Escape')finish()});
  // Keyboard navigation immediately reveals the actual page rather than hiding focus.
  document.addEventListener('keydown',finish,{once:true});
  setTimeout(finish,7900);
 }
 const flip=document.querySelector('.name-flip'),photo=document.getElementById('portrait-loop');
 if(!flip||!photo)return;
 const descriptions=['in a green traditional outfit','wearing a black blazer','in a red traditional outfit','in a white top by a red mirror','in the mountains','on a forest trail','in a mirror photograph','in a cream traditional outfit holding roses','in a black floral dress','at a restaurant','in a white top at a restaurant'];
 const positions=['50% 30%','50% 40%','50% 30%','50% 35%','50% 40%','50% 35%','38% 35%','50% 30%','50% 32%','50% 45%','50% 45%'];
 let index=-1,wasOpen=false;
 function reveal(){const open=flip.getAttribute('aria-pressed')==='true';if(open&&!wasOpen){index=(index+1)%11;photo.src=`assets/portraits/bhoomi-${String(index+1).padStart(2,'0')}.jpeg`;photo.alt='Bhoomi '+descriptions[index];photo.style.objectPosition=positions[index];const next=new Image();next.src=`assets/portraits/bhoomi-${String((index+1)%11+1).padStart(2,'0')}.jpeg`}wasOpen=open}
 new MutationObserver(reveal).observe(flip,{attributes:true,attributeFilter:['aria-pressed']});
})();
