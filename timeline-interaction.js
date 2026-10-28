// Split introduction scenes and allow continuous pointer scrubbing.
(() => {
 const track=document.querySelector('.chapter-track');
 const labels=document.querySelector('.chapter-labels');
 if(!track||!labels)return;
 const introNames=['AI赋能','机长困扰','解决方向','平台概览'];
 const groups=[];
 chapterGroups.forEach(group=>{
  if(group.chapterKey!=='平台介绍'){groups.push(group);return;}
  for(let i=group.first;i<=group.last;i++){
   groups.push({name:introNames[i-group.first]||slides[i].dataset.title,chapterKey:group.chapterKey,first:i,last:i,start:starts[i],end:starts[i]+Number(slides[i].dataset.duration),duration:Number(slides[i].dataset.duration)});
  }
 });
 chapterGroups.splice(0,chapterGroups.length,...groups);
 track.innerHTML=groups.map((g,i)=>`<button type="button" class="chapter-segment" data-segment="${i}" style="flex:${g.duration}" aria-label="${g.name}，拖动调整进度"><i></i></button>`).join('');
 labels.innerHTML=groups.map((g,i)=>`<button type="button" data-chapter="${i}" style="flex:${g.duration}" title="${g.name}">${g.name}</button>`).join('');
 labels.querySelectorAll('button').forEach((button,i)=>button.onclick=()=>seek(groups[i].start));
 track.style.touchAction='none';
 track.style.cursor='ew-resize';
 let dragging=false,wasPlaying=false,pointerId=null;
 const position=event=>{
  const rect=track.getBoundingClientRect();
  const ratio=Math.max(0,Math.min(1,(event.clientX-rect.left)/rect.width));
  seek(Math.min(total-.01,ratio*total));
 };
 track.addEventListener('pointerdown',event=>{
  if(event.button!==0)return;
  event.preventDefault();dragging=true;pointerId=event.pointerId;wasPlaying=playing;
  playing=false;track.setPointerCapture(pointerId);track.classList.add('scrubbing');position(event);
 });
 track.addEventListener('pointermove',event=>{if(dragging&&event.pointerId===pointerId)position(event)});
 const finish=event=>{
  if(!dragging||event.pointerId!==pointerId)return;
  dragging=false;track.classList.remove('scrubbing');
  if(track.hasPointerCapture(pointerId))track.releasePointerCapture(pointerId);
  playing=wasPlaying;last=performance.now();$('play').textContent=playing?'Ⅱ 暂停':'▶ 自动放映';updateVideo();
 };
 track.addEventListener('pointerup',finish);track.addEventListener('pointercancel',finish);
 track.addEventListener('click',event=>event.preventDefault());
 track.querySelectorAll('button').forEach(button=>button.addEventListener('keydown',event=>{
  if(event.key==='ArrowRight'||event.key==='ArrowLeft'){
   event.preventDefault();event.stopPropagation();seek(starts[current]+local+(event.key==='ArrowRight'?2:-2));
  }
  if(event.key==='Enter'||event.key===' '){event.preventDefault();event.stopPropagation();seek(groups[Number(button.dataset.segment)].start);}
 }));
 updateVideo();
})();
