// Source: user-provided “存在的痛点与目标” image. Goals are not delivery claims.
const painPoints=[
 ['闭环管理缺失','训练效果评估与优化，缺少数据驱动的闭环支撑。','评估 → 反馈 → 优化',4],
 ['深度挖掘不足','海量数据价值提取能力弱，趋势性分析支撑不足。','数据 → 趋势 → 洞察',2],
 ['模式转型迫切','教检方式需要从经验驱动向数据驱动转变。','经验判断 + 数据依据',3],
 ['个性化能力弱','个人训练针对性不足，缺少自学推荐及能力分析体系。','能力短板 → 针对性训练',0]
];
const painScene=document.createElement('section');
painScene.className='slide context-opening';painScene.dataset.title='飞行训练，哪些环节需要进一步提升？';painScene.dataset.chapter='平台介绍';painScene.dataset.duration='12';
painScene.innerHTML=`<div class="kicker">业务痛点 / WHY AI</div><h2>从业务痛点出发<br>让训练管理<span class="yellow">更进一步</span></h2><div class="context-pain-grid">${painPoints.map((p,i)=>`<article class="context-reveal pain-tile" data-reveal="${i*1.7}"><div class="context-icon">${featureSvg(p[3])}</div><small>0${i+1}</small><h3>${p[0]}</h3><p>${p[1]}</p><div class="pain-route">${p[2]}</div></article>`).join('')}</div><div class="context-bottom context-reveal" data-reveal="8"><span>核心问题</span>如何让知识、数据与训练业务形成持续优化的闭环？</div><p class="context-source">痛点与建设方向依据用户提供的汇报页；不作独立现状审计结论。</p>`;
const goalScene=document.createElement('section');
goalScene.className='slide context-opening goal-opening';goalScene.dataset.title='AI连接知识与数据，支撑精准训练';goalScene.dataset.chapter='平台介绍';goalScene.dataset.duration='12';
goalScene.innerHTML=`<div class="kicker">AI 建设目标 / FROM PAIN TO VALUE</div><h2>连接<span class="yellow">知识与数据</span><br>支撑精准训练与专业判断</h2><div class="goal-connection"><div class="goal-rail"></div><span class="goal-ai">AI</span></div><div class="context-goal-grid"><article class="context-reveal goal-tile" data-reveal=".5"><div class="goal-heading"><div class="context-icon">${featureSvg(1)}</div><h3>知识图谱与辅助训练</h3></div><div class="goal-details"><p><b>知识库体系</b>机型知识库与理论课程训练知识图谱</p><p><b>智慧赋能</b>快速知识检索与 AI 问答辅助训练</p><p><b>精准推荐</b>个性化训练建议、课程与自学资源推荐</p><p><b>教员辅助</b>基于数据图谱，辅助针对性指导训练</p></div></article><article class="context-reveal goal-tile" data-reveal="2"><div class="goal-heading"><div class="context-icon">${featureSvg(2)}</div><h3>交互式数据洞察体系</h3></div><div class="goal-details"><p><b>交互变革</b>固定报告转向交互式分析界面</p><p><b>自然语言问数</b>优化语义转查询，随问随数</p><p><b>自动化报表</b>动态组织报告，丰富风险标签维度</p><p><b>多域数据接入</b>扩充个人胜任力标签，提升分析全面性</p></div></article></div><div class="context-value-row">${[['简化分析过程','高效掌握飞行员能力',2],['减轻专家负担','支持专业判断与效率提升',0],['激励自我发展','个性化建议驱动自学',3],['全面精准支持','服务训练质量与安全',4]].map((v,i)=>`<div class="context-reveal" data-reveal="${5+i*.65}">${featureSvg(v[2])}<div><b>${v[0]}</b><small>${v[1]}</small></div></div>`).join('')}</div><p class="context-source">建设目标与预期价值 · 个性化推荐、胜任力画像及风险标签等能力，以上线验收为准。</p>`;
byOriginal(0).after(painScene,goalScene);
byOriginal(1).dataset.duration='4';
const oldVoice=new Map(slides.map((s,i)=>[s,voices[i]]));
oldVoice.set(painScene,'飞行训练管理面临闭环管理、数据挖掘、模式转型与个性化训练等提升需求。');
oldVoice.set(goalScene,'通过知识图谱与辅助训练、交互式数据洞察体系，连接知识、数据与业务，支撑精准训练和专业判断。');
slides.splice(0,slides.length,...document.querySelectorAll('.slide'));
voices.splice(0,voices.length,...slides.map(s=>oldVoice.get(s)||s.dataset.title));
starts=[];total=0;slides.forEach(s=>{starts.push(total);total+=+s.dataset.duration});
chapterGroups.forEach((g,i)=>{const indices=slides.map((s,j)=>s.dataset.chapter===g.name?j:-1).filter(j=>j>=0);g.first=indices[0];g.last=indices.at(-1);g.start=starts[g.first];g.end=starts[g.last]+ +slides[g.last].dataset.duration;g.duration=g.end-g.start;document.querySelector(`[data-segment="${i}"]`).style.flex=g.duration;document.querySelector(`[data-chapter="${i}"]`).style.flex=g.duration});
$('gridContent').innerHTML=slides.map((s,i)=>`<button data-slide="${i}"><small>${s.dataset.chapter}</small><b>${s.dataset.title}</b></button>`).join('');document.querySelectorAll('[data-slide]').forEach(b=>b.onclick=()=>{show(+b.dataset.slide);$('overview').classList.remove('open')});
const contextEffects=window.presentationEffects;
window.presentationEffects=(s,t)=>{contextEffects?.(s,t);s.querySelectorAll('.context-reveal').forEach(e=>e.classList.toggle('context-visible',t>=+e.dataset.reveal));if(s===goalScene)s.style.setProperty('--connection-progress',Math.min(1,t/4));};
const contextSceneElements=sceneElements;
sceneElements=function(s){if(s.classList.contains('context-opening'))return [...s.querySelectorAll('.kicker,h2,.context-pain-grid,.context-goal-grid,.context-value-row,.context-bottom,.context-source,.goal-connection')];return contextSceneElements(s)};
show(0);
