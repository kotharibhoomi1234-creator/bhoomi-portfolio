(() => {
'use strict';
const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
const projects = window.portfolio.projects;
const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const menu = $('.menu-toggle');
menu.addEventListener('click', () => {const opened = menu.getAttribute('aria-expanded') !== 'true';menu.setAttribute('aria-expanded', String(opened));$('#main-nav').classList.toggle('open',opened);menu.querySelector('span').textContent=opened?'−':'+';});
$$('#main-nav a').forEach(link => link.addEventListener('click', () => {menu.setAttribute('aria-expanded','false');$('#main-nav').classList.remove('open');menu.querySelector('span').textContent='+';}));
document.addEventListener('keydown', e => {if(e.key==='Escape'&&menu.getAttribute('aria-expanded')==='true'){menu.click();menu.focus();}});
const skillNotes=[
 'The everyday tools I use to explore data, spot patterns and turn questions into something I can investigate.',
 'Methods I’ve explored through prediction, classification and dimensionality reduction in my projects.',
 'Tools behind my experiments with computer vision, retrieval and AI applications.',
 'The human side of the work: making plans clear, coordinating people and finding words that connect.'
];
const skillGroups=window.portfolio.skills;
$('#skill-tabs').innerHTML=skillGroups.map((g,i)=>`<button role="tab" id="tool-tab-${i}" aria-controls="skills" aria-selected="${i===0}" tabindex="${i===0?0:-1}" data-tool="${i}"><span>0${i+1}</span>${esc(g.title)}<b aria-hidden="true">↗</b></button>`).join('');
function selectToolkit(i){
 $$('#skill-tabs button').forEach((b,n)=>{b.setAttribute('aria-selected',String(n===i));b.tabIndex=n===i?0:-1;});
 const panel=$('#skills');panel.setAttribute('aria-labelledby',`tool-tab-${i}`);
 panel.innerHTML=`<p class="eyebrow">ON MY DESK / 0${i+1}</p><h4>${esc(skillGroups[i].title)}</h4><p>${esc(skillNotes[i])}</p><ul class="tool-chips">${skillGroups[i].items.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`;
}
$$('#skill-tabs button').forEach((b,i)=>b.addEventListener('click',()=>selectToolkit(i)));
$('#skill-tabs').addEventListener('keydown',e=>{if(!['ArrowRight','ArrowLeft','ArrowDown','ArrowUp','Home','End'].includes(e.key))return;const buttons=$$('#skill-tabs button');let i=buttons.indexOf(document.activeElement);if(i<0)return;e.preventDefault();i=e.key==='Home'?0:e.key==='End'?buttons.length-1:(i+(['ArrowRight','ArrowDown'].includes(e.key)?1:-1)+buttons.length)%buttons.length;selectToolkit(i);buttons[i].focus();});
selectToolkit(0);
const roleChapters=[
 {place:'Jai Hind College',time:'Grades 11 & 12',roles:['Informals Executive · Shoutt'],note:'My early experience of working with a college event team.'},
 {place:'First year of college',time:'A foundation in teamwork',roles:['Hospitality Executive · MUNSoc','Sub-Head of Hospitality · Editorial Project','Marketing Executive · IEEE'],note:'Different teams and responsibilities, with a shared lesson: show up and make things happen.'},
 {place:'Second year of college',time:'Taking responsibility',roles:['USG Hospitality · MUNSoc'],note:'A growing role in hospitality and team coordination.'},
 {place:'MUNSoc',time:'The next chapter',roles:['Chargé d’Affaires','Communication Director'],note:'Growing into leadership through communication and working with people.'}
];
$('#leadership').innerHTML=roleChapters.map((item,i)=>`<details class="journey-ticket" ${i===3?'open':''}><summary><span class="year-index">0${i+1}</span><span class="chapter-name"><small>${esc(item.time)}</small><strong>${esc(item.place)}</strong></span></summary><div class="chapter-content"><div class="role-bubbles">${item.roles.map(r=>`<span>${esc(r)}</span>`).join('')}</div><p>${esc(item.note)}</p></div></details>`).join('');
let selected = projects[0].id;
let filter = 'all';
function renderDetail(id) {
 const project=projects.find(p=>p.id===id);if(!project)return;selected=id;
 $$('.project-card').forEach(card=>card.setAttribute('aria-expanded',String(card.dataset.project===id)));
 $('#project-detail').innerHTML=`<div><p class="eyebrow">${esc(project.index)} / ${esc(project.category)}</p><h3>${esc(project.title)}</h3><p class="project-subtitle">${esc(project.subtitle)}</p><span class="project-status">${project.status==='progress'?'IN PROGRESS':'COMPLETED'}</span></div><div><p class="project-description">${esc(project.description)}</p><p class="project-notes">${esc(project.details)}</p><div class="tags">${project.tags.map(tag=>`<span>${esc(tag)}</span>`).join('')}</div></div>`;
}
function renderProjects() {
 const visible=projects.filter(p=>filter==='all'||p.status===filter);
 if(!visible.some(p=>p.id===selected))selected=visible[0].id;
 $('#projects').innerHTML=visible.map((p,i)=>`<button class="project-card" style="--rotation:${(i-(visible.length-1)/2)*5}deg;--lift:${Math.abs(i-(visible.length-1)/2)*8}px" data-project="${esc(p.id)}" aria-controls="project-detail" aria-expanded="${p.id===selected}"><small>${esc(p.index)} / ${esc(p.category)}</small><span class="motif" aria-hidden="true">${esc(p.motif)}</span><strong>${esc(p.title)}</strong></button>`).join('');
 $$('.project-card').forEach(card=>card.addEventListener('click',()=>renderDetail(card.dataset.project)));
 renderDetail(selected);
}
$$('[data-filter]').forEach(button=>button.addEventListener('click',()=>{filter=button.dataset.filter;$$('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));renderProjects();}));
$('#projects').addEventListener('keydown',e=>{if(!['ArrowRight','ArrowLeft','Home','End'].includes(e.key))return;const cards=$$('.project-card');const current=cards.indexOf(document.activeElement);if(current<0)return;e.preventDefault();let next=e.key==='Home'?0:e.key==='End'?cards.length-1:(current+(e.key==='ArrowRight'?1:-1)+cards.length)%cards.length;cards[next].focus();renderDetail(cards[next].dataset.project);});
renderProjects();
const photos = [
 ['01','Bhoomi in a green traditional outfit','A little colour, a little celebration.'],
 ['02','Bhoomi in a black blazer','For the days that call for showing up.'],
 ['03','Bhoomi wearing a red traditional outfit','Another celebration, another memory.'],
 ['04','Bhoomi standing by a red wall','A moment between the plans.'],
 ['05','Bhoomi with a mountain landscape in the background','A change of scenery. A fresh perspective.'],
 ['06','Bhoomi on a mountain trail','Taking the scenic route.'],
 ['07','Bhoomi by a mirror indoors','Little moments, kept.'],
 ['08','Bhoomi in a light traditional outfit','Dressed for a new chapter.'],
 ['09','Bhoomi by a leafy wall','Somewhere along the way.'],
 ['10','Bhoomi smiling at a café table','A little pause, a good memory.'],
 ['11','Bhoomi in a warmly lit interior','Collecting stories after hours.']
];
let portraitIndex=1;let turning=false;
$('#portrait-flip').addEventListener('click',()=>{if(turning)return;turning=true;const button=$('#portrait-flip');button.classList.add('turning');const next=(portraitIndex+1)%photos.length;const [num,alt]=photos[next];const preload=new Image();const show=()=>{window.setTimeout(()=>{const picture=$('#about-photo');picture.src=preload.src;picture.alt=alt;picture.style.objectPosition=next===1?'50% 50%':next===9?'50% 45%':'50% 35%';portraitIndex=next;button.classList.remove('turning');turning=false;},reduced.matches?0:160);};preload.onload=show;preload.onerror=()=>{button.classList.remove('turning');turning=false;};preload.src=`assets/portraits/bhoomi-${num}.jpeg`;});
let poemIndex=-1;
function pickPoem(){const poems=window.poems;if(!poems?.length)return;poemIndex=(poemIndex+1)%poems.length;const poem=poems[poemIndex];$('#poem-teaser').textContent='“'+poem.lines.find(line=>line.trim())+'”';$('#poem-link').href='poems.html#'+encodeURIComponent(poem.id);$('#poem-link').textContent='Read “'+poem.title+'” ↗';$('#another-poem').textContent='Turn another page ↻';$('.page-number').textContent=String(poemIndex+1).padStart(2,'0');}
function setBook(open){const book=$('#poem-pick');book.setAttribute('aria-pressed',String(open));book.setAttribute('aria-label',open?'Close Bhoomi’s notebook':'Open Bhoomi’s notebook');$('.book-state').textContent=open?'TAP TO CLOSE ↙':'TAP TO OPEN ↗';}
$('#poem-pick').addEventListener('click',()=>{const open=$('#poem-pick').getAttribute('aria-pressed')!=='true';setBook(open);if(open)pickPoem();});
$('#another-poem').addEventListener('click',()=>{setBook(true);pickPoem();});
function toggleCoffee(){const button=$('#coffee-toggle');const open=button.getAttribute('aria-pressed')!=='true';button.setAttribute('aria-pressed',String(open));button.setAttribute('aria-label',open?'Close the takeaway coffee cup lid':'Lift the takeaway coffee cup lid');$('#coffee-label').textContent=open?'Close the lid −':'Lift the lid +';}
$('#coffee-toggle').addEventListener('click',toggleCoffee);$('#coffee-label').addEventListener('click',toggleCoffee);

$('#copy-email').addEventListener('click',async()=>{try{await navigator.clipboard.writeText('kotharibhoomi1234@gmail.com');$('#copy-status').textContent='Email copied. Say hello whenever you’re ready.';}catch{$('#copy-status').textContent='Select the email address above to copy it, or tap it to open your mail app.';}});
// Native scrolling stays in control. Motion is decorative and honours system preferences.
if('IntersectionObserver' in window && !reduced.matches) {
 document.body.classList.add('motion-ready');
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.08});
 $$('.reveal').forEach(el=>observer.observe(el));
 reduced.addEventListener('change',()=>{if(reduced.matches){document.body.classList.remove('motion-ready');observer.disconnect();}});
}
const sections=$$('main>section[id]');
const navLinks=$$('#main-nav a');
let pending=false;
function updateScroll(){pending=false;const y=window.scrollY;const total=document.documentElement.scrollHeight-window.innerHeight;$('.reading-progress').style.transform=`scaleX(${total>0?Math.min(1,y/total):0})`;
 let active='home';for(const section of sections){if(section.getBoundingClientRect().top<window.innerHeight*.35)active=section.id;}navLinks.forEach(a=>{if(a.hash==='#'+active)a.setAttribute('aria-current','true');else a.removeAttribute('aria-current');});
 if(!reduced.matches && window.innerWidth>700){const section=$('#growth');const r=section.getBoundingClientRect();const range=section.offsetHeight-window.innerHeight;const progress=Math.max(0,Math.min(1,(84-r.top)/Math.max(1,range)));const step=Math.min(2,Math.floor(progress*3));$$('.growth-word').forEach((el,i)=>el.classList.toggle('active',i===step));}
}
function scheduleScroll(){if(!pending){pending=true;requestAnimationFrame(updateScroll);}}
window.addEventListener('scroll',scheduleScroll,{passive:true});window.addEventListener('resize',scheduleScroll);updateScroll();
})();
