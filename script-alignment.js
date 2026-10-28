// User-supplied 04:40 storyboard. Prototype and demonstration layers are distinct.
const scriptChapters=[
['平台介绍',20,'构建飞行训练AI智能平台','聚焦飞行训练业务场景，依托人工智能与数据技术，我们为中国南方航空打造飞行训练AI智能平台。平台融合大模型、知识图谱与智能数据分析等技术能力，推动飞行训练知识、数据与业务的深度融合，为飞行训练管理提供智能化支撑。'],
['智能知识问答',52,'从提问到知识关联，一步步获取答案','第一步，输入一个飞行训练问题。问答助手检索专业知识库，整理成结构化回答。第二步，查看答案和引用依据。通过引用定位相关手册章节，核对资料来源。第三步，从回答进入知识图谱。沿训练科目、操作规范、机组配合和手册章节逐层探索知识关联。'],
['知识库系统搭建',45,'搭建飞行训练专业知识库','面向飞行训练场景，先将机型手册、训练大纲与课程资料统一接入知识库。平台对文档进行解析和知识提取，再由专家审核加工，最后通过知识检索验证内容召回与来源定位。让分散的训练资料逐步形成可检索、可维护、可追溯的专业知识资产。'],
['AI智能数据分析',45,'从数据统计到智能洞察','数据不仅需要被看见，更需要被理解。依托人工智能分析能力，平台能够围绕飞行训练业务数据，辅助开展多维度统计、趋势研判与问题分析。通过对训练记录和相关指标的综合分析，帮助管理人员识别关键变化，发现需要重点关注的问题。从数据展示到分析洞察，为训练质量评估、训练计划优化与精细化管理提供更加直观的参考依据。'],
['分析小助手',52,'让评语转化为胜任力洞察','分析小助手将训练评语分析整合在同一页面。教员输入评语后，AI 提炼正向表现与待提升项，按胜任力维度呈现；分析结果可手动修改、分别复制或一键复制，最终由教员复核确认。'],
['智能报告生成',40,'从数据到报告，高效完成','在飞行训练管理中，各类统计分析报告是总结训练情况、发现问题和辅助决策的重要依据。平台通过智能报告生成能力，将数据查询、统计分析与内容生成相结合。根据业务需求，自动汇总相关数据，组织分析内容，辅助形成结构化报告草稿。减少重复性的数据整理和文档编制工作，让报告制作更加高效，让业务人员将更多精力投入到专业分析与管理决策中。'],
['AI智能体',35,'从单一功能走向业务协同','随着人工智能技术不断发展，平台的智能化能力也将从单一功能向业务协同持续拓展。围绕飞行训练全流程，通过智能体连接知识、数据与业务工具，逐步形成任务理解、工具调用、分析处理和结果反馈的协同能力。在确保数据安全、业务合规和关键环节人工审核的前提下，推动人工智能更加深入地服务飞行训练业务。'],
['总结展望',20,'AI赋能智慧飞训','从知识智能检索，到数据高效分析。从训练评语分析，到智能报告生成，再到业务智能协同。我们正以人工智能技术为驱动，持续探索飞行训练智能化的新路径。让知识创造价值，让数据赋能决策。AI赋能飞行训练，智启智慧航空新未来。']
];
// Discard the superseded prototype intro pair; opening-context.js builds their current versions later.
document.querySelectorAll('.slide[data-chapter="业务痛点"],.slide[data-chapter="建设目标"]').forEach(s=>s.remove());
// Preserve the source indices assigned before generated scenes were inserted.
const sourceSlides=[...document.querySelectorAll('.slide[data-original]')];
sourceSlides.forEach((s,i)=>s.dataset.original=i);
const knowledgeGraphSlide=document.querySelector('.slide[data-original="4"]');
if(knowledgeGraphSlide){knowledgeGraphSlide.dataset.chapter='智能知识问答';knowledgeGraphSlide.dataset.title='从问答进入知识图谱';}
slides.filter(s=>!s.hasAttribute('data-original')&&!s.dataset.result&&!s.classList.contains('analysis-coach-scene')).forEach(s=>s.remove());
// Keep the coach as the single interactive evaluation chapter.
if(!document.querySelector('.analysis-coach-scene')){
 const coach=document.createElement('section');coach.className='slide analysis-coach-scene';coach.dataset.title='分析小助手，提炼胜任力洞察';coach.dataset.duration='52';coach.dataset.chapter='分析小助手';
 coach.innerHTML=`<div class="coach-layout"><div class="coach-intro"><div class="coach-name">分析小助手</div><h2>让评语转化为<br><span>胜任力洞察</span></h2><p>输入评语，提炼胜任力表现。</p></div><div class="coach-app"><header class="coach-appbar"><div><i>✧</i><span><b>评语分析</b></span></div><span class="coach-connected">演示</span></header><div class="coach-workspace"><div class="coach-input-head"><b>训练评语</b><span class="coach-input-count">0 / 3000 字</span></div><textarea class="coach-input" aria-label="输入训练评语" maxlength="3000" placeholder="输入训练评语后开始分析…">优点：\n【WLM】能够很好的对任务进行有效的规划、优先级分配及时间节点安排，有充足的时间来处置程序。\n不足：\n【PRO】单发后需飘降，应选择绿点速度，而不是选择速度300kt。自动油门接通时机是下降率小于500ft/min。确认所下高度低于单发升限高度，高于飘降高度可恢复正常下降。\n【PSD】高原机场起飞遭遇风切变，飞机能量不足以保持爬升，可以考虑关闭组件以增加爬升性能。</textarea><div class="coach-actions"><span class="coach-status">等待开始分析</span><div class="coach-action-buttons"><button type="button" class="coach-reset">↺　重置</button><button type="button" class="coach-run">✧　AI 分析</button></div></div><div class="coach-result-head"><div><b>AI 分析结果</b><small>可编辑</small></div><button type="button" class="coach-copy-all">▢　复制全部</button></div><div class="coach-empty"><i>✦</i><b>等待 AI 分析</b><small>点击 AI 分析</small></div><div class="coach-results"><article class="coach-positive"><header><b>正向胜任力</b><button type="button" data-copy-side="positive">复制</button></header><div class="coach-result-content" contenteditable="true" role="textbox" aria-label="正向胜任力分析结果"></div></article><article class="coach-negative"><header><b>负向胜任力</b><button type="button" data-copy-side="negative">复制</button></header><div class="coach-result-content" contenteditable="true" role="textbox" aria-label="待提升胜任力分析结果"></div></article><footer>演示结果 · 教员复核</footer></div></div></div></div>`;
 const nextChapter=document.querySelector('.slide[data-chapter="智能报告生成"]');if(nextChapter)nextChapter.before(coach);else document.querySelector('#deck').append(coach);
}
const byOriginal=i=>document.querySelector(`[data-original="${i}"]`);
byOriginal(2).querySelector('.kicker').textContent='01 / 输入问题 · 获取回答';
byOriginal(3).querySelector('.kicker').textContent='02 / 查看依据 · 来源可溯';
byOriginal(4).querySelector('.kicker').textContent='03 / 打开图谱 · 探索关联';
const qaPrompt='B737 进近阶段有哪些稳定进近训练要点？';
const promptNode=byOriginal(2).querySelector('.question-card,.question');if(promptNode)promptNode.textContent=qaPrompt;
const allocations={0:8,1:12,2:23,3:10,4:28,5:21,6:17,7:38,8:33,9:28,10:20};
Object.entries(allocations).forEach(([i,d])=>byOriginal(i).dataset.duration=d);
document.querySelectorAll('.result-scene').forEach(s=>s.dataset.duration='7');
slides.splice(0,slides.length,...document.querySelectorAll('.slide'));
starts=[];total=0;slides.forEach(s=>{starts.push(total);total+=+s.dataset.duration});
const chIndex=s=>Math.max(0,scriptChapters.findIndex(c=>c[0]===s.dataset.chapter));
voices.splice(0,voices.length,...slides.map(s=>{
 const c=scriptChapters[chIndex(s)],group=slides.filter(x=>x.dataset.chapter===s.dataset.chapter),ix=group.indexOf(s),text=c[3],sentences=text.match(/[^。！？]+[。！？]?/g)||[text];
 return sentences.slice(Math.floor(ix*sentences.length/group.length),Math.floor((ix+1)*sentences.length/group.length)).join('');
}));
chapterGroups.splice(0,chapterGroups.length,...scriptChapters.map(c=>{const indices=slides.map((s,i)=>s.dataset.chapter===c[0]?i:-1).filter(i=>i>=0),first=indices[0],last=indices.at(-1);return {name:c[0],first,last,start:starts[first],end:starts[last]+ +slides[last].dataset.duration,duration:c[1]}}));
document.querySelector('.chapter-track').innerHTML=chapterGroups.map((g,i)=>`<button class="chapter-segment" data-segment="${i}" style="flex:${g.duration}" aria-label="${g.name}"><i></i></button>`).join('');
document.querySelector('.chapter-labels').innerHTML=chapterGroups.map((g,i)=>`<button data-chapter="${i}" style="flex:${g.duration}">${g.name}</button>`).join('');
document.querySelectorAll('.chapter-labels [data-chapter]').forEach(b=>b.onclick=()=>seek(chapterGroups[+b.dataset.chapter].start));
document.querySelectorAll('.chapter-track [data-segment]').forEach(b=>b.onclick=e=>{let g=chapterGroups[+b.dataset.segment],r=b.getBoundingClientRect();seek(g.start+(e.clientX-r.left)/r.width*g.duration)});
byOriginal(1).querySelector('.lead').textContent='知识智能化 · 数据可视化 · 业务协同化';
byOriginal(1).querySelector('.capabilities').innerHTML='<span>问答小助手</span><span>知识小管家</span><span>数据小参谋</span><span>分析小助手</span><span>报告小顾问</span>';
const requests={2:'B737 进近阶段有哪些稳定进近训练要点？',3:'请进一步说明相关训练注意事项。',4:'B737进近阶段稳定进近有哪些训练要点？',5:'怎样把南航飞行手册、训练大纲与课程资料统一建成可检索的知识库？',6:'完成资料上传、智能解析和专家审核后，如何验证知识检索结果？',7:'哪些机型的训练完成率相对较低？',8:'生成近三个月B737训练情况分析报告。',9:'分析近期训练情况，找出需要重点关注的问题，并生成分析报告。'};
Object.entries(requests).forEach(([i,t])=>{let s=byOriginal(i),q=s.querySelector('.question-card,.request,.lead');if(q)q.innerHTML='<span class="qa-label">业务需求</span>'+t;});
byOriginal(9).querySelector('.kicker').textContent='07 / AI智能体 · 规划能力演示';
const values={
'智能知识问答':['查询更加便捷、高效、可信','自然语言提问，结构化获取专业知识；多轮追问持续深入，引用来源辅助复核。','减少反复翻找资料','保留知识来源与版本核对'],
'知识图谱':['从查找文档，到探索知识','沿知识点、训练科目、操作规范和教材章节逐层探索，直观看清关联关系。','关联知识集中呈现','专业知识体系持续维护'],
'知识库系统搭建':['让训练资料，成为可用知识','从多源资料上传、语义解析，到专家审核与检索验证，形成专业知识入库流程。','统一分类与维护','审核确认后进入检索'],
'AI智能数据分析':['看见变化，为专业判断提供参考','辅助识别关键波动和关注项，为训练质量评估、计划优化和精细化管理提供依据。','趋势变化更直观','能力画像须以上线能力为准'],

'智能报告生成':['减少重复编制，专注专业分析','复用统计图表与分析内容，形成结构化草稿，由业务人员审核结论和建议。','数据与内容协同整理','人工复核后再正式使用'],
'AI智能体':['连接知识、数据与业务工具','逐步形成任务理解、工具调用、分析处理与结果反馈的协同辅助能力。','规划能力，不代表已交付','数据安全 · 合规 · 人工审核']};
document.querySelectorAll('.result-scene').forEach(s=>{let v=values[s.dataset.chapter];s.querySelector('h2').textContent=v[0];s.querySelector('.result-content').innerHTML=`<div class="result-story"><div class="result-eyebrow">业务价值</div><h3>${s.dataset.chapter}</h3><p>${v[1]}</p></div><div class="result-review"><div><span>效率与体验</span><p>${v[2]}</p></div><div><span>可信与边界</span><p>${v[3]}</p></div></div>`;s.querySelector('.result-source').textContent='预期业务价值，不作实测量化成效承诺；功能状态以实际平台验收为准。';});
// Keep the existing platform effects; the knowledge-base operation walkthrough
// is scoped to its two chapter scenes in knowledge-base-demo.js.
$('gridContent').innerHTML=slides.map((s,i)=>`<button data-slide="${i}"><small>${s.dataset.chapter}${s.dataset.result?' · 业务价值':''}</small><b>${s.dataset.title}</b></button>`).join('');document.querySelectorAll('[data-slide]').forEach(b=>b.onclick=()=>{show(+b.dataset.slide);$('overview').classList.remove('open')});
window.alignedScript=scriptChapters;
show(0);
