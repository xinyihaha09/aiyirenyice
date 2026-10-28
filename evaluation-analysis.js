(() => {
  const slide = document.querySelector('.analysis-coach-scene');
  if (!slide) return;
  // 3s introduction + 1.3s analysis + 5s to read the results.
  slide.dataset.duration = '9.3';
  const app = slide.querySelector('.coach-app');
  const input = slide.querySelector('.coach-input');
  const counter = slide.querySelector('.coach-input-count');
  const status = slide.querySelector('.coach-status');
  const run = slide.querySelector('.coach-run');
  const reset = slide.querySelector('.coach-reset');
  const results = slide.querySelector('.coach-results');
  const empty = slide.querySelector('.coach-empty');
  const fields = {
    positive: slide.querySelector('.coach-positive .coach-result-content'),
    negative: slide.querySelector('.coach-negative .coach-result-content')
  };
  const sample = input.value;
  const sampleResults = {
positive: `工作负荷管理（WLM）
1. OB WLM.2 对任务进行有效地计划、优先级排序和安排：能够很好地对任务进行有效规划、优先级分配及时间节点安排，为程序处置预留充足时间。
2. OB WLM.3 在执行任务时有效地管理时间：能够合理安排时间节点，保持充足时间用于程序处置。`,
negative: `程序应用和遵守规章（PRO）
1. OB PRO.2 及时应用相关的运行规定、程序和技术：单发飘降程序中速度选择、自动油门接通时机及高度限制确认存在偏差。
2. OB PRO.4 正确操作飞机系统和相关设备：自动油门接通时机与程序要求存在偏差。
3. OB PRO.7 应用相关的程序知识：对单发飘降速度选择及高度限制确认的程序知识应用不足。

问题解决与决策（PSD）
1. OB PSD.1 及时识别、评估和管理威胁和差错：对高原机场起飞遭遇风切变导致能量不足的风险评估和管理存在不足。
2. OB PSD.5 确定并考虑适当的选项：对风切变导致能量不足时的可用性能管理选项考虑不足。`
  };
  const labels = { WLM: '工作负荷管理', PRO: '程序应用和遵守规章', PSD: '问题解决与决策' };
  let demoTriggered = false;
  let automaticClick = false;
  let manualInteraction = false;
  let wasActive = false;
  let timers = [];
  let revision = 0;
  const storageKey = 'flight-training-coach-v2';
  const copyButtons = [...slide.querySelectorAll('[data-copy-side], .coach-copy-all')];
  status.setAttribute('role', 'status');
  status.setAttribute('aria-live', 'polite');
  const save = () => {
    try { localStorage.setItem(storageKey, JSON.stringify({ input: input.value, positive: fields.positive.innerText, negative: fields.negative.innerText, analyzed: app.classList.contains('analyzed') })); } catch {}
  };
  const cancel = () => { timers.forEach(clearTimeout); timers = []; revision++; app.classList.remove('analyzing'); app.setAttribute('aria-busy', 'false'); run.disabled = false; };
  const parseSide = (text, side) => {
    let active = '';
    const rows = [];
    const positiveWords = /良好|准确|及时|有效|合理|稳定|主动|正确|充分|有充足|能够/;
    const negativeWords = /不足|未能|未按|偏离|忽略|错误|过快|过早|需改进|需要加强|不够|而不是/;
    for (const line of text.replace(/(优点|不足|待提升|改进项|正向表现)\s*[:：]/g, '\n$1：\n').split(/\n/)) {
      const value = line.trim();
      if (!value) continue;
      if (/^(优点|正向表现)[:：]$/.test(value)) { active = 'positive'; continue; }
      if (/^(不足|待提升|改进项)[:：]$/.test(value)) { active = 'negative'; continue; }
      const match = value.match(/^[【\[]([A-Z]{2,4})[】\]]\s*(.*)/);
      const code = match ? match[1] : '';
      const body = match ? match[2] : value;
      const inferred = negativeWords.test(body) ? 'negative' : positiveWords.test(body) ? 'positive' : '';
      if ((active || inferred) === side) rows.push({ code, text: body });
    }
    return rows;
  };
  const formatRows = (rows, side) => rows.length
    ? rows.map(({ code, text }) => `${labels[code] || (code ? '综合表现' : '训练表现')}${code ? `（${code}）` : ''}\n${text}`).join('\n\n')
    : `未识别到明确的${side === 'positive' ? '正向表现' : '待提升项'}，请教员结合训练记录补充判断。`;
  const updateCount = () => { counter.textContent = `${Array.from(input.value).length} / 3000 字`; };
  const clearResults = () => {
    app.classList.remove('analyzing', 'analyzed');
    fields.positive.textContent = '';
    fields.negative.textContent = '';
    results.style.display = '';
    empty.style.display = '';
    run.disabled = false;
    run.textContent = '✧　AI 分析';
  };
  const setCopyEnabled = enabled => copyButtons.forEach(button => { button.disabled = !enabled; });
  input.addEventListener('input', () => {
    updateCount();
    if (app.classList.contains('analyzing')) cancel();
    status.textContent = app.classList.contains('analyzed') ? '评语已修改，请重新分析更新结果' : '等待开始分析';
    run.textContent = app.classList.contains('analyzed') ? '✧　重新分析' : '✧　AI 分析';
    save();
  });
  run.addEventListener('click', () => {
    if (!automaticClick) {
      manualInteraction = true;
      if (playing) { toggle(); updateVideo(); }
    }
    const text = input.value.trim();
    if (!text) { status.textContent = '请先输入训练评语'; input.setAttribute('aria-invalid', 'true'); input.focus(); return; }
    input.removeAttribute('aria-invalid');
    cancel();
    const token = revision;
    run.disabled = true;
    run.textContent = '◌　分析中';
    setCopyEnabled(false);
    status.textContent = '正在分析…';
    app.classList.add('analyzing');
    empty.querySelector('b').textContent = '正在分析训练评语';
    empty.querySelector('small').textContent = '正在整理结果…';
    app.setAttribute('aria-busy', 'true');
    timers.push(setTimeout(() => { if (token === revision) status.textContent = '正在匹配胜任力…'; }, 400));
    timers.push(setTimeout(() => { if (token === revision) status.textContent = '正在整理分析结果…'; }, 850));
    timers.push(setTimeout(() => {
      if (token !== revision) return;
      const usesReferenceSample = text === sample.trim();
      fields.positive.textContent = usesReferenceSample ? sampleResults.positive : formatRows(parseSide(text, 'positive'), 'positive');
      fields.negative.textContent = usesReferenceSample ? sampleResults.negative : formatRows(parseSide(text, 'negative'), 'negative');
      app.classList.remove('analyzing');
      app.classList.add('analyzed');window.updateRecordedObTags?.();
      app.setAttribute('aria-busy', 'false');
      empty.style.display = 'none';
      results.style.display = 'grid';
      run.disabled = false;
      run.textContent = '✧　重新分析';
      setCopyEnabled(true);
      status.textContent = '分析完成 · 可编辑';
      save();
    }, 1300));
  });
  reset.addEventListener('click', () => {
    cancel();
    input.value = '';
    input.removeAttribute('aria-invalid');
    updateCount();
    clearResults();
    setCopyEnabled(false);
    empty.querySelector('b').textContent = '等待 AI 分析';
    empty.querySelector('small').textContent = '输入训练评语，点击「AI 分析」查看胜任力洞察';
    status.textContent = '已重置，请输入训练评语';
    save();
    input.focus();
  });
  const sampleButton = document.createElement('button');
  sampleButton.type = 'button'; sampleButton.className = 'coach-sample'; sampleButton.textContent = '填入示例';
  slide.querySelector('.coach-input-head').appendChild(sampleButton);
  sampleButton.addEventListener('click', () => { cancel(); input.value = sample; clearResults(); setCopyEnabled(false); updateCount(); status.textContent = '已填入示例，点击 AI 分析'; save(); });
  Object.values(fields).forEach(field => {
    field.setAttribute('aria-multiline', 'true');
    field.addEventListener('input', () => { status.textContent = '已保存修改'; save(); });
    field.addEventListener('paste', event => {
      event.preventDefault();
      document.execCommand('insertText', false, event.clipboardData.getData('text/plain'));
    });
  });
  // Editing must not trigger presentation shortcuts or swipe navigation.
  app.addEventListener('keydown', event => event.stopPropagation());
  app.addEventListener('touchstart', event => event.stopPropagation());
  app.addEventListener('touchend', event => event.stopPropagation());
  const copyText = async (text, button) => {
    const old = button.textContent;
    try {
      if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(text);
      else {
        const helper = document.createElement('textarea'); helper.value = text;
        helper.style.position = 'fixed'; helper.style.opacity = '0'; document.body.appendChild(helper);
        helper.select(); const copied = document.execCommand('copy'); helper.remove(); if (!copied) throw new Error('copy failed');
      }
      button.textContent = '已复制';
    } catch { button.textContent = '复制失败'; }
    window.setTimeout(() => { button.textContent = old; }, 1300);
  };
  slide.querySelectorAll('[data-copy-side]').forEach(button => button.addEventListener('click', () => {
    copyText(fields[button.dataset.copySide].innerText, button);
  }));
  slide.querySelector('.coach-copy-all').addEventListener('click', event => {
    copyText(`正向胜任力\n${fields.positive.innerText}\n\n待提升胜任力\n${fields.negative.innerText}`, event.currentTarget);
  });
  setCopyEnabled(false);
  updateCount();
  const priorEffects = window.presentationEffects;
  window.presentationEffects = (scene, time) => {
    priorEffects?.(scene, time);
    if (scene !== slide) { if (wasActive) cancel(); wasActive = false; return; }
    if (!wasActive) {
      wasActive = true; demoTriggered = false; manualInteraction = false;
      cancel();
      input.value = sample;
      updateCount();
      clearResults();
      setCopyEnabled(false);
      run.classList.remove('demo-highlight');
      empty.querySelector('b').textContent = '等待 AI 分析';
      empty.querySelector('small').textContent = '点击 AI 分析';
      status.textContent = '等待开始分析';
      slide.querySelector('.coach-workspace').scrollTop = 0;
    }
    if (!playing || manualInteraction) return;
    const elapsed = local;
    run.classList.toggle('demo-highlight', elapsed >= 1.4 && elapsed < 3);
    if (elapsed >= 3 && !demoTriggered) {
      demoTriggered = true;
      // Playback uses the reference example so the recorded sequence is repeatable.
      cancel(); input.value = sample; updateCount(); clearResults(); setCopyEnabled(false);
      automaticClick = true; run.click(); automaticClick = false;
    }
    if (elapsed >= 5 && app.classList.contains('analyzed')) {
      const workspace = slide.querySelector('.coach-workspace');
      const target = Math.min(135, Math.max(0, workspace.scrollHeight - workspace.clientHeight));
      workspace.scrollTop += (target - workspace.scrollTop) * .08;
    }
  };
})();
