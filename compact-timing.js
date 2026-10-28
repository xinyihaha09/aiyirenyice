// Set each slide's duration from its narration length, then derive every timeline
// value from those durations so page changes, chapter segments, and captions agree.
const narrationBaseDurations = new Map(slides.map(slide => [slide, Number(slide.dataset.duration) || 1]));
const narrationWeight = text => {
  const value = String(text || '').trim();
  const chars = Array.from(value).filter(char => !/\s/.test(char)).length;
  const pauses = (value.match(/[，。！？；：、,.!?;]/g) || []).length;
  return chars / 3.8 + pauses * .14;
};
function applyNarrationTiming() {
  slides.forEach((slide, index) => {
    const previous = Number(slide.dataset.duration) || 1;
    const silent = slide.dataset.silent === 'true';
    const spoken = silent ? '' : (voices[index] || slide.dataset.title || '');
    // Allow natural subtitle reading plus a short pause before the next page.
    const interactionMinimum = slide.classList.contains('qa-scene') ? 24 : slide.classList.contains('analysis-coach-scene') ? 10 : 7;
    const briskIntro = slide.dataset.chapter === '平台介绍';
    const next = briskIntro ? Math.max(4, narrationWeight(spoken) * .70 + 1) : silent ? 7 : Math.max(interactionMinimum, narrationWeight(spoken) * 1.1 + 2);
    slide.querySelectorAll('.build[data-at]').forEach(item => {
      item.dataset.at = Number(item.dataset.at) * next / previous;
    });
    slide.dataset.duration = next.toFixed(2);
  });
  // Keep the opening brisk and proportionally fit the remaining chapters to 02:30.
  const targetDuration = 150;
  const flexible = slides.filter(slide => slide.dataset.chapter !== '平台介绍' && slide.dataset.silent !== 'true');
  const fixedDuration = slides.filter(slide => !flexible.includes(slide)).reduce((sum, slide) => sum + Number(slide.dataset.duration), 0);
  const flexibleDuration = flexible.reduce((sum, slide) => sum + Number(slide.dataset.duration), 0);
  const tempo = (targetDuration - fixedDuration) / flexibleDuration;
  flexible.forEach(slide => {
    slide.querySelectorAll('.build[data-at]').forEach(item => { item.dataset.at = Number(item.dataset.at) * tempo; });
    slide.dataset.duration = (Number(slide.dataset.duration) * tempo).toFixed(2);
  });
  // Final pacing: halve the overview and end QA as soon as graph exploration closes.
  slides.forEach(slide => {
    const previous = Number(slide.dataset.duration);
    const next = slide.dataset.original === '1' ? previous / 2 : slide.classList.contains('qa-scene') ? 18.4 : slide.dataset.chapter === '知识库系统搭建' ? previous / 2 : slide.dataset.chapter === 'AI智能数据分析' ? previous * .35 : previous;
    if (next === previous) return;
    slide.querySelectorAll('.build[data-at]').forEach(item => { item.dataset.at = Number(item.dataset.at) * next / previous; });
    slide.dataset.duration = next.toFixed(2);
  });
  starts.splice(0, starts.length);
  total = 0;
  slides.forEach(slide => {
    starts.push(total);
    total += Number(slide.dataset.duration);
  });
  chapterGroups.forEach((group, index) => {
    const matching = slides.map((slide, i) => slide.dataset.chapter === group.chapterKey || slide.dataset.chapter === group.name ? i : -1).filter(i => i >= 0);
    const first = matching[0];
    const last = matching.at(-1);
    group.first = first;
    group.last = last;
    group.start = starts[first];
    group.end = starts[last] + Number(slides[last].dataset.duration);
    group.duration = group.end - group.start;
    const segment = document.querySelector(`.chapter-track [data-segment="${index}"]`);
    const label = document.querySelector(`.chapter-labels [data-chapter="${index}"]`);
    if (segment) segment.style.flex = group.duration;
    if (label) label.style.flex = group.duration;
  });
  document.querySelectorAll('.chapter-track [data-segment]').forEach(button => {
    button.onclick = event => {
      const group = chapterGroups[Number(button.dataset.segment)];
      const rect = button.getBoundingClientRect();
      if (!group || !rect.width) return;
      const ratio = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
      seek(group.start + ratio * Math.max(0, group.duration - .01));
    };
  });
  document.querySelectorAll('.chapter-labels [data-chapter]').forEach(button => {
    button.onclick = () => { const group = chapterGroups[Number(button.dataset.chapter)]; if (group) seek(group.start); };
  });
  const overview = document.getElementById('gridContent');
  if (overview) overview.innerHTML = slides.map((slide, index) =>
    `<button data-slide="${index}"><small>${String(index + 1).padStart(2, '0')} / ${slide.dataset.chapter}${slide.dataset.result ? ' · 业务价值' : ''} · ${Math.round(Number(slide.dataset.duration))}秒</small><b>${slide.dataset.title}</b></button>`
  ).join('');
  document.querySelectorAll('#gridContent [data-slide]').forEach(button => {
    button.onclick = () => { show(+button.dataset.slide); document.getElementById('overview').classList.remove('open'); };
  });
}
applyNarrationTiming();
const narrationTimingEffects = window.presentationEffects;
window.presentationEffects = (slide, time) => {
  narrationTimingEffects?.(slide, time * narrationBaseDurations.get(slide) / Number(slide.dataset.duration));
  if (slide.dataset.original === '9') slide.querySelectorAll('.flow-item').forEach((item, index) => item.classList.toggle('lit', time >= 1 + index * 2.4));
};
show(0);
