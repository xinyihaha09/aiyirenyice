const coverScene=byOriginal(0);
coverScene.querySelector('h1').innerHTML='飞行员“一人一策”<br>数据驱动训练支持系统';
// 航司 logo：白底圆角卡片，样式参考定稿稿。不挂在 .kicker 上——
// knowledge-base-demo.js 会移除所有 .slide .kicker，挂进去就会被一起删掉。
const coverLogoImg=coverScene.querySelector('img.cover-logo');
const coverKicker=coverScene.querySelector('.kicker');
if(coverLogoImg){
  const logoCard=document.createElement('div');
  logoCard.className='cover-logo-card';
  // 保留 cover-logo 类名，knowledge-base-demo.css 的淡入动画依赖它。
  logoCard.appendChild(coverLogoImg);
  if(coverKicker)coverKicker.replaceWith(logoCard);
  else coverScene.querySelector('h1').before(logoCard);
}
coverScene.querySelector('.lead').innerHTML='<span>让<b>知识</b>更易获取</span><span>让<b>数据</b>更易分析</span><span>让<b>业务</b>更加高效</span>';
const coverFX=document.createElement('div');coverFX.className='cover-fx';coverFX.setAttribute('aria-hidden','true');
coverFX.innerHTML='<div class="cover-orbit orbit-one"></div><div class="cover-orbit orbit-two"></div><div class="cover-orbit orbit-three"></div><div class="cover-horizon"></div>'+Array.from({length:16},(_,i)=>`<i class="cover-spark" style="--spark-x:${43+(i*17)%54}%;--spark-y:${9+(i*23)%78}%;--spark-delay:${i*-.37}s"></i>`).join('');
coverScene.prepend(coverFX);
const coverEnglish=document.createElement('p');
coverEnglish.className='cover-english';
coverEnglish.textContent='DATA-DRIVEN PERSONALIZED FLIGHT TRAINING';
coverScene.querySelector('h1').after(coverEnglish);

coverScene.dataset.title='飞行员“一人一策”数据驱动训练支持系统';
voices[slides.indexOf(coverScene)] = '飞行员一人一策，数据驱动训练支持系统。让知识更易获取，让数据更易分析，让业务更加高效。';
