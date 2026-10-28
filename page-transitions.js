// Apply the same directional transition to every navigation entry point.
(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const activeAnimations = new Map();
  const originalShow = show;
  const clean = () => {
    activeAnimations.forEach((animation, slide) => {
      animation.cancel();
      slide.style.removeProperty('z-index');
    });
    activeAnimations.clear();
  };
  show = function (index) {
    const previousIndex = current;
    const previous = slides[previousIndex];
    clean();
    originalShow(index);
    const incoming = slides[current];
    if (!previous || previous === incoming || reduceMotion.matches) return;
    const direction = current > previousIndex ? 1 : -1;
    previous.style.zIndex = '1';
    incoming.style.zIndex = '2';
    const timing = { duration: 680, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'none' };
    const outgoing = previous.animate([
      { opacity: 1, transform: 'translate3d(0,0,0) scale(1)', filter: 'blur(0)', visibility: 'visible' },
      { opacity: 0, transform: `translate3d(${-direction * 48}px,0,0) scale(.985)`, filter: 'blur(2px)', visibility: 'visible' }
    ], timing);
    const entering = incoming.animate([
      { opacity: 0, transform: `translate3d(${direction * 64}px,14px,0) scale(.985)`, filter: 'blur(3px)' },
      { opacity: 1, transform: 'translate3d(0,0,0) scale(1)', filter: 'blur(0)' }
    ], timing);
    [[previous, outgoing], [incoming, entering]].forEach(([slide, animation]) => {
      activeAnimations.set(slide, animation);
      animation.onfinish = () => {
        if (activeAnimations.get(slide) !== animation) return;
        activeAnimations.delete(slide);
        slide.style.removeProperty('z-index');
      };
    });
  };
  reduceMotion.addEventListener('change', clean);
})();
