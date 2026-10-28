painScene.classList.add('pain-keynote');
const keynotePain=[['训练之后','如何形成<span>持续优化的闭环</span>？','让评估与反馈，真正回到下一次训练'],['数据很多','如何看见<span>真正的价值</span>？','从海量记录中，发现趋势与问题'],['经验之外','能否多一份<span>数据的支撑</span>？','让专业判断，有更充分的依据'],['每个人不同','训练能否<span>更有针对性</span>？','让能力短板，连接个性化学习与训练']];
painScene.innerHTML='<div class="keynote-eyebrow">飞行训练 / 四个关键挑战</div><div class="keynote-counter"><span>01</span> / 04</div><div class="keynote-copy">'+keynotePain.map((p,i)=>`<div class="keynote-beat" data-beat="${i}"><div class="keynote-word">${p[0]}</div><h2>${p[1]}</h2><p>${p[2]}</p></div>`).join('')+'</div><div class="keynote-art" aria-hidden="true"><svg viewBox="0 0 600 600"><defs><linearGradient id="pain-line"><stop stop-color="#ffc402"/><stop offset="1" stop-color="#8beaff"/></linearGradient></defs><circle class="keynote-orbit" cx="300" cy="300" r="205"/><circle class="keynote-orbit orbit-inner" cx="300" cy="300" r="145"/><path class="keynote-network" d="M300 95 505 300 300 505 95 300Z M95 300H505 M300 95V505 M155 155 445 445 M445 155 155 445"/><path class="keynote-trend" d="M95 390 190 350 265 370 350 235 430 260 505 145"/><g class="keynote-nodes">'+Array.from({length:8},(_,i)=>{const a=i*Math.PI/4;return `<circle cx="${300+205*Math.cos(a)}" cy="${300+205*Math.sin(a)}" r="${i%2?7:12}"/>`}).join('')+'</g><circle class="keynote-core" cx="300" cy="300" r="64"/><text class="keynote-symbol" x="300" y="316" text-anchor="middle">↻</text></svg></div><div class="keynote-ribbon">'+keynotePain.map((p,i)=>`<span data-ribbon="${i}"><i></i>${p[0]}</span>`).join('')+'</div><div class="keynote-resolution"><small>让 AI 连接知识、数据与业务</small><strong>从发现问题，到持续改进</strong></div><div class="keynote-source">依据提供的业务痛点材料 · 建设方向不等同于已实现成效</div>';
let keynoteCurrent=-1;
const keynoteEffects=window.presentationEffects;
window.presentationEffects=(s,t)=>{
 keynoteEffects?.(s,t);
 if(s!==painScene)return;
 const phase=Math.min(3,Math.floor(t/5));
 const summary=t>=20;
 if(keynoteCurrent!==phase){keynoteCurrent=phase;s.dataset.phase=phase;s.querySelector('.keynote-counter span').textContent=String(phase+1).padStart(2,'0');s.querySelector('.keynote-symbol').textContent=['↻','↗','⇄','◎'][phase];}
 s.querySelectorAll('.keynote-beat').forEach((e,i)=>e.classList.toggle('on',i===phase&&!summary));
 s.querySelectorAll('[data-ribbon]').forEach((e,i)=>e.classList.toggle('passed',i<=phase));
 s.classList.toggle('keynote-summary',summary);
};
const keynoteSceneElements=sceneElements;
sceneElements=function(s){return s===painScene?[...s.querySelectorAll('.keynote-eyebrow,.keynote-counter,.keynote-copy,.keynote-art,.keynote-ribbon,.keynote-resolution')]:keynoteSceneElements(s)};
const painMG=document.createElement('div');painMG.className='pain-mg';painMG.setAttribute('aria-hidden','true');
painMG.innerHTML='<svg viewBox="0 0 800 160"><g class="mg-motif mg-loop"><path d="M325 80a75 55 0 1 1 150 0a75 55 0 1 1-150 0"/><path d="m468 62 7 18 17-12"/><circle cx="325" cy="80" r="5"/></g><g class="mg-motif mg-data"><path d="M225 115 310 86 370 98 455 40 570 25"/><circle cx="225" cy="115" r="5"/><circle cx="310" cy="86" r="5"/><circle cx="370" cy="98" r="5"/><circle cx="455" cy="40" r="5"/><circle cx="570" cy="25" r="5"/></g><g class="mg-motif mg-support"><path d="M260 120H540M320 120V75M400 120V45M480 120V65M270 60 395 25 530 50"/><circle cx="395" cy="25" r="6"/></g><g class="mg-motif mg-branches"><path d="M400 130V85M400 85 265 35M400 85V20M400 85 535 35"/><circle cx="265" cy="35" r="11"/><circle cx="400" cy="20" r="11"/><circle cx="535" cy="35" r="11"/></g></svg><div class="mg-pulses"><i></i><i></i><i></i></div>';
painScene.appendChild(painMG);
painScene.dataset.duration='24';
starts=[];total=0;slides.forEach(s=>{starts.push(total);total+=+s.dataset.duration});
chapterGroups.forEach((g,i)=>{g.start=starts[g.first];g.end=starts[g.last]+ +slides[g.last].dataset.duration;g.duration=g.end-g.start;document.querySelector(`[data-segment="${i}"]`).style.flex=g.duration;document.querySelector(`[data-chapter="${i}"]`).style.flex=g.duration});
