
const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.topbar nav');
toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',open)});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')});
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const filterButtons=document.querySelectorAll('.filter-bar button');
const figures=document.querySelectorAll('.gallery-grid figure');
filterButtons.forEach(btn=>btn.addEventListener('click',()=>{
  filterButtons.forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  const filter=btn.dataset.filter;
  figures.forEach(fig=>fig.classList.toggle('hidden',filter!=='all' && fig.dataset.cat!==filter));
}));

const lightbox=document.querySelector('.lightbox');
const lbImg=lightbox.querySelector('img');
const lbText=lightbox.querySelector('p');
figures.forEach(fig=>fig.addEventListener('click',()=>{
  const img=fig.querySelector('img');
  lbImg.src=img.src; lbImg.alt=img.alt;
  lbText.textContent=fig.querySelector('figcaption').textContent;
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden','false');
}));
function closeLb(){lightbox.classList.remove('open');lightbox.setAttribute('aria-hidden','true')}
lightbox.querySelector('button').addEventListener('click',closeLb);
lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeLb()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLb()});
