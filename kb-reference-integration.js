// Reference-based knowledge library, documents, and chunks. One primary navigation entry.
(() => {
 const scenes=slides.filter(s=>s.querySelector('.kb-mount'));
 const mounted=new Map();
 const style=document.createElement('style');style.textContent='.kb-reference-scene .kb-showcase-intro{display:none!important}.slide.kb-reference-scene .kb-mount{left:20px!important;top:20px!important;width:1560px!important;height:812px!important;border-radius:15px;background:white;box-shadow:none}.kb-reference-frame{width:100%;height:100%;border:0;display:block}';document.head.append(style);
 scenes.forEach((scene,index)=>{
 scene.classList.add('kb-reference-scene');scene.dataset.duration=index===0?'16':'38';scene.dataset.title=index===0?'知识小管家：创建并进入知识库':'知识小管家：上传、解析与切片查看';
 const root=scene.querySelector('.kb-mount');root.innerHTML='';const frame=document.createElement('iframe');frame.className='kb-reference-frame';frame.title='知识小管家 · 知识库与切片管理';root.append(frame);frame.srcdoc=window.kbPrototypeHtml;
 const entry={frame,index,manual:false,active:false,step:0};mounted.set(scene,entry);
 frame.addEventListener('load',()=>{if(index>0)frame.contentWindow.kbReference?.showFiles();const d=frame.contentDocument;d.addEventListener('click',e=>{if(!e.isTrusted)return;entry.manual=true;if(playing){toggle();updateVideo();}});d.addEventListener('input',e=>{if(e.isTrusted)entry.manual=true;});});
 const voice=index===0?'从知识小管家直接进入知识库。打开777机队知识库，查看资料名称、文件大小、解析状态与创建时间。':'在刚创建的知识库中点击上传知识，批量选择文件。下一步配置分段方式、最大长度与重叠大小，确认后等待解析完成。打开已上传文档的详情，左侧核对原文，右侧查看知识切片。';const pos=slides.indexOf(scene);if(pos>=0)voices[pos]=voice;
 });
 const previous=window.presentationEffects;
 window.presentationEffects=(scene,t)=>{previous?.(scene,t);mounted.forEach((entry,s)=>{if(s!==scene){if(entry.active){entry.frame.contentDocument?.querySelectorAll('dialog[open]').forEach(d=>d.close());}entry.active=false;entry.frame.contentWindow.kbReference?.emphasizeStats(false);return}const api=entry.frame.contentWindow.kbReference;if(!api)return;if(!entry.active||t<entry.lastTime){entry.active=true;entry.manual=false;entry.step=-1;api.demoStage(0);if(entry.index>0)api.demoStage(2);}entry.lastTime=t;if(!playing||entry.manual){api.emphasizeStats(false);return;}const stages=entry.index===0?[[0,0],[4,1],[10,2]]:[[0,2],[3,3],[10,4],[19,5],[26,6],[31,7]];for(const [at,stage] of stages){if(t>=at&&entry.step<stage){api.demoStage(stage);entry.step=stage;}}});};
 window.addEventListener('message',e=>{if(e.data?.type!=='qa-navigate'||![...mounted.values()].some(x=>x.frame.contentWindow===e.source))return;const patterns={'智能问答':/智能知识问答/,'智能问数':/AI智能数据分析|数据小参谋/,'飞行训练报告':/智能报告生成/,'胜任力评语分析':/分析小助手|胜任力/};const pattern=patterns[e.data.module];if(!pattern)return;const i=slides.findIndex(s=>pattern.test((s.dataset.chapter||'')+(s.dataset.title||'')));if(i>=0)show(i);});
})();
