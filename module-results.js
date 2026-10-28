// Outcome pages were intentionally removed: keep each chapter focused on its
// actual platform walkthrough and avoid inserting separate business-result slides.
// Clean up outcome decorations in case an older version of the deck left any behind.
document.querySelectorAll('.result-scene,.outcome-strip,.module-chip').forEach(element => element.remove());

// Preserve the existing, non-outcome copy refinements for the introduction and agent chapter.
const intro = document.querySelector('.slide[data-original="1"]');
if (intro) {
  const lead = intro.querySelector('.lead');
  if (lead) lead.textContent = '围绕训练资源、实施、分析、安全与教学，构建知识与数据双驱动的辅助能力。';
  const capabilities = intro.querySelector('.capabilities');
  if (capabilities) capabilities.innerHTML = '<span>训练资源与知识</span><span>训练规划与实施</span><span>飞行数据与分析</span><span>安全与合规</span><span>教学与服务</span>';
}

const agent = document.querySelector('.slide[data-original="9"]');
const request = agent?.querySelector('.request');
if (request) request.textContent = '面向训练全场景，连接专业知识、训练数据和业务工具，辅助训练复盘与决策。';
