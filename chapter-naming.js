// Friendly chapter roles map consistently to the formal product functions.
(() => {
 const definitions=[
 {key:'智能知识问答',role:'问答小助手',formal:'智能问答',holder:'.split > div:first-child',voice:'问答小助手，通过智能问答，帮助用户查找飞行训练知识。选择知识检索并输入问题，系统检索相关手册，整理回答与引用依据。查看回复后，可以核对资料来源，继续探索相关知识。'},
 {key:'知识库系统搭建',role:'知识小管家',formal:'知识管理',holder:'.kb-showcase-intro',voice:'知识小管家，知识入库，可管可查。进入知识管理下的知识库管理，创建机队专属知识库，设置可见范围、管理部门和描述。创建完成后，进入该知识库，准备上传资料。'},
 {key:'AI智能数据分析',role:'数据小参谋',formal:'智能问数',holder:'.data-query-intro',voice:'数据小参谋，通过智能问数，帮助业务人员直接查询训练数据。输入问题后，系统进行意图识别，自动匹配数据源。查询完成后，以表格呈现结果，并支持查看查询语句和导出数据。'},
 {key:'分析小助手',role:'分析小助手',formal:'胜任力评语分析',holder:'.coach-intro',voice:'分析小助手，通过胜任力评语分析，辅助教员整理训练表现。输入训练评语，开始分析，分别查看正向表现与待提升项。结果可以编辑和复制，由教员复核确认。'},
 {key:'智能报告生成',role:'报告小顾问',formal:'飞行训练报告',holder:'.training-report-intro',voice:'报告小顾问，通过飞行训练报告，帮助业务人员汇总训练分析。查看报告中的统计结果、能力表现与改进建议，结合业务实际审核报告内容。'}
 ];
 definitions.forEach(def=>{
 const chapter=slides.filter(s=>s.dataset.chapter===def.key);const first=chapter[0];if(!first)return;
 const holder=first.querySelector(def.holder);if(holder){
 holder.querySelectorAll('.chapter-hero-name,.coach-name,.qa-unified-eyebrow').forEach(el=>el.remove());
 const names=document.createElement('div');names.className='chapter-name-pair';names.innerHTML=`<div class="chapter-role-name">${def.role}</div>`;holder.prepend(names);
 }
 const i=slides.indexOf(first);voices[i]=def.voice;
 const script=window.alignedScript?.find(c=>c[0]===def.key);if(script)script[3]=def.voice;
 if(def.key==='知识库系统搭建'){
 first.classList.add('naming-library-intro');
 const description=holder?.querySelector('.kb-showcase-desc');if(description)description.innerHTML='<p>从文档入库、知识解析到权限管控，<br>让业务知识沉淀有序、检索有据、复用高效。</p>';
 }
 if(def.key==='分析小助手')first.querySelector('.coach-appbar b')?.replaceChildren(document.createTextNode(def.formal));
 });
 const css=document.createElement('style');css.textContent=`.chapter-name-pair{margin-bottom:22px;color:white}.chapter-name-pair .chapter-role-name{font-size:24px;font-weight:600;line-height:1.4;letter-spacing:1px;color:#ffffff}.chapter-name-pair .chapter-formal-name{font-size:16px;font-weight:400;line-height:1.5;letter-spacing:2px;color:#ffffffb8;margin-top:5px}.coach-intro .chapter-name-pair{margin-top:0}.slide.kb-reference-scene.naming-library-intro .kb-showcase-intro{display:block!important;opacity:1;translate:0 0;top:170px}.slide.kb-reference-scene.naming-library-intro .kb-showcase-icon{display:none}.slide.kb-reference-scene.naming-library-intro .kb-showcase-intro h2{font-size:53px}.slide.kb-reference-scene.naming-library-intro .kb-showcase-desc{margin-top:25px}.slide.kb-reference-scene.naming-library-intro .kb-showcase-desc p{font-size:19px;color:#ffffffb8;line-height:1.9}.slide.kb-reference-scene.naming-library-intro:not(.naming-expanded) .kb-mount{left:560px!important;top:170px!important;width:975px!important;height:508px!important}.naming-library-intro .kb-reference-frame{width:1560px;height:812px;transform:scale(.625);transform-origin:top left;transition:transform 1.25s cubic-bezier(.22,1,.36,1)}.naming-library-intro.naming-expanded .kb-reference-frame{transform:scale(1)}.slide.kb-reference-scene.naming-library-intro.naming-expanded .kb-showcase-intro{opacity:0;translate:-40px 0}.naming-library-intro .kb-mount{transition:left 1.25s cubic-bezier(.22,1,.36,1),top 1.25s cubic-bezier(.22,1,.36,1),width 1.25s cubic-bezier(.22,1,.36,1),height 1.25s cubic-bezier(.22,1,.36,1)}@media(prefers-reduced-motion:reduce){.naming-library-intro .kb-reference-frame,.naming-library-intro .kb-mount{transition:none}}`;document.head.append(css);
 const previous=window.presentationEffects;window.presentationEffects=(scene,t)=>{previous?.(scene,t);if(scene.classList.contains('naming-library-intro')){scene.classList.toggle('naming-expanded',t>=3);const caption=document.getElementById('caption');if(caption)caption.textContent=t<4?'知识小管家，知识入库，可管可查。':t<10?'创建机队专属知识库，设置可见范围与管理部门。':'创建完成，进入该知识库，准备上传资料。';}};
})();
