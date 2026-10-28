// Full-screen, interactive knowledge-base walkthrough. All mutations stay inside
// this chapter's two demo scenes; the rest of the presentation is untouched.
const kbSceneOne = document.querySelector('.slide[data-original="5"]');
const kbSceneTwo = document.querySelector('.slide[data-original="6"]');
const kbChapter = window.alignedScript?.[3];

if (kbSceneOne && kbSceneTwo) {
  const narration = [
    '先创建南航机型训练知识库，设置知识库名称与适用范围。随后打开知识库工作台，准备接入飞行手册、训练大纲与课程资料。',
    '在知识库工作台中，依次添加训练资料、启动智能解析、审核抽取内容，再输入业务问题检索并核对原文来源。'
  ];
  kbSceneOne.dataset.title = '南航机型训练知识库';
  kbSceneTwo.dataset.title = '上传、审核并验证训练知识';
  const chapterIntro = document.createElement('div');
  chapterIntro.className = 'kb-showcase-intro';
  chapterIntro.innerHTML = '<small>知识管理 / 知识库搭建</small><div class="kb-showcase-icon"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M7 4.5h12l6 6V28H7zM19 5v6h6M11 16h10M11 20h10M11 24h7"/></svg></div><h2>从分散资料<br>到专业知识库</h2><div class="kb-showcase-desc"><span>章节演示</span><p>整合南航飞行手册、训练大纲与课程资料，完成创建、解析、审核与检索。</p></div>';
  kbSceneOne.insertBefore(chapterIntro, kbSceneOne.querySelector('.kb-mount'));
  kbSceneOne.querySelector('.kb-mount').innerHTML = '';
  kbSceneTwo.querySelector('.kb-mount').innerHTML = '';
  [kbSceneOne, kbSceneTwo].forEach(scene => {
    scene.classList.remove('immersive-demo', 'intro-dismissed', 'kb-app-expanded');
    scene.querySelectorAll('.video-brand,.operation-badge').forEach(element => element.remove());
  });
  if (kbChapter) {
    kbChapter[0] = '知识库系统搭建';
    kbChapter[1] = 45;
    kbChapter[2] = '搭建飞行训练专业知识库';
    kbChapter[3] = narration.join('');
  }
  voices[slides.indexOf(kbSceneOne)] = narration[0];
  voices[slides.indexOf(kbSceneTwo)] = narration[1];
  const kbGroup = chapterGroups.find(group => group.name === '知识库系统搭建') || chapterGroups[3];
  if (kbGroup) kbGroup.name = '知识库系统搭建';
  const chapterDisplayNames = {
    '平台介绍': '平台介绍',
    '智能知识问答': '问答小助手',
    '知识库系统搭建': '知识小管家',
    'AI智能数据分析': '数据小参谋',
    '分析小助手': '分析小助手',
    '智能报告生成': '报告小顾问',
    '总结展望': '智慧飞训新体验'
  };
  chapterGroups.forEach((group, index) => {
    group.chapterKey = group.name;
    group.name = chapterDisplayNames[group.name] || group.name;
    const label = document.querySelector(`.chapter-labels [data-chapter="${index}"]`);
    if (label) label.textContent = group.name;
    const segment = document.querySelector(`.chapter-track [data-segment="${index}"]`);
    if (segment) segment.setAttribute('aria-label', `${group.name}播放进度`);
  });

  const state = {
    libraryCreated: false,
    formOpen: false,
    detailOpen: false,
    libraryName: '南航机型训练知识库',
    libraryDescription: '飞行手册、训练大纲与课程资料的统一知识底座',
    activeTab: 'documents',
    docsAdded: false,
    parsing: false,
    parsed: false,
    reviewed: false,
    searched: false,
    query: 'B737 进近阶段训练关注点'
  };

  const navIcon = (path) => `<svg viewBox="0 0 24 24" aria-hidden="true">${path}</svg>`;
  const appShell = (content, active = 'knowledge') => `
    <div class="kb-console">
      <aside class="kb-sidebar">
        <div class="kb-brand"><img src="logo.png" alt="中国南方航空"></div>
        <button class="kb-nav"><i>${navIcon('<path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 8 8 0 0 1-3.2-.7L4 20l1.4-3.7A7.3 7.3 0 0 1 4 12c0-4.1 3.6-7.5 8-7.5s8 3.1 8 7z"/><path d="M8 11h8M8 14h5"/>')}</i> 智能问答</button>
        <button class="kb-nav"><i>${navIcon('<rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/>')}</i> 智能体管理</button>
        <button class="kb-nav active"><i>${navIcon('<path d="M6 4h4l5 16h-4zM14 4h4l3 16h-4z"/>')}</i> 知识管理 <span>${navIcon('<path d="m7 10 5 5 5-5"/>')}</span></button>
        <button class="kb-nav"><i>${navIcon('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.8 3.1-.2-.1a1.7 1.7 0 0 0-1.8.1l-.2.1h-3.6l-.1-.2a1.7 1.7 0 0 0-1.6-1h-.2l-.2.1-1.8-3.1.1-.2a1.7 1.7 0 0 0-.3-1.8l-.2-.2v-3.6l.2-.1a1.7 1.7 0 0 0 .3-1.8l-.1-.2 1.8-3.1.2.1a1.7 1.7 0 0 0 1.8-.1l.2-.1h3.6l.1.2a1.7 1.7 0 0 0 1.8.3l.2-.1 1.8 3.1-.1.2a1.7 1.7 0 0 0 .3 1.8l.2.2v3.6z"/>')}</i> 系统管理</button>
        <button class="kb-nav"><i>${navIcon('<path d="M12 3 20 6v5c0 5-3.4 8.4-8 10-4.6-1.6-8-5-8-10V6z"/><path d="m8.5 12 2.3 2.3 4.8-5"/>')}</i> 系统监控</button>
      </aside>
      <main class="kb-main">
        <header class="kb-topbar"><div class="kb-topbar-title"><button class="kb-menu" aria-label="导航菜单">${navIcon('<path d="M4 7h16M4 12h16M4 17h16"/>')}</button><span>知识管理</span></div><div class="kb-user"><button class="kb-search-icon" aria-label="搜索">${navIcon('<circle cx="10.8" cy="10.8" r="6.3"/><path d="m16 16 4.5 4.5"/>')}</button><i>${navIcon('<circle cx="12" cy="8" r="3.2"/><path d="M5.5 20c.5-3.2 2.8-5 6.5-5s6 1.8 6.5 5"/>')}</i><span>李平</span><b>${navIcon('<path d="m7 10 5 5 5-5"/>')}</b></div></header>
        <section class="kb-content">${content}</section>
        <footer class="kb-app-footer">© 2026 智能体平台 · 南航飞行训练演示环境 · 所有数字均为样例</footer>
      </main>
    </div>`;

  const libraryCards = () => `
    <div class="kb-library-grid">
      ${state.libraryCreated ? `<article class="kb-library-card kb-new-library"><header><span class="kb-book-icon">▤</span><span class="kb-category">机型</span></header><h3>${state.libraryName}</h3><p>${state.libraryDescription}</p><footer><span>0 篇文档</span><span>刚刚创建</span><button data-kb-action="open-library">管理 <b>›</b></button></footer></article>` : ''}
      <article class="kb-library-card"><header><span class="kb-book-icon">▤</span><span class="kb-category">机型</span></header><h3>B737 训练参考库</h3><p>训练手册、检查单与课程资料</p><footer><span>128 篇文档</span><span>持续维护</span><button>管理 <b>›</b></button></footer></article>
      <article class="kb-library-card"><header><span class="kb-book-icon">▤</span><span class="kb-category">训练</span></header><h3>飞行训练大纲库</h3><p>训练大纲、标准规范与训练科目</p><footer><span>56 篇文档</span><span>持续维护</span><button>管理 <b>›</b></button></footer></article>
      <article class="kb-library-card"><header><span class="kb-book-icon">▤</span><span class="kb-category">课程</span></header><h3>课程与教材资料库</h3><p>理论课程、教学文件与学习资料</p><footer><span>32 篇文档</span><span>持续维护</span><button>管理 <b>›</b></button></footer></article>
    </div>`;

  const renderLibrary = () => {
    const form = state.formOpen ? `<form class="kb-create-form" data-kb-form><div class="kb-form-heading"><b>新建知识库</b><span>设置知识库基础信息</span></div><label>知识库名称<input name="name" value="${state.libraryName}" placeholder="例如：B737 机型训练知识库"></label><label>知识库简介<input name="description" value="${state.libraryDescription}" placeholder="说明适用范围与资料类型"></label><button class="kb-primary" type="submit">创建知识库</button></form>` : '';
    const empty = !state.libraryCreated ? `<div class="kb-library-empty"><span>▤</span><p>选择“新建知识库”，开始整理南航飞行训练资料</p></div>` : '';
    return appShell(`<div class="kb-page-heading"><div><div class="kb-eyebrow">知识资产管理</div><h1>知识库</h1><p>为飞行训练知识资料建立统一、可维护的存储与检索空间。</p></div><button class="kb-primary" data-kb-action="new-library"><b>＋</b> 新建知识库</button></div>
      <div class="kb-library-toolbar"><div class="kb-input-wrap"><span>⌕</span><input placeholder="搜索知识库" aria-label="搜索知识库"></div><div class="kb-library-count">共 <b>${state.libraryCreated ? 4 : 3}</b> 个知识库 <i></i> 文档数量动态统计</div><div class="kb-filter">全部分类　⌄</div></div>
      ${form}${libraryCards()}${empty}
      <div class="kb-inline-status ${state.libraryCreated ? 'visible' : ''}">✓　知识库已创建，可继续添加训练资料</div>`, 'library');
  };

  const tabButton = (key, label, index) => `<button class="kb-tab ${state.activeTab === key ? 'active' : ''}" data-kb-tab="${key}"><i>${String(index).padStart(2, '0')}</i>${label}${state.activeTab === key ? '<b></b>' : ''}</button>`;
  const fileRows = () => state.docsAdded ? `<tr><td><span class="kb-file-type pdf">PDF</span>南航 B737 机型训练手册.pdf</td><td>PDF 文档</td><td><span class="kb-state success">${state.parsed ? '解析完成' : '已上传'}</span></td><td>李教员</td><td>刚刚</td><td>•••</td></tr><tr><td><span class="kb-file-type doc">DOC</span>飞行训练大纲与课程资料.docx</td><td>Word 文档</td><td><span class="kb-state success">${state.parsed ? '解析完成' : '已上传'}</span></td><td>李教员</td><td>刚刚</td><td>•••</td></tr>` : '<tr><td colspan="6" class="kb-table-empty">资料列表为空，点击“添加样例资料”开始演示上传</td></tr>';

  const renderOperationBody = () => {
    if (state.activeTab === 'documents') return `<div class="kb-pane-toolbar"><div><h2>文档管理</h2><p>选择资料并上传至当前知识库，支持批量入库。</p></div><button class="kb-primary" data-kb-action="add-docs"><b>＋</b> 添加样例资料</button></div>
      <div class="kb-inline-status ${state.docsAdded ? 'visible' : ''}">✓　2 份训练资料已加入上传队列</div>
      <div class="kb-table-wrap"><div class="kb-table-meta"><span>知识库文档 <b>${state.docsAdded ? 2 : 0}</b></span><span>支持 PDF、Word、HTML 等常见格式</span></div><table class="kb-doc-table"><thead><tr><th>文件名称</th><th>格式</th><th>处理状态</th><th>上传人</th><th>更新时间</th><th></th></tr></thead><tbody>${fileRows()}</tbody></table></div>
      <div class="kb-workflow-hint"><span>当前步骤</span><b>文档上传</b><i>选择知识库 → 添加文件 → 开始解析</i></div>`;
    if (state.activeTab === 'extract') return `<div class="kb-pane-toolbar"><div><h2>知识提取</h2><p>对已入库资料进行结构识别、语义解析与训练知识抽取。</p></div><button class="kb-primary" data-kb-action="start-parse" ${!state.docsAdded ? 'disabled' : ''}>${state.parsed ? '重新解析' : '开始智能解析'}</button></div>
      <div class="kb-extract-layout"><section class="kb-surface"><div class="kb-surface-title">解析任务 <span>${state.parsed ? '已完成' : state.parsing ? '处理中' : '待开始'}</span></div>${['文本识别与章节切分','训练术语与知识点提取','机型、科目与章节关联'].map((label,index)=>`<div class="kb-task-row"><span class="kb-task-check ${state.parsed || (state.parsing && index < 2) ? 'done' : ''}">${state.parsed || (state.parsing && index < 2) ? '✓' : String(index + 1).padStart(2,'0')}</span><div><b>${label}</b><small>${index === 0 ? '识别文档层级并保留原文位置' : index === 1 ? '提取训练要求、术语与关键内容' : '关联机型、训练科目和知识章节'}</small></div><span class="kb-task-status">${state.parsed ? '完成' : state.parsing && index < 2 ? '完成' : state.parsing && index === 2 ? '处理中' : '待处理'}</span></div>`).join('')}${state.parsing ? '<div class="kb-parse-progress"><i></i></div>' : ''}</section><section class="kb-surface kb-parse-summary"><div class="kb-surface-title">待解析资料</div><div class="kb-source-file">▧　南航 B737 机型训练手册.pdf</div><div class="kb-source-file">▧　飞行训练大纲与课程资料.docx</div><div class="kb-summary-note">解析结果将保留原文引用，供后续人工核验。</div></section></div>`;
    if (state.activeTab === 'review') return `<div class="kb-pane-toolbar"><div><h2>专家审核</h2><p>对机器抽取的知识内容进行校核，审核通过后再进入检索索引。</p></div><span class="kb-review-count">${state.reviewed ? '已审核' : '待审核'} · 1 条</span></div>
      <div class="kb-review-layout"><section class="kb-surface"><div class="kb-surface-title">待校核知识条目 <span>来源可追溯</span></div><div class="kb-knowledge-item"><div class="kb-knowledge-label">训练知识点　/　B737 进近</div><h3>稳定进近训练要求</h3><p>核对训练知识点与原始资料表述是否一致，确认适用机型、训练阶段与资料版本。</p><div class="kb-source-citation"><span>来源文档</span><b>南航 B737 机型训练手册.pdf</b><span>章节定位</span><b>进近阶段 · 训练要求</b></div></div></section><section class="kb-surface kb-review-actions"><div class="kb-review-avatar">李</div><b>教员审核</b><p>${state.reviewed ? '已确认该知识条目，可进入检索验证。' : '请核对知识表述及来源章节。'}</p><button data-kb-action="approve" class="kb-primary" ${state.reviewed ? 'disabled' : ''}>${state.reviewed ? '✓ 审核通过' : '审核通过'}</button><button data-kb-action="return-review" class="kb-secondary">退回修订</button></section></div>`;
    return `<div class="kb-pane-toolbar"><div><h2>知识检索</h2><p>通过业务问题验证知识库召回结果，并核对原文来源。</p></div><span class="kb-index-status">索引状态　<i></i> ${state.reviewed ? '已更新' : '待审核'}</span></div>
      <div class="kb-search-row"><input data-kb-query value="${state.query}" placeholder="输入机型、训练阶段或知识点"><button class="kb-primary" data-kb-action="search">检索知识</button></div>
      ${state.searched ? `<div class="kb-search-summary">检索完成　<span>按相关度排序</span></div><div class="kb-search-result"><div class="kb-result-order">01</div><div><h3>稳定进近训练要求</h3><p>围绕进近阶段的训练要求进行知识检索，结果保留资料版本与章节位置，供教员进一步核对。</p><div class="kb-source-citation"><span>来源</span><b>南航 B737 机型训练手册.pdf</b><span>章节</span><b>进近阶段 · 训练要求</b><button data-kb-action="view-source">查看原文　↗</button></div></div></div><div class="kb-search-result"><div class="kb-result-order">02</div><div><h3>进近阶段训练科目</h3><p>关联飞行训练大纲中的机型科目，便于继续查看相关课程与训练内容。</p><div class="kb-source-citation"><span>来源</span><b>飞行训练大纲与课程资料.docx</b><span>章节</span><b>B737 · 进近训练模块</b><button data-kb-action="view-source">查看原文　↗</button></div></div></div>` : `<div class="kb-search-empty"><span>⌕</span><b>输入业务问题，验证知识检索</b><small>例如：B737 进近阶段训练关注点</small></div>`}`;
  };

  const renderOperations = () => appShell(`<div class="kb-detail-heading"><div><div class="kb-eyebrow">知识库　/　机型训练</div><h1>南航机型训练知识库</h1><p>飞行手册、训练大纲与课程资料的统一知识底座</p></div><div class="kb-detail-meta"><span class="kb-state success">运行中</span><span>更新于 刚刚</span><button class="kb-secondary" data-kb-action="back-library">返回知识库</button></div></div>
    <nav class="kb-tabs">${tabButton('documents','文档上传',1)}${tabButton('extract','知识提取',2)}${tabButton('review','专家审核',3)}${tabButton('search','知识检索',4)}</nav>
    <div class="kb-operation-body">${renderOperationBody()}</div>`, 'detail');

  function mount(scene, type) {
    const root = scene.querySelector('.kb-mount');
    if (!root) return;
    const draw = () => { root.innerHTML = type === 'library' && !state.detailOpen ? renderLibrary() : renderOperations(); };
    draw();
    root.addEventListener('input', event => {
      if (event.target.name === 'name') state.libraryName = event.target.value;
      if (event.target.name === 'description') state.libraryDescription = event.target.value;
      if (event.target.matches('[data-kb-query]')) state.query = event.target.value;
    });
    root.addEventListener('submit', event => {
      if (!event.target.matches('[data-kb-form]')) return;
      event.preventDefault();
      state.libraryCreated = true;
      state.formOpen = false;
      draw();
    });
    root.addEventListener('click', event => {
      const tab = event.target.closest('[data-kb-tab]');
      if (tab) { state.activeTab = tab.dataset.kbTab; draw(); return; }
      const button = event.target.closest('[data-kb-action]');
      if (!button) return;
      button.classList.add('demo-click');
      const action = button.dataset.kbAction;
      if (action === 'new-library') { state.formOpen = true; draw(); }
      else if (action === 'open-library') { state.detailOpen = true; state.activeTab = 'documents'; draw(); }
      else if (action === 'back-library') { state.detailOpen = false; state.formOpen = false; draw(); }
      else if (action === 'add-docs') { state.docsAdded = true; draw(); }
      else if (action === 'start-parse' && state.docsAdded) {
        state.parsing = true; draw();
        setTimeout(() => { state.parsing = false; state.parsed = true; draw(); }, 950);
      }
      else if (action === 'approve') { state.reviewed = true; draw(); }
      else if (action === 'return-review') { state.reviewed = false; draw(); }
      else if (action === 'search') { state.searched = true; draw(); }
      else if (action === 'view-source') { button.textContent = '原文位置已定位 ✓'; button.classList.add('source-located'); }
    });
  }

  mount(kbSceneOne, 'library');
  mount(kbSceneTwo, 'operations');

  const autoProgress = new WeakMap();
  function clickAction(root, action) {
    const button = root.querySelector(`[data-kb-action="${action}"]`);
    button?.click();
  }
  function progressLibrary(scene, time) {
    const root = scene.querySelector('.kb-mount');
    if (!root) return;
    const done = autoProgress.get(scene) || {};
    if (time >= 13.5 && !done.openLibrary) { clickAction(root, 'open-library'); done.openLibrary = true; }
    autoProgress.set(scene, done);
  }
  function progressOperations(scene, time) {
    const root = scene.querySelector('.kb-mount');
    if (!root) return;
    const done = autoProgress.get(scene) || {};
    if (time >= .6 && !done.upload) { clickAction(root, 'add-docs'); done.upload = true; }
    if (time >= 2.7 && !done.extract) {
      root.querySelector('[data-kb-tab="extract"]')?.click();
      clickAction(root, 'start-parse'); done.extract = true;
    }
    if (time >= 5.1 && !done.review) {
      root.querySelector('[data-kb-tab="review"]')?.click();
      clickAction(root, 'approve'); done.review = true;
    }
    if (time >= 7.4 && !done.search) {
      root.querySelector('[data-kb-tab="search"]')?.click();
      const input = root.querySelector('[data-kb-query]');
      if (input) { input.value = 'B737 进近阶段训练关注点'; input.dispatchEvent(new Event('input', { bubbles: true })); }
      clickAction(root, 'search'); done.search = true;
    }
    autoProgress.set(scene, done);
  }

  const previousKbEffects = window.presentationEffects;
  window.presentationEffects = (scene, time) => {
    previousKbEffects?.(scene, time);
    if (scene === kbSceneOne) scene.classList.toggle('intro-dismissed', time >= 6);
    if (scene === kbSceneOne) progressLibrary(scene, time);
    if (scene === kbSceneTwo) progressOperations(scene, time);
  };
  $('gridContent').innerHTML = slides.map((slide, index) => `<button data-slide="${index}"><small>${String(index + 1).padStart(2, '0')} / ${chapterDisplayNames[slide.dataset.chapter] || slide.dataset.chapter} · ${slide.dataset.duration}秒</small><b>${slide.dataset.title}</b></button>`).join('');
  document.querySelectorAll('[data-slide]').forEach(button => button.onclick = () => { show(+button.dataset.slide); $('overview').classList.remove('open'); });
  show(0);
}

// Showcase the supplied long-form Southern Airlines training report in its own
// immersive chapter scene; only the report chapter is replaced.
// The report stays static: no expand transition, no auto-scrolling.
const trainingReportScene = document.querySelector('.slide[data-chapter="智能报告生成"]');
if (trainingReportScene) {
  trainingReportScene.classList.add('training-report-demo');
  trainingReportScene.classList.remove('immersive-demo', 'intro-dismissed');
  trainingReportScene.innerHTML = `
    <div class="training-report-intro">
      <small>飞行数据 / 训练复盘</small>
      <div class="training-report-icon"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M7 4.5h13l5 5V28H7zM20 5v5h5M11 16h10M11 20h10M11 24h6"/></svg></div>
      <h2>让训练表现<br>清晰可见</h2>
      <div class="training-report-desc"><span>训练报告</span><p>汇总训练数据，生成报告草稿。</p></div>
    </div>
    <div class="training-report-viewport"><iframe title="南航飞行员技术能力分析报告" src="about:blank" loading="eager"></iframe></div>`;
}

// Remove the AI-agent chapter from the finished presentation timeline, while
// leaving its source markup available to the earlier prototype setup scripts.
const removedAgentSlides = slides
  .map((slide, index) => ({ slide, index }))
  .filter(({ slide }) => slide.dataset.chapter === 'AI智能体');
const voiceBySlide = new Map(slides.map((slide, index) => [slide, voices[index]]));
removedAgentSlides.forEach(({ slide }) => slide.remove());
slides.splice(0, slides.length, ...document.querySelectorAll('.slide'));
voices.splice(0, voices.length, ...slides.map(slide => voiceBySlide.get(slide) || slide.dataset.title));
if (window.alignedScript) {
  window.alignedScript.splice(0, window.alignedScript.length,
    ...window.alignedScript.filter(chapter => chapter[0] !== 'AI智能体'));
}
chapterGroups.splice(0, chapterGroups.length,
  ...chapterGroups.filter(group => group.chapterKey !== 'AI智能体'));
starts.splice(0, starts.length);
total = 0;
slides.forEach((slide, index) => {
  starts.push(total);
  total += Number(slide.dataset.duration);
});
chapterGroups.forEach(group => {
  const indices = slides.map((slide, index) =>
    slide.dataset.chapter === group.chapterKey ? index : -1
  ).filter(index => index >= 0);
  group.first = indices[0];
  group.last = indices[indices.length - 1];
  group.start = starts[group.first];
  group.end = starts[group.last] + Number(slides[group.last].dataset.duration);
  group.duration = group.end - group.start;
});
document.querySelector('.chapter-track').innerHTML = chapterGroups.map((group, index) =>
  `<button class="chapter-segment" data-segment="${index}" style="flex:${group.duration}" aria-label="${group.name}播放进度"><i></i></button>`
).join('');
document.querySelector('.chapter-labels').innerHTML = chapterGroups.map((group, index) =>
  `<button data-chapter="${index}" style="flex:${group.duration}">${group.name}</button>`
).join('');
document.querySelectorAll('.chapter-labels [data-chapter]').forEach(button => {
  button.onclick = () => seek(chapterGroups[+button.dataset.chapter].start);
});
document.querySelectorAll('.chapter-track [data-segment]').forEach(button => {
  button.onclick = event => {
    const group = chapterGroups[+button.dataset.segment];
    const rect = button.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
    const target = group.start + ratio * group.duration;
    seek(Math.max(group.start, Math.min(group.end - .001, target)));
  };
});
$('gridContent').innerHTML = slides.map((slide, index) =>
  `<button data-slide="${index}"><small>${String(index + 1).padStart(2, '0')} / ${slide.dataset.chapter} · ${slide.dataset.duration}秒</small><b>${slide.dataset.title}</b></button>`
).join('');
document.querySelectorAll('#gridContent [data-slide]').forEach(button => {
  button.onclick = () => { show(+button.dataset.slide); $('overview').classList.remove('open'); };
});

// Chapter hero: the assistant name becomes the H1, the previous slogan demotes
// to a subtitle. Injected last so it runs after every chapter built its markup.
// The assistant name now sits directly ABOVE the chapter headline (no corner
// badge), so each chapter reads as: name -> slogan headline.
const heroTitles = {
  '智能知识问答': '专业知识<br><span class="yellow">一问即得</span>',
  '知识图谱': '知识之间<br>也有<span class="yellow">导航</span>',
  '知识库系统搭建': '从分散资料<br>到专业知识库',
  'AI智能数据分析': '训练表现，<span class="yellow">稳步提升</span>',
  '智能报告生成': '让训练表现<br>清晰可见'
};
// Cover and closing are full-bleed title pages with their own oversized
// headline; they keep their original composition instead of the chapter hero.
const heroSkipChapters = new Set(['平台介绍', '总结展望']);
chapterGroups.forEach(group => {
  if (heroSkipChapters.has(group.chapterKey)) return;
  const scene = slides.find(slide => slide.dataset.chapter === group.chapterKey);
  if (!scene || scene.querySelector('.chapter-hero-name')) return;
  const title = heroTitles[group.chapterKey];
  if (!title) return;
  // Locate the visible headline: intro blocks first, then plain h2 slides.
  const holder = scene.querySelector('.training-report-intro')
    || scene.querySelector('.kb-showcase-intro')
    || scene.querySelector('.context-opening')
    || (scene.querySelector('.split > div:first-child') || scene);
  const headline = holder.querySelector('h2') || holder.querySelector('h1');
  if (!headline) return;
  // Restore the original slogan headline (rich text with <br> and highlights).
  headline.classList.remove('chapter-hero-name');
  headline.innerHTML = title;
  const label = document.createElement('div');
  label.className = 'chapter-hero-name';
  label.textContent = group.name;
  headline.before(label);
  scene.dataset.chapterHero = group.name;
});
// Any leftover corner badge from earlier builds is no longer used.
document.querySelectorAll('.chapter-hero-badge').forEach(node => node.remove());
// Page caption badge: same wording as the original design, only moved to the
// top-right corner, and it appears once the prototype expands.
// Cover and closing lead with their own oversized headline, so they skip it.
const heroBadgeSkip = new Set([...heroSkipChapters, 'AI智能数据分析', '分析小助手', '智能报告生成']);
const badgeIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7V5h16v2M6 7h12v13H6zM9 11h6M9 15h4"/></svg>';
document.querySelectorAll('.slide').forEach(slide => {
  if (heroBadgeSkip.has(slide.dataset.chapter)) return;
  if (slide.querySelector('.operation-badge')) return;
  const badge = document.createElement('div');
  badge.className = 'operation-badge';
  badge.innerHTML = `${badgeIcon}<span>${slide.dataset.chapter} · 南航业务场景演示</span>`;
  slide.appendChild(badge);
});


// 问答小助手的整段讲解和界面步骤统一放在同一页中。
// 问答小助手：回答中可打开知识图谱继续探索关联内容。
const kgScene = slides.find(slide => slide.dataset.original === '4');
if (kgScene) {
  // This chapter now renders its own graph instead of the embedded prototype,
  // so drop the immersive wrapper whose CSS would force a single-column layout.
  kgScene.classList.remove('immersive-demo');
  const nodes = [
    { id: 'core', kind: 'core', label: '稳定进近', meta: '核心知识点', x: 400, y: 205, r: 52 },
    { id: 'c1', kind: 'course', label: '进近训练科目', meta: '12 条关联', x: 158, y: 92, r: 42 },
    { id: 'c2', kind: 'course', label: '复飞处置', meta: '8 条关联', x: 152, y: 212, r: 38 },
    { id: 'c3', kind: 'course', label: '着陆纠正', meta: '6 条关联', x: 148, y: 330, r: 36 },
    { id: 'r1', kind: 'rule', label: '喊话标准', meta: '机组配合', x: 648, y: 92, r: 40 },
    { id: 'r2', kind: 'rule', label: '速度规范', meta: '运行标准', x: 686, y: 212, r: 38 },
    { id: 'w1', kind: 'crew', label: '机长职责', meta: '3 个角色', x: 428, y: 348, r: 36 },
    { id: 'w2', kind: 'crew', label: '副驾职责', meta: '3 个角色', x: 268, y: 348, r: 34 },
    { id: 'b1', kind: 'chapter', label: '训练手册 3.2', meta: '原文来源', x: 690, y: 328, r: 38 },
    { id: 'x1', kind: 'extra', label: '训练大纲', meta: '待展开', x: 796, y: 212, r: 32 }
  ];
  const links = [
    ['core', 'c1', 1], ['core', 'c2', 1], ['core', 'c3', 1],
    ['core', 'r1', 1], ['core', 'r2', 1],
    ['core', 'w1', 0], ['core', 'w2', 0],
    ['core', 'b1', 1], ['core', 'x1', 0]
  ];
  const byId = new Map(nodes.map(node => [node.id, node]));
  const edgeMarkup = links.map(([from, to, strong]) => {
    const a = byId.get(from), b = byId.get(to);
    const path = `M${a.x} ${a.y}L${b.x} ${b.y}`;
    return `<path class="kg-edge${strong ? ' strong' : ''}" d="${path}" data-from="${from}" data-to="${to}"/>`
      + `<path class="kg-edge-flow" d="${path}" data-from="${from}" data-to="${to}"/>`;
  }).join('');
  const legend = [
    ['#005bbb', '知识点'], ['#7fb2e0', '训练科目'],
    ['#5f9fd4', '操作规范'], ['#8cb8dd', '机组配合'], ['#b0cbe4', '手册章节']
  ].map(([color, label]) => `<span><i style="background:${color}"></i>${label}</span>`).join('');
  const stage = document.createElement('div');
  stage.className = 'kg-stage';
  stage.innerHTML = `
    <svg viewBox="0 0 840 452" role="img" aria-label="稳定进近知识图谱，含10个知识点与9条关联">
      <defs>
        <radialGradient id="kgGlow" cx="50%" cy="50%">
          <stop offset="0%" stop-color="#005bbb" stop-opacity=".14"/>
          <stop offset="100%" stop-color="#005bbb" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <circle class="kg-scan" cx="400" cy="215" r="196"/>
      <g class="kg-edges">${edgeMarkup}</g>
      ${nodes.map((node, index) => `
        <g class="kg-node" data-kind="${node.kind}" data-id="${node.id}" tabindex="0" role="button"
           aria-label="${node.label}，${node.meta}">
          ${node.kind === 'core' ? `<circle class="kg-core-pulse" cx="${node.x}" cy="${node.y}" r="52"/>` : ''}
          ${node.kind === 'core' ? `<circle cx="${node.x}" cy="${node.y}" r="120" fill="url(#kgGlow)"/>` : ''}
          <circle class="halo" cx="${node.x}" cy="${node.y}" r="${node.r + 16}"/>
          <circle class="body" cx="${node.x}" cy="${node.y}" r="${node.r}"/>
          <text x="${node.x}" y="${node.y + (node.kind === 'core' ? 6 : 5)}">${node.label}</text>
          <text class="meta" x="${node.x}" y="${node.y + node.r + 17}">${node.meta}</text>
        </g>`).join('')}
    </svg>
    <div class="kg-legend">${legend}</div>
    <div class="kg-stats">
      <div><b>10</b><span>知识点</span></div>
      <div><b>9</b><span>关联关系</span></div>
      <div><b>36</b><span>引用来源</span></div>
      <div><b>4</b><span>机型覆盖</span></div>
    </div>`;

  const graphSlide = kgScene;
  const oldSplit = graphSlide.querySelector('.split');
  oldSplit?.classList.add('qa-graph-layout');
  if (oldSplit) oldSplit.innerHTML = `
    <div class="qa-graph-intro">
      <div class="qa-graph-eyebrow">03 / 知识图谱 · KNOWLEDGE GRAPH</div>
      <h2>答案延伸<br>知识<span class="yellow">可关联</span></h2>
      <p class="lead">围绕查询主题，展开训练科目、操作规范与手册章节之间的知识关系。</p>
      <div class="qa-graph-hint"><i></i>从步骤 02 的回答入口打开图谱，探索知识关系</div>
    </div>
    <div class="qa-graph-chat">
      <header><span class="qa-graph-avatar">✧</span><div><b>问答小助手</b><small>飞行训练知识问答</small></div><span class="qa-graph-online">知识库已连接</span></header>
      <div class="qa-graph-messages">
        <div class="qa-graph-user" id="qa-graph-question">B737 进近阶段有哪些稳定进近训练要点？</div>
        <div class="qa-graph-answer"><div class="qa-graph-answer-title"><i></i>已整理相关知识</div><p id="qa-graph-answer-text">已整理稳定进近的训练科目、速度与构型规范、机组协同及手册依据。继续打开知识图谱，查看这些内容之间的关联。</p>
          <button type="button" class="qa-graph-entry" id="qa-graph-open">查看知识图谱 <span>↗</span></button>
        </div>
      </div>
      <form class="qa-graph-composer" id="qa-graph-form"><input id="qa-graph-input" aria-label="查询知识" value="B737 进近阶段有哪些稳定进近训练要点？"><button type="submit" aria-label="发送查询">↑</button></form>
      <div class="qa-graph-footnote">知识关联为演示示例，请结合有效手册与训练大纲复核。</div>
      <div class="kg-overlay" id="kg-overlay" role="dialog" aria-modal="true" aria-label="稳定进近知识图谱">
        <div class="kg-dialog"><header><div><b>稳定进近知识图谱</b><small>相关训练科目、运行规范与手册章节</small></div><button type="button" id="kg-close" aria-label="关闭知识图谱">×</button></header><div class="kg-map-host"></div></div>
      </div>
    </div>`;
  const graphEntry = graphSlide.querySelector('#qa-graph-open');
  const graphOverlay = graphSlide.querySelector('#kg-overlay');
  if (graphOverlay) graphSlide.append(graphOverlay);
  let automaticGraph = false;
  let graphManual = false;
  let selectedNode = null;
  const detail = document.createElement('aside');
  detail.className = 'kg-node-detail';
  detail.setAttribute('aria-live', 'polite');
  graphOverlay.querySelector('.kg-dialog').append(detail);
  const descriptions = {
    core: '汇总稳定进近相关的训练科目、运行规范、机组职责与手册来源。',
    c1: '关联进近阶段的训练目标、观察项目和讲评记录。',
    c2: '关联复飞决策、处置程序与机组协同训练。',
    c3: '关联着陆阶段的偏差识别、纠正和训练讲评。',
    r1: '关联标准喊话与机组信息确认，具体要求请核对有效手册。',
    r2: '关联进近速度管理与稳定进近标准，具体参数请核对有效手册。',
    w1: '关联机长的任务分工、决策与机组协调职责。',
    w2: '关联副驾驶的监控、提醒与任务配合职责。',
    b1: '关联训练手册章节与引用来源，当前为演示资料索引。',
    x1: '关联课程目标、训练科目与评估项目。'
  };
  const selectNode = id => {
    selectedNode = id;
    focusNode(id);
    const node = byId.get(id);
    const related = links.filter(([a,b]) => a === id || b === id).map(([a,b]) => byId.get(a === id ? b : a));
    detail.innerHTML = `<div><small>已选知识点 · ${node.meta}</small><h3>${node.label}</h3><p>${descriptions[id]}</p></div><div class="kg-related"><b>关联知识（${related.length}）</b><div>${related.map(n=>`<button type="button" data-related="${n.id}">${n.label} ↗</button>`).join('')}</div><small>示例知识关联 · 请核对有效手册与训练大纲</small></div>`;
    detail.querySelectorAll('[data-related]').forEach(button => button.onclick = () => selectNode(button.dataset.related));
    stage.querySelectorAll('.kg-node').forEach(n => n.setAttribute('aria-pressed', String(n.dataset.id === id)));
  };
  const closeGraph = () => { graphOverlay?.classList.remove('open'); if (!automaticGraph) document.querySelector('.qa-combined-graph-entry button')?.focus(); };
  const openGraph = () => { if (!automaticGraph) { graphManual = true; if (playing) { toggle(); updateVideo(); } } graphOverlay?.classList.add('open'); selectNode('core'); stage.classList.add('on'); graphOverlay?.querySelector('#kg-close')?.focus(); };
  graphSlide.querySelector('.kg-map-host')?.append(stage);
  graphEntry?.addEventListener('click', openGraph);
  graphSlide.querySelector('#kg-close')?.addEventListener('click', closeGraph);
  graphOverlay?.addEventListener('click', event => { if (event.target === graphOverlay) closeGraph(); });
  graphSlide.querySelector('#qa-graph-form')?.addEventListener('submit', event => {
    event.preventDefault();
    const input = graphSlide.querySelector('#qa-graph-input');
    const query = input.value.trim();
    if (!query) { input.focus(); return; }
    graphSlide.querySelector('#qa-graph-question').textContent = query;
    const answer = graphSlide.querySelector('#qa-graph-answer-text');
    answer.textContent = `围绕“${query}”，已关联训练科目、操作规范、机组配合与手册章节。打开知识图谱可继续查看知识关系。`;
    graphEntry.classList.add('ready');
  });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && graphOverlay?.classList.contains('open')) closeGraph(); });

  // 悬停/点击节点：点亮相关连线并高亮相邻节点
  const edgeNodes = [...stage.querySelectorAll('.kg-edge, .kg-edge-flow')];
  const nodeEls = [...stage.querySelectorAll('.kg-node')];
  const focusNode = id => {
    const related = new Set([id]);
    links.forEach(([from, to]) => {
      if (from === id) related.add(to);
      if (to === id) related.add(from);
    });
    edgeNodes.forEach(edge => {
      const hit = edge.dataset.from === id || edge.dataset.to === id;
      edge.style.opacity = hit ? '' : '.07';
    });
    nodeEls.forEach(node => {
      const nodeId = node.dataset.id;
      node.style.opacity = nodeId === id ? '1' : (related.has(nodeId) ? '.95' : '.28');
    });
  };
  const clearFocus = () => {
    if (selectedNode) { focusNode(selectedNode); return; }
    edgeNodes.forEach(edge => { edge.style.opacity = ''; });
    nodeEls.forEach(node => { node.style.opacity = ''; });
  };
  nodeEls.forEach(node => {
    node.addEventListener('mouseenter', () => focusNode(node.dataset.id));
    node.addEventListener('mouseleave', clearFocus);
    node.addEventListener('focus', () => focusNode(node.dataset.id));
    node.addEventListener('blur', clearFocus);
    node.addEventListener('click', event => { event.stopPropagation(); selectNode(node.dataset.id); });
    node.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); event.stopPropagation(); selectNode(node.dataset.id); }
    });
  });

  const kgEffects = window.presentationEffects;
  window.presentationEffects = (scene, time) => {
    kgEffects?.(scene, time);
    if (scene !== graphSlide) return;
    stage.classList.toggle('on', time >= 1.5 || graphOverlay?.classList.contains('open'));
  };
  kgEffects?.(graphSlide, 0);

  // Merge question, cited answer, and graph exploration into one slide.
  // Keep the original embedded conversation as the initial, unzoomed state.
  const qaScene = slides.find(slide => slide.dataset.original === '2');
  const qaPanel = qaScene?.querySelector('#qaApp');
  if (qaScene && qaPanel) {
    qaScene.classList.add('qa-scene');
    const intro = qaScene.querySelector('.split > div:first-child');
    if (intro) {
      intro.innerHTML = `
        <div class="qa-unified-eyebrow">问答小助手 · 知识检索与关联探索</div>
        <h2>专业知识<br><span class="yellow">一问即得</span></h2>
        <p class="lead qa-unified-copy">面向飞行员的统一知识问答入口，覆盖机型手册、训练大纲、运行规范与一线经验。支持多轮追问，回答附带来源依据，为日常飞行与个性化训练提供知识支撑。</p>
`;
    }
    qaScene.dataset.title = '问答小助手：从问题到知识关联';
    qaScene.dataset.qaProgress = '0';
    const entry = document.createElement('div');
    entry.className = 'qa-combined-graph-entry';
    entry.innerHTML = '<span><b>回答已就绪</b>　继续探索相关知识</span><button type="button">查看知识图谱 <i>↗</i></button>';
    entry.querySelector('button')?.addEventListener('click', openGraph);
    qaPanel.querySelector('.prototype-window')?.after(entry);

    // The graph stays interactive, but opens over the same QA slide instead of
    // becoming a separate chapter page.
    document.body.append(graphOverlay);
    graphOverlay.addEventListener('keydown', event => {
      event.stopPropagation();
      if (event.key === 'Escape') { event.preventDefault(); closeGraph(); }
      if (event.key === 'Tab') {
        const targets = [...graphOverlay.querySelectorAll('button,[tabindex="0"]')];
        const first = targets[0], last = targets.at(-1);
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    });
    qaScene.openKnowledgeGraph = (auto = false) => { automaticGraph = auto; openGraph(); automaticGraph = false; };
    qaScene.selectKnowledgeNode = selectNode;
    qaScene.closeKnowledgeGraph = () => { automaticGraph = true; closeGraph(); automaticGraph = false; };
    let graphDemoStep = 0;
    let qaWasActive = false;



    // Drop the old citation and graph pages only after their graph modal and
    // node interactions have been moved into the combined experience.
    const removeSlides = new Set([
      slides.find(slide => slide.dataset.original === '3'),
      graphSlide
    ].filter(Boolean));
    const kept = slides.map((slide, index) => ({ slide, voice: voices[index] }))
      .filter(item => !removeSlides.has(item.slide));
    qaScene.dataset.chapter = '智能知识问答';
    const qaChapter = window.alignedScript?.find(chapter => chapter[0] === '智能知识问答');
    const unifiedNarration = '问答小助手支持直接输入飞行训练问题，并在同一段对话中查看知识库整理的回答与引用依据。演示从B737进近阶段的稳定进近问题开始，答案涵盖训练科目、运行规范、机组配合与手册来源；随后可以继续追问，或点击查看知识图谱，探索这些知识之间的关联。知识来源和图谱关系用于演示，实际训练操作仍需核对有效手册与训练大纲。';
    if (qaChapter) qaChapter[3] = unifiedNarration;
    const qaKept = kept.findIndex(item => item.slide === qaScene);
    if (qaKept >= 0) kept[qaKept].voice = unifiedNarration;
    removeSlides.forEach(slide => slide.remove());
    slides.splice(0, slides.length, ...kept.map(item => item.slide));
    voices.splice(0, voices.length, ...kept.map(item => item.voice || item.slide.dataset.title || ''));

    const baseEffects = window.presentationEffects;
    window.presentationEffects = (scene, time) => {
      baseEffects?.(scene, time);
      if (scene !== qaScene) { if (graphOverlay.classList.contains('open')) { automaticGraph = true; closeGraph(); automaticGraph = false; } qaWasActive = false; return; }
      if (!qaWasActive) { qaWasActive = true; graphDemoStep = 0; graphManual = false; }
      if (false && playing && !graphManual) {
        automaticGraph = true;
        if (local >= 10 && graphDemoStep < 1) { openGraph(); graphDemoStep = 1; }
        if (local >= 12 && graphDemoStep < 2) { selectNode('r2'); graphDemoStep = 2; }
        if (local >= 15 && graphDemoStep < 3) { selectNode('b1'); graphDemoStep = 3; }
        if (local >= 18 && graphDemoStep < 4) { closeGraph(); graphDemoStep = 4; }
        automaticGraph = false;
      }
      if (time < 1) {
        qaScene.dataset.qaProgress = '0';
        qaScene.classList.remove('qa-answer-ready', 'qa-graph-ready');
      }
      if (time >= 3) qaScene.dataset.qaProgress = '1';
      if (time >= 6) {
        qaScene.dataset.qaProgress = '2';
        qaScene.classList.add('qa-graph-ready');
      }
      qaScene.querySelectorAll('[data-qa-step]').forEach(step => {
        step.classList.toggle('active', Number(step.dataset.qaStep) === Number(qaScene.dataset.qaProgress));
        step.classList.toggle('done', Number(step.dataset.qaStep) < Number(qaScene.dataset.qaProgress));
      });
    };
  }
}

// 数据小参谋：指标、图表与研判结论同时入场。
const dataChapterScene = slides.find(slide => slide.dataset.chapter === 'AI智能数据分析');
if (dataChapterScene) {
  dataChapterScene.dataset.title = '训练数据持续向好';
  const dataNarration = '数据小参谋汇总训练指标，直观呈现完成率、标准动作和复训表现的变化。';
  const dataScript = window.alignedScript?.find(chapter => chapter[0] === 'AI智能数据分析');
  if (dataScript) dataScript[3] = dataNarration;
  const dataSlideIndex = slides.indexOf(dataChapterScene);
  if (dataSlideIndex >= 0) voices[dataSlideIndex] = dataNarration;
  const metricGroup = dataChapterScene.querySelector('.metric-sync');
  const charts = [...dataChapterScene.querySelectorAll('.training-chart')];
  dataChapterScene.querySelectorAll('.training-findings .finding').forEach((finding, index) => {
    charts[index]?.appendChild(finding);
  });
  dataChapterScene.querySelectorAll('.build').forEach(item => { item.dataset.at = '0'; });
  const note = dataChapterScene.querySelector('.analytics-note');
  if (note) dataChapterScene.querySelector('.training-analytics').appendChild(note);
  dataChapterScene.querySelector('.training-findings')?.remove();
  const valuesByChart = [[90,92,94,96],[90,93,96,98.2],[82,86,89,92.5]];
  charts.forEach((chart, index) => {
    const values = valuesByChart[index];
    const xs = [64,172,280,388];
    const ys = values.map(value => 244 - (value - 80) * 10);
    const label = chart.querySelector('header b').textContent;
    chart.querySelector('header span').textContent = `${values[0]}% → ${values[3]}%`;
    chart.querySelector('header + div').innerHTML = `<svg viewBox="0 0 440 300" role="img" aria-label="${label}，6月至9月，${values.join('、')}百分比">
      <g class="chart-grid">${[80,85,90,95,100].map(v=>`<path d="M64 ${244-(v-80)*10}H405"/>`).join('')}</g>
      <g class="chart-axis">${[80,85,90,95,100].map(v=>`<text x="5" y="${250-(v-80)*10}">${v}%</text>`).join('')}${xs.map((x,i)=>`<text x="${x}" y="283" text-anchor="middle">${i+6}月</text>`).join('')}</g>
      <polyline class="training-line" points="${xs.map((x,i)=>`${x},${ys[i]}`).join(' ')}"/>
      <g class="chart-dots">${xs.map((x,i)=>`<circle cx="${x}" cy="${ys[i]}" r="6"/><text x="${x}" y="${ys[i]-15}">${values[i]}%</text>`).join('')}</g></svg>`;
  });
  const dataEffects = window.presentationEffects;
  window.presentationEffects = (scene, time) => {
    dataEffects?.(scene, time);
    if (scene !== dataChapterScene) return;
    metricGroup?.classList.toggle('in', time >= 0);
    dataChapterScene.querySelectorAll('.training-chart').forEach((chart, index) => {
      chart.classList.toggle('chart-visible', time >= 0);
    });
    dataChapterScene.querySelectorAll('.training-chart .finding').forEach((finding, index) => {
      finding.classList.toggle('visible', time >= 0);
    });
  };
}

// Remove the on-screen disclaimer / footnote lines. They are decorative
// qualifiers ("以上线验收为准" etc.) that clutter the video frame, so the
// disclosure now lives in the narration and the notes panel only.
const qualifierSelectors = '.captain-footnote,.mapping-boundary,.keynote-source,.context-source,.context-note,.result-source';
document.querySelectorAll(qualifierSelectors).forEach(node => node.remove());
document.querySelectorAll('.slide .small-note').forEach(node => {
  if (/占位示例|不作为飞行操作依据/.test(node.textContent)) node.remove();
});

// Remove the small eyebrow labels ("04 / AI 智能数据分析" 等). Each chapter now
// leads with its assistant name, so the numbered kickers are redundant noise.
document.querySelectorAll('.slide .kicker').forEach(node => node.remove());
document.querySelectorAll('.training-report-intro > small, .kb-showcase-intro > small')
  .forEach(node => node.remove());

// Captions on by default once playback starts, so the recorded video always
// carries the narration text. The 字幕 button still toggles them manually.
const captionToggleBase = toggle;
toggle = function () {
  captionToggleBase();
  if (playing && !captionOn) $('captions').click();
};
// index.html assigns the function reference directly (onclick=toggle), which is
// captured before this wrapper exists — rebind so the toolbar button also works.
$('play').onclick = () => toggle();

const conciseCoachVoice = '分析小助手提炼评语中的正向表现与待提升项，结果可编辑、复制。';
const conciseCoachIndex = slides.findIndex(slide => slide.classList.contains('analysis-coach-scene'));
if (conciseCoachIndex >= 0) voices[conciseCoachIndex] = conciseCoachVoice;
const conciseCoachScript = window.alignedScript?.find(chapter => chapter[0] === '分析小助手');
if (conciseCoachScript) conciseCoachScript[3] = conciseCoachVoice;
// Keep the report introduction concise and derive its duration from this narration.
const shortReportNarration = '报告小顾问汇总训练数据，生成分析报告草稿，供业务人员审核。';
const shortReportIndex = slides.findIndex(slide => slide.dataset.chapter === '智能报告生成');
if (shortReportIndex >= 0) voices[shortReportIndex] = shortReportNarration;
const shortReportScript = window.alignedScript?.find(chapter => chapter[0] === '智能报告生成');
if (shortReportScript) shortReportScript[3] = shortReportNarration;
// Knowledge-base narration is finalized here; recompute the final timeline after all chapter edits.
const silentFinale = slides.filter(slide => slide.dataset.chapter === '总结展望').at(-1);
if (silentFinale) {
  const finaleIndex = slides.indexOf(silentFinale);
  silentFinale.dataset.silent = 'true';
  silentFinale.dataset.duration = '7';
  voices[finaleIndex] = '';
  const finaleScript = window.alignedScript?.find(chapter => chapter[0] === '总结展望');
  if (finaleScript) finaleScript[3] = '';
}
if (typeof applyNarrationTiming === 'function') applyNarrationTiming();
show(Math.min(current, slides.length - 1));

