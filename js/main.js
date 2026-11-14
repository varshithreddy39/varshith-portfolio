const $=id=>document.getElementById(id);
const card=$('card'),flip=$('flip'),hs=$('heroSlot'),is=$('introSlot'),sec=$('stxt'),stp=$('stp'),nav=$('nav'),mb=$('mb');
const L=(a,b,t)=>a+(b-a)*t,clamp=v=>Math.min(1,Math.max(0,v));
const ease=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
stp.innerHTML=stp.textContent.trim().split(/\s+/).map(w=>'<span>'+w+'</span>').join(' ');
const words=[...stp.children];
let queued=false;
function tick(){
  queued=false;
  const h=hs.getBoundingClientRect(),i=is.getBoundingClientRect(),y=scrollY,vh=innerHeight;
  const p=ease(clamp(y/Math.max(1,i.top+y-vh*.18)));
  card.style.width=L(h.width,i.width,p)+'px';card.style.height=L(h.height,i.height,p)+'px';
  card.style.transform='translate3d('+L(h.left,i.left,p)+'px,'+L(h.top,i.top,p)+'px,0)';
  card.style.setProperty('--r',L(8,22,p)+'px');
  const lift=Math.sin(p*Math.PI);
  flip.style.transform='translateZ('+(lift*120)+'px) rotateX('+(lift*-6)+'deg) rotateY('+(p*180)+'deg)';
  card.style.opacity=1;
  const r=sec.getBoundingClientRect(),pr=clamp(-r.top/Math.max(1,r.height-vh)),n=words.length;
  words.forEach((s,k)=>{s.style.opacity=.13+.87*clamp(pr*1.12*n-k+1)});
}
const req=()=>{if(!queued){queued=true;requestAnimationFrame(tick)}};
addEventListener('scroll',req,{passive:true});addEventListener('resize',req);
Promise.all([...document.images].map(m=>m.decode?m.decode().catch(()=>{}):0)).then(tick);tick();
mb.onclick=()=>{const o=nav.classList.toggle('open');mb.setAttribute('aria-expanded',o)};
nav.querySelectorAll('.menu a').forEach(a=>a.onclick=()=>{nav.classList.remove('open')});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15});
document.querySelectorAll('.rv').forEach(e=>io.observe(e));
const word=$('wd').parentElement,wd=$('wd');
function fit(){word.style.fontSize='100px';word.style.fontSize=100*(word.clientWidth-24)/wd.getBoundingClientRect().width+'px'}
fit();addEventListener('resize',fit);if(document.fonts)document.fonts.ready.then(fit);
const root=document.documentElement,tg=$('tg');
const isDark=()=>root.dataset.theme?root.dataset.theme==='dark':matchMedia('(prefers-color-scheme:dark)').matches;
const icon=()=>{tg.textContent=isDark()?'☀︎':'☾'};
try{const s=localStorage.getItem('theme');if(s)root.dataset.theme=s}catch(e){}
tg.onclick=()=>{const n=isDark()?'light':'dark';root.dataset.theme=n;try{localStorage.setItem('theme',n)}catch(e){}icon()};icon();
