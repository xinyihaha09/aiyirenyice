// Stable canvas: individual content elements leave and enter on staggered paths.
let sceneTravel=[];
let travelRevision=0;
function sceneElements(scene){
 const selector='h1,h2,.kicker,.lead,.question-card,.answer-card,.aside-value,.capabilities>span,.end-modules>span,.real-prototype,.report,.data-panel,.analysis-columns,.giant,.flow-item,.request,.flow-note,.quote,.result-story,.result-review>div,.result-source,.aircraft,.line,.miniline';
 const candidates=[...scene.querySelectorAll(selector)].filter(e=>!e.closest('.real-prototype')||e.classList.contains('real-prototype'));
 return candidates.filter(e=>!candidates.some(parent=>parent!==e&&parent.contains(e)));
}
// Semantic, repeatable directions rather than random movement on every click.
function elementMotion(el,scene,direction,sameModule){
 const media=el.matches('.real-prototype,.report,.data-panel,.analysis-columns,.giant,.aircraft');
 const card=el.matches('.capabilities>span,.result-story,.result-review>div,.flow-item');
 if(media)return {x:sameModule?0:36*direction,y:12,scale:sameModule?1:.982};
 if(scene.dataset.result)return {x:card?12*direction:0,y:card?42:22,scale:1};
 const axes=[{x:0,y:32},{x:48*direction,y:0},{x:0,y:-30},{x:-44*direction,y:12}];
 const axis=axes[chIndex(scene)%axes.length];
 return {...axis,scale:1};
}
const trajectoryBaseShow=show;
show=function(i){
 const before=slides[current],beforeIndex=current;
 const revision=++travelRevision;
 sceneTravel.forEach(a=>a.cancel());sceneTravel=[];
 slides.forEach(s=>s.classList.remove('in-transit'));
 trajectoryBaseShow(i);
 const incoming=slides[current];
 if(before===incoming||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 const direction=current>beforeIndex?1:-1;
 const sameModule=before.dataset.chapter===incoming.dataset.chapter;
 before.classList.add('in-transit');
 const leaving=sceneElements(before),arriving=sceneElements(incoming);
 // Immersive prototypes are excluded from entry motion so their expansion stays
 // timeline-driven; they must still exit before the next scene appears.
 const immersiveExit=before.classList.contains('immersive-demo');
 if(immersiveExit){
  [before.querySelector('.real-prototype'),before.querySelector('.operation-badge')].filter(Boolean).forEach(el=>{if(!leaving.includes(el))leaving.push(el)});
 }
 const outgoingAnimations=[];
 leaving.forEach((el,n)=>{
  const resting=getComputedStyle(el).transform==='none'?'translate3d(0,0,0)':getComputedStyle(el).transform;
  const motion=elementMotion(el,before,direction,sameModule);
  const opacity=getComputedStyle(el).opacity;
  const exit=el.animate([
   {transform:resting,opacity},
   {transform:`translate3d(${-motion.x*.6}px,${-motion.y*.6}px,0) scale(.995) ${resting}`,opacity:0}
  ],{duration:immersiveExit?280:340,delay:immersiveExit?0:Math.min(n*22,110),easing:'cubic-bezier(.4,0,1,1)',fill:'both'});
  sceneTravel.push(exit);outgoingAnimations.push(exit);
 });
 arriving.forEach((el,n)=>{
  const resting=getComputedStyle(el).transform==='none'?'translate3d(0,0,0)':getComputedStyle(el).transform;
  const motion=elementMotion(el,incoming,direction,sameModule);
  const opacity=getComputedStyle(el).opacity;
  sceneTravel.push(el.animate([
   {transform:`translate3d(${motion.x}px,${motion.y}px,0) scale(${motion.scale}) ${resting}`,opacity:0},
   {transform:resting,opacity}
  ],{duration:el.matches('.real-prototype,.report')?850:720,delay:(immersiveExit?310:170)+Math.min(n*48,240),easing:'cubic-bezier(.22,1,.36,1)',fill:'both'}));
 });
 if(immersiveExit){
  // The incoming prototype is not in arriving; gate its visibility as well.
  const nextSurface=incoming.querySelector('.real-prototype');
  if(nextSurface)sceneTravel.push(nextSurface.animate([{opacity:0},{opacity:0}],{duration:300,fill:'none'}));
 }
 Promise.all(outgoingAnimations.map(a=>a.finished)).then(()=>{
  if(revision===travelRevision)before.classList.remove('in-transit');
 }).catch(()=>{});
 Promise.all(sceneTravel.map(a=>a.finished)).then(()=>{
  if(revision!==travelRevision)return;
  before.classList.remove('in-transit');
  sceneTravel.forEach(a=>a.cancel());sceneTravel=[];
 }).catch(()=>{});
};
const moduleDescriptions=['自然语言提问，依据可追溯','关联科目、规范与知识章节','资料上传、解析与审核入库','识别趋势，辅助专业判断','汇总分析，形成报告草稿'];
byOriginal(1).querySelectorAll('.capabilities span').forEach((card,i)=>{card.dataset.number=String(i+1).padStart(2,'0');card.style.setProperty('--card-index',i);const detail=document.createElement('small');detail.textContent=moduleDescriptions[i];card.appendChild(detail)});
