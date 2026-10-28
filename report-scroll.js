// Report playback follows the same local scene time as the presentation.
(() => {
 const scene=slides.find(s=>s.classList.contains('training-report-demo'));const frame=scene?.querySelector('iframe');if(!frame)return;
 let active=false,manual=false,lastTime=-1;
 frame.addEventListener('load',()=>{const d=frame.contentDocument;if(!d)return;for(const event of ['wheel','touchstart','pointerdown','keydown'])d.addEventListener(event,e=>{if(e.isTrusted)manual=true;},{passive:true});});
 if(window.reportPrototypeHtml){frame.removeAttribute('src');frame.srcdoc=window.reportPrototypeHtml;}
 const previous=window.presentationEffects;window.presentationEffects=(s,t)=>{previous?.(s,t);const api=frame.contentWindow?.reportReference;if(s!==scene){if(active)api?.close();active=false;lastTime=-1;return;}if(!active||t<lastTime){active=true;manual=false;api?.reset();}lastTime=t;if(playing&&!manual)api?.demoAt(t);};
})();
