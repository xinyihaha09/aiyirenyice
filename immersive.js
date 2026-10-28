const featurePaths=[
'<path d="M5 4h22v17H15l-7 6v-6H5z"/><path d="M10 10h12M10 15h8"/>',
'<circle cx="16" cy="16" r="4"/><circle cx="6" cy="6" r="3"/><circle cx="26" cy="7" r="3"/><circle cx="25" cy="26" r="3"/><path d="m8 8 5 5m6 0 5-4m-5 10 4 5"/>',
'<path d="M5 26V6m0 20h23M11 22v-8m7 8V9m7 13V4"/>',
'<path d="M4 24 12 16l6 4L28 7M21 7h7v7"/><path d="M4 29h24"/>',
'<path d="M8 3h12l6 6v20H8zM20 3v7h6M12 16h10M12 21h10"/>'
];
const featureSvg=i=>`<svg viewBox="0 0 32 32" aria-hidden="true">${featurePaths[i%5]}</svg>`;
const immersiveModules={2:0,3:0,4:1,5:2};
Object.entries(immersiveModules).forEach(([original,icon])=>{
 const s=byOriginal(original);if(!s.querySelector('.real-prototype'))return;
 s.classList.add('immersive-demo');
 const intro=s.querySelector('.split>div:first-child');
 const mark=document.createElement('div');mark.className='immersive-icon';mark.innerHTML=featureSvg(icon);intro.prepend(mark);
 const badge=document.createElement('div');badge.className='operation-badge';badge.innerHTML=featureSvg(icon)+`<span>${s.dataset.chapter} · 南航业务场景演示</span>`;s.appendChild(badge);
});
byOriginal(1).querySelectorAll('.capabilities>span').forEach((card,i)=>{const mark=document.createElement('i');mark.className='feature-icon';mark.innerHTML=featureSvg(i);card.prepend(mark)});
document.querySelectorAll('.result-scene .result-eyebrow').forEach((e,i)=>e.insertAdjacentHTML('afterbegin',featureSvg(i)));
const immersiveBaseEffects=window.presentationEffects;
window.presentationEffects=(s,t)=>{
 immersiveBaseEffects?.(s,t);
 if(s.classList.contains('immersive-demo'))s.classList.toggle('intro-dismissed',t>=6);
};
// Keep full-screen prototype as one focal surface, but animate the floating intro as a unit.
const previousSceneElements=sceneElements;
sceneElements=function(scene){
 if(!scene.classList.contains('immersive-demo'))return previousSceneElements(scene);
 // Prototype's upward reveal is driven by the operation timeline, not scene entry.
 return [scene.querySelector('.split>div:first-child')].filter(Boolean);
};
effects();
