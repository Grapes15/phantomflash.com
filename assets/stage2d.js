/* agents.html stages: 2D noir turnaround. A set of drawn frames (000, 045 ... 315) cycled over the cyan turntable disc so the
   character appears to turn. No canvas, no WebGL: two stacked <img> and an opacity swap.
   window.PF2D.mountTurnaround(containerEl, frameUrls, opts?) -> Promise<{pause, resume, setPaused, dispose, frames}>
   containerEl is an absolutely positioned host inside the .pf-fig (the .pf-2d div); the .pf-disc beside it marks where the
   feet land. Frames that fail to load are skipped; a set with one frame just stands still; zero frames rejects.
   opts: interval (ms per frame, 420), fade (ms, 120), drag (px per frame, 40), rest (ms held after a drag, 2500),
         feet / head (fractions of frame height where the soles and the top of the head sit, .962 / .033), fig, disc. */
(function(){
  'use strict';

  function loadFrame(url){
    return new Promise(function(resolve){
      var im = new Image();
      im.onload = function(){ resolve(im); };
      im.onerror = function(){ resolve(null); };
      im.decoding = 'async';
      im.src = url;
    });
  }

  function mountTurnaround(host, urls, o){
    o = o || {};
    var fig = o.fig || host.closest('.pf-fig') || host.parentNode;
    var disc = o.disc || fig.querySelector('.pf-disc');
    var interval = o.interval || 420, fade = o.fade != null ? o.fade : 120, perFrame = o.drag || 40, restMs = o.rest != null ? o.rest : 2500;
    var feet = o.feet != null ? o.feet : 0.962, head = o.head != null ? o.head : 0.033;

    return Promise.all(urls.map(loadFrame)).then(function(all){
      var frames = all.filter(Boolean);
      if(!frames.length) throw new Error('no turnaround frames');
      var aspect = frames[0].naturalWidth / frames[0].naturalHeight || 0.75;

      host.innerHTML = '';
      var stack = document.createElement('div'); stack.className = 'pf-2d-stack';
      var a = document.createElement('img'), b = document.createElement('img');
      [a, b].forEach(function(im){
        im.alt = ''; im.draggable = false; im.setAttribute('aria-hidden', 'true');
        im.style.transition = 'none'; im.style.opacity = '0'; stack.appendChild(im);
      });
      host.appendChild(stack);
      var cur = a, nxt = b, idx = 0;
      a.src = frames[0].src; a.style.opacity = '1';

      var swapT = 0;
      function show(i){
        i = ((i % frames.length) + frames.length) % frames.length;
        if(i === idx) return;
        idx = i;
        clearTimeout(swapT);
        /* the incoming frame fades in over the outgoing one; the outgoing one is cleared once the fade is done */
        cur.style.transition = 'none'; cur.style.opacity = '1'; cur.style.zIndex = '1';
        nxt.style.transition = 'none'; nxt.style.opacity = '0'; nxt.style.zIndex = '2';
        nxt.src = frames[idx].src;
        void nxt.offsetWidth;
        nxt.style.transition = fade ? 'opacity ' + fade + 'ms linear' : 'none'; nxt.style.opacity = '1';
        var gone = cur, shown = nxt; cur = shown; nxt = gone;
        swapT = setTimeout(function(){ gone.style.transition = 'none'; gone.style.opacity = '0'; }, fade + 30);
      }

      function fit(){
        var hr = host.getBoundingClientRect(), W = Math.max(1, hr.width), H = Math.max(1, hr.height);
        var feetY = H * 0.78, top = W < 500 ? 18 : 26;
        if(disc){ var dr = disc.getBoundingClientRect(); if(dr.height > 0) feetY = dr.top + dr.height / 2 - hr.top; }
        var h = Math.max(120, feetY - top) / (feet - head), w = h * aspect;
        if(w * 0.70 > W * 0.98){ w = W * 0.98 / 0.70; h = w / aspect; }   /* arms span ~70% of the frame: never clip them */
        stack.style.width = w + 'px'; stack.style.height = h + 'px';
        stack.style.left = (W - w) / 2 + 'px'; stack.style.top = (feetY - feet * h) + 'px';
      }
      fit();

      /* ---- running state ---- */
      var visible = true, ext = false, dragging = false, cool = null, timer = 0, dead = false;
      var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion:reduce)').matches;
      function tick(){ timer = setTimeout(function(){ show(idx + 1); tick(); }, interval); }
      function applyRun(){
        var want = !dead && frames.length > 1 && visible && !document.hidden && !ext && !dragging && !cool && !reduce;
        if(want && !timer) tick();
        else if(!want && timer){ clearTimeout(timer); timer = 0; }
      }

      var io = ('IntersectionObserver' in window) ? new IntersectionObserver(function(es){ visible = es[es.length - 1].isIntersecting; applyRun(); }) : null;
      if(io) io.observe(fig);
      document.addEventListener('visibilitychange', applyRun);
      var ro = ('ResizeObserver' in window) ? new ResizeObserver(fit) : null;
      if(ro) ro.observe(host); else window.addEventListener('resize', fit);

      /* ---- drag / swipe scrubs frames: dragging left turns the way the auto-spin turns ---- */
      var lastX = 0, acc = 0;
      function down(e){
        if(e.pointerType === 'mouse' && e.button !== 0) return;
        dragging = true; lastX = e.clientX; acc = 0; clearTimeout(cool); cool = null; applyRun();
        fig.classList.add('pf-grab');
        try{ host.setPointerCapture(e.pointerId); }catch(_){}
      }
      function move(e){
        if(!dragging) return;
        acc += e.clientX - lastX; lastX = e.clientX;
        var n = Math.trunc(acc / perFrame);
        if(n){ acc -= n * perFrame; show(idx - n); }
      }
      function up(e){
        if(!dragging) return;
        dragging = false; fig.classList.remove('pf-grab');
        try{ host.releasePointerCapture(e.pointerId); }catch(_){}
        clearTimeout(cool); cool = setTimeout(function(){ cool = null; applyRun(); }, restMs); applyRun();
      }
      host.addEventListener('pointerdown', down);
      host.addEventListener('pointermove', move);
      host.addEventListener('pointerup', up);
      host.addEventListener('pointercancel', up);

      applyRun();
      return {
        frames: frames.length, fig: fig,
        get index(){ return idx; },
        pause: function(){ ext = true; applyRun(); },
        resume: function(){ ext = false; applyRun(); },
        setPaused: function(p){ ext = !!p; applyRun(); },
        isRunning: function(){ return !!timer; },
        dispose: function(){
          dead = true; clearTimeout(timer); timer = 0; clearTimeout(cool); clearTimeout(swapT);
          document.removeEventListener('visibilitychange', applyRun);
          if(io) io.disconnect();
          if(ro) ro.disconnect(); else window.removeEventListener('resize', fit);
          host.removeEventListener('pointerdown', down); host.removeEventListener('pointermove', move);
          host.removeEventListener('pointerup', up); host.removeEventListener('pointercancel', up);
          host.innerHTML = '';
        }
      };
    });
  }

  window.PF2D = { mountTurnaround: mountTurnaround };
  document.dispatchEvent(new Event('pf2d-ready'));
})();
