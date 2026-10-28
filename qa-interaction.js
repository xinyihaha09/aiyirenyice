// Interactive HTML prototype built from the supplied QA reference screens.
(() => {
 const scene=slides.find(s=>s.classList.contains('qa-scene'));
 const panel=scene?.querySelector('#qaApp'),frame=panel?.querySelector('iframe');if(!frame)return;
 let manual=false,active=false;
 frame.removeAttribute('src');frame.srcdoc=window.qaPrototypeHtml;
 frame.addEventListener('load',()=>{
 const d=frame.contentDocument;if(!d)return;if(active)frame.contentWindow.qaReference?.runDemo();
 d.addEventListener('input',()=>manual=true);
 d.addEventListener('click',()=>{manual=true;if(playing){toggle();updateVideo();}});
 });
 window.addEventListener('message',e=>{if(e.source!==frame.contentWindow||e.data?.type!=='qa-navigate')return;
 const patterns={'智能问数':/智能问数|数据小参谋/,'飞行训练报告':/报告/,'胜任力评语分析':/胜任力|评语/,'知识管理':/知识库/,'知识小管家':/知识库/};
 const pattern=patterns[e.data.module];if(!pattern)return;const index=slides.findIndex(s=>s!==scene&&pattern.test((s.dataset.title||'')+(s.dataset.chapter||'')));if(index>=0)show(index);
 });
 const previous=window.presentationEffects;
 window.presentationEffects=(s,t)=>{
 previous?.(s,t);if(s!==scene){if(active)frame.contentWindow.qaReference?.reset();active=false;return;}
 if(!active&&playing){active=true;manual=false;frame.contentWindow.qaReference?.runDemo();}
 scene.classList.toggle('intro-dismissed',local>=3);panel.classList.remove('focus-prototype');

 };
})();
