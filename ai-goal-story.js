// Simplified fixed pose: both arms hang from the shoulders; no independent limbs.
const pilotBody=captainDrawing.querySelector('.captain-person');
pilotBody.querySelectorAll('.pilot-thinking-hand,.pilot-relaxed-hand').forEach(e=>e.remove());
[...pilotBody.children].filter(e=>['M205 408','M243 474','m250 481'].some(prefix=>(e.getAttribute('d')||'').startsWith(prefix))).forEach(e=>e.remove());
pilotBody.insertAdjacentHTML('afterbegin',`<g class="pilot-neutral-arms"><path d="M191 346Q169 349 158 381Q148 428 143 486L169 491Q179 435 189 409L214 373Z" fill="url(#pilot-jacket)"/><path d="M144 483l25 4-3 21q-3 16-14 14-13-1-12-15Z" fill="url(#pilot-face)"/><path d="M144 482l26 3-2 14-26-3Z" fill="#f7faff" stroke="#cbd9e9" stroke-width="1"/><path d="M378 347Q403 355 411 389Q421 439 424 487L398 491Q391 441 378 409L356 373Z" fill="url(#pilot-jacket)"/><path d="M399 484l25-2 3 26q1 15-11 15-12 1-14-14Z" fill="url(#pilot-face)"/><path d="m397 485 28-3 1 14-27 3Z" fill="#f7faff" stroke="#cbd9e9" stroke-width="1"/></g>`);
pilotBody.insertAdjacentHTML('beforeend','<g class="pilot-fixed-epaulette"><path d="m351 351 29 14-11 24-29-14z" fill="#263956"/><path d="m345 370 27 12m-24-20 27 12m-24-20 27 12m-24-20 27 12" stroke="url(#pilot-gold)" stroke-width="4"/></g>');
painScene.querySelector('.captain-story-heading h2').textContent='这些困扰，是否也曾出现在训练中？';
painScene.querySelectorAll('.captain-ai-intro,.captain-solutions,.captain-connect,.captain-ending').forEach(e=>e.remove());
// 中间列与现有章节名一一对应，行序按用户要求：知识问答·图谱 → 数据分析 → 胜任力评估 → 报告生成。
// 末位数字为 featureSvg 图标编号，跟随能力而非行位置。
const goalMappings=[
 ['依赖经验，数据支撑不足','模式转型','智能知识问答','关联专业知识与训练信息，为教检判断提供依据。','让专业经验得到知识与数据支撑',1],
 ['数据很多，难以发现价值','深度挖掘','AI 智能数据分析','自然语言查询训练数据，辅助识别趋势和关注项。','从海量记录走向业务洞察',2],
 ['短板不同，训练缺少针对性','胜任力评估','胜任力评估分析','结构化输出教员胜任力评估结果，定位个人能力短板。','让训练安排有据可依',3],
 ['训练之后，缺少优化闭环','闭环管理','智能报告生成','汇集训练分析与建议，支撑评估、反馈与改进。','形成可复核、可追踪的改进依据',4]
];
goalScene.classList.add('ai-mapping-scene');
goalScene.innerHTML=`<div class="mapping-stage"><div class="kicker">AI 建设目标 / 从困扰到解决方向</div><h2>每一个困扰<br>都有<span class="yellow">对应的解决方向</span></h2><div class="mapping-labels"><span>机长的困扰</span><span>接入 AI 能力</span><span>解决方法与预期价值</span></div><div class="mapping-rows">${goalMappings.map((m,i)=>`<article class="mapping-row" data-map="${i}"><div class="mapping-pain"><small>0${i+1} / ${m[1]}</small><p>${m[0]}</p></div><div class="mapping-bridge"><i></i><b>→</b></div><div class="mapping-tool"><div>${featureSvg(m[5])}</div><p>${m[2]}</p></div><div class="mapping-bridge"><i></i><b>→</b></div><div class="mapping-solution"><p>${m[3]}</p><small>${m[4]}</small></div></article>`).join('')}</div><div class="mapping-boundary">AI 辅助，不替代专业判断 · 胜任力评估与业务闭环为建设方向，以上线验收为准。</div></div>`;
const goalStoryEffects=window.presentationEffects;
window.presentationEffects=(s,t)=>{
 if(s===painScene){s.dataset.storyMode='questions';s.querySelectorAll('[data-thought]').forEach((e,i)=>e.classList.toggle('on',i===Math.min(3,Math.floor(local/(Number(s.dataset.duration)/4)))));return;}
 if(s===goalScene){s.querySelectorAll('.mapping-row').forEach(row=>{row.classList.add('pain-ready','tool-ready','solution-ready')});return;}
 goalStoryEffects?.(s,t);
};
const mappingElements=sceneElements;
// 整块作为一个元素入场：把内部各部分包进 .mapping-stage，避免标题/标签/表格/脚注逐个错峰。
sceneElements=function(s){return s===goalScene?[s.querySelector('.mapping-stage')].filter(Boolean):mappingElements(s)};
painScene.dataset.duration='20';goalScene.dataset.duration='22';
voices[slides.indexOf(painScene)]='训练之后，如何形成优化闭环？数据很多，如何发现价值？经验之外，如何获得数据支撑？每个人不同，训练如何更有针对性？';
voices[slides.indexOf(goalScene)]='将困扰与AI建设目标一一对应：通过智能知识问答辅助专业判断，通过智能数据分析挖掘数据价值，通过胜任力评估分析定位能力短板，通过智能报告生成支撑反馈闭环。';
starts=[];total=0;slides.forEach(s=>{starts.push(total);total+=+s.dataset.duration});
chapterGroups.forEach((g,i)=>{g.start=starts[g.first];g.end=starts[g.last]+ +slides[g.last].dataset.duration;g.duration=g.end-g.start;document.querySelector(`[data-segment="${i}"]`).style.flex=g.duration;document.querySelector(`[data-chapter="${i}"]`).style.flex=g.duration});

[painScene,goalScene].forEach(scene => scene.querySelectorAll('.captain-thought,.mapping-row').forEach((row,index) => row.style.setProperty('--row-delay', `${.15+index*.18}s`)));
