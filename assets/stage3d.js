/* agents.html stages: noir ink render of a GLB (three.js, toon bands + inverted-hull ink + red rim).
   Exposes window.PF3D.mount(figEl, glbUrl, extra?) and window.PF3D.start(opts), both -> Promise<{setPaused, dispose}>.
   Every call builds its own renderer, scene, lights, materials and observers (nothing shared but the imported three.js
   modules), so any number of turntables can live on one page; each pauses its own rendering while off-screen.
   three.js is imported lazily so a CDN failure rejects the promise and the caller falls back.
   No postprocessing: 2 draws per mesh. */
(function(){
  'use strict';
  var DRACO = 'https://www.gstatic.com/draco/versioned/decoders/1.5.6/';

  async function start(opts){
    var host = opts.host, fig = opts.fig, disc = opts.disc;
    var THREE = await import('three');
    var gl = await Promise.all([
      import('three/addons/loaders/GLTFLoader.js'),
      import('three/addons/loaders/DRACOLoader.js'),
      import('three/addons/controls/OrbitControls.js')
    ]);
    var GLTFLoader = gl[0].GLTFLoader, DRACOLoader = gl[1].DRACOLoader, OrbitControls = gl[2].OrbitControls;

    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
    renderer.setPixelRatio(dpr);
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.NoToneMapping;
    var canvas = renderer.domElement;
    canvas.setAttribute('aria-hidden', 'true');
    canvas.style.cssText = 'display:block;width:100%;height:100%;cursor:grab;touch-action:pan-y;outline:0';
    host.appendChild(canvas);

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(opts.fov || 22, 1, 0.1, 200);
    scene.add(camera);

    /* lights ride on the camera, so the red lightning stays behind the figure while the turntable (camera orbit) spins */
    var aim = new THREE.Object3D(); camera.add(aim);
    function dl(color, intensity, x, y, z){
      var l = new THREE.DirectionalLight(color, intensity);
      l.userData.off = new THREE.Vector3(x, y, z);
      l.target = aim; camera.add(l); return l;
    }
    var key = dl(0xffe6d2, opts.key != null ? opts.key : 2.6, 0.5, 0.9, 1.0);        /* dim cool key, front-top */
    var rimL = dl(0xff2a2a, opts.rim != null ? opts.rim : 0.5, -0.9, 0.55, -1.0);       /* red lightning, behind-left-above */
    var rimR = dl(0xff2a2a, opts.rim != null ? opts.rim * 0.8 : 0.4, 0.9, 0.45, -1.0);/* behind-right */
    scene.add(new THREE.AmbientLight(0x2a1216, opts.ambient != null ? opts.ambient : 0.9));

    /* hard bands: N-step gradient, nearest filtered */
    var steps = opts.steps || [0.04, 0.30, 0.70, 1.0];
    var gdata = new Uint8Array(steps.map(function(v){ return Math.round(v * 255); }));
    var gradient = new THREE.DataTexture(gdata, gdata.length, 1, THREE.RedFormat);
    gradient.minFilter = gradient.magFilter = THREE.NearestFilter;
    gradient.generateMipmaps = false; gradient.needsUpdate = true;

    var U = {
      uPx: { value: dpr },
      uHatchT: { value: opts.hatchT != null ? opts.hatchT : 0.13 },
      uHatchA: { value: opts.hatchA != null ? opts.hatchA : 0.85 },
      uSat: { value: opts.sat != null ? opts.sat : 0.9 },
      uRes: { value: new THREE.Vector2(1, 1) },
      uInk: { value: 3 * dpr },
      uRimT: { value: opts.rimT != null ? opts.rimT : 0.7 },
      uRimA: { value: opts.rimA != null ? opts.rimA : 0.68 },
      uGamma: { value: opts.gamma != null ? opts.gamma : 0.78 },
      uWarm: { value: new THREE.Color(0.95, 0.7, 0.58) },
      uRimCol: { value: new THREE.Color(0xd01a1a) }
    };

    function toonize(m){
      m.onBeforeCompile = function(s){
        s.uniforms.uPx = U.uPx; s.uniforms.uHatchT = U.uHatchT; s.uniforms.uHatchA = U.uHatchA; s.uniforms.uSat = U.uSat;
        s.uniforms.uRimT = U.uRimT; s.uniforms.uRimA = U.uRimA; s.uniforms.uRimCol = U.uRimCol; s.uniforms.uGamma = U.uGamma; s.uniforms.uWarm = U.uWarm;
        s.fragmentShader = s.fragmentShader
          .replace('void main() {', 'uniform float uPx,uHatchT,uHatchA,uSat,uRimT,uRimA,uGamma;\nuniform vec3 uRimCol,uWarm;\nvoid main() {')
          .replace('#include <map_fragment>', '#include <map_fragment>\n' +
            'diffuseColor.rgb = mix(vec3(dot(diffuseColor.rgb, vec3(.299,.587,.114))), diffuseColor.rgb, uSat);\n' +
            /* lift the near-black cloth into dark brown (lit tone = base color), warm it */
            'diffuseColor.rgb = pow(diffuseColor.rgb, vec3(uGamma)) * uWarm;')
          .replace('#include <opaque_fragment>',
            /* engraving-style hatching keyed to final tone: lit areas stay clean (base color shows through),
               mid shadow gets one diagonal, deep shadow cross-hatches, darkest goes solid ink */
            'float L = dot(outgoingLight, vec3(.3333));\n' +
            'vec2 hp = gl_FragCoord.xy / uPx;\n' +
            'float wob = sin(hp.x * .045) * .9 + sin(hp.y * .037) * .9;\n' +
            'float h1 = step(.68, fract((hp.x + hp.y) * .27 + wob));\n' +
            'float h2 = step(.68, fract((hp.x - hp.y) * .27 - wob));\n' +
            'float ink = max(max(h1 * (1. - step(uHatchT, L)), h2 * (1. - step(uHatchT * .55, L))), 1. - step(uHatchT * .12, L));\n' +
            'outgoingLight *= 1. - uHatchA * ink;\n' +
            /* red lightning from behind: hard-stepped fresnel, two ink-like tones, strongest on upward/outer edges */
            'float fr = 1. - clamp(dot(normalize(normal), normalize(vViewPosition)), 0., 1.);\n' +
            'float up = normal.y * .5 + .5;\n' +
            'float rimK = step(uRimT, fr) * .6 + step(uRimT + .12, fr) * .4;\n' +
            'outgoingLight += uRimCol * rimK * uRimA * (.5 + .5 * up);\n' +
            '#include <opaque_fragment>');
      };
      m.customProgramCacheKey = function(){ return 'pf-toon'; };
    }

    /* ink hull: back faces pushed outward along the screen-space normal by a constant pixel width */
    var inkMat = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.BackSide });
    inkMat.onBeforeCompile = function(s){
      s.uniforms.uRes = U.uRes; s.uniforms.uInk = U.uInk;
      s.vertexShader = s.vertexShader
        .replace('void main() {', 'uniform vec2 uRes; uniform float uInk;\nvoid main() {')
        .replace('#include <begin_vertex>',
          '#ifndef USE_SKINNING\nvec3 objectNormal = vec3(normal);\n#endif\n#include <begin_vertex>')
        .replace('#include <project_vertex>',
          '#include <project_vertex>\n' +
          'vec3 pfN = normalize(normalMatrix * objectNormal);\n' +
          'vec2 pfD = (projectionMatrix * vec4(pfN, 0.)).xy;\n' +
          'if(dot(pfD, pfD) > 1e-8) gl_Position.xy += normalize(pfD) * uInk * 2. / uRes * gl_Position.w;');
    };
    inkMat.customProgramCacheKey = function(){ return 'pf-ink'; };

    var draco = new DRACOLoader(); draco.setDecoderPath(DRACO);
    var loader = new GLTFLoader(); loader.setDRACOLoader(draco);
    var gltf;
    try{ gltf = await loader.loadAsync(opts.url); }
    catch(e){ renderer.dispose(); canvas.remove(); draco.dispose(); throw e; }
    draco.dispose();

    var model = gltf.scene, hulls = [];
    var mul = opts.tint != null ? opts.tint : 0.85;
    model.traverse(function(o){
      if(!o.isMesh) return;
      var old = Array.isArray(o.material) ? o.material[0] : o.material;
      var nm = (old.name || '') + ' ' + (o.name || '');
      var dark = /glass|lens|sunglass|shade/i.test(nm);
      var t = new THREE.MeshToonMaterial({
        map: old.map || null, gradientMap: gradient, side: old.side,
        color: dark ? new THREE.Color(0x0a0a0c) : new THREE.Color(mul, mul, mul),
        alphaMap: old.alphaMap || null, transparent: !!old.transparent, alphaTest: old.alphaTest || 0,
        vertexColors: !!old.vertexColors
      });
      if(dark) t.map = null;
      toonize(t);
      o.material = t; o.frustumCulled = false;
      if(old.transparent) return;
      var hull = o.isSkinnedMesh ? new THREE.SkinnedMesh(o.geometry, inkMat) : new THREE.Mesh(o.geometry, inkMat);
      if(o.isSkinnedMesh) hull.bind(o.skeleton, o.bindMatrix);
      hull.frustumCulled = false; hull.renderOrder = -1;
      hulls.push([o, hull]);
    });
    hulls.forEach(function(p){ p[0].add(p[1]); });

    /* stand the figure on y=0, centered on x/z */
    var box = new THREE.Box3().setFromObject(model), ctr = box.getCenter(new THREE.Vector3()), size = box.getSize(new THREE.Vector3());
    model.position.set(-ctr.x, -box.min.y, -ctr.z);
    var pivot = new THREE.Group(); pivot.add(model); scene.add(pivot);
    var figH = size.y, radius = Math.max(size.x, size.z) / 2;

    var controls = new OrbitControls(camera, canvas);
    controls.enableZoom = false; controls.enablePan = false;
    controls.enableDamping = true; controls.dampingFactor = 0.08; controls.rotateSpeed = 0.9;
    controls.minPolarAngle = Math.PI / 2 - 0.10; controls.maxPolarAngle = Math.PI / 2 + 0.04;
    controls.autoRotateSpeed = opts.spin != null ? opts.spin : 3;
    canvas.style.touchAction = 'pan-y';   /* OrbitControls sets none; keep page scroll on phones */

    var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion:reduce)').matches;
    var externalPause = false, dragging = false, cool = null;
    function applySpin(){ controls.autoRotate = !reduce && !externalPause && !dragging && !cool; }
    controls.addEventListener('start', function(){ dragging = true; clearTimeout(cool); cool = null; applySpin(); canvas.style.cursor = 'grabbing'; });
    controls.addEventListener('end', function(){
      dragging = false; canvas.style.cursor = 'grab';
      clearTimeout(cool); cool = setTimeout(function(){ cool = null; applySpin(); }, 2500); applySpin();
    });
    applySpin();

    var dist = 10;
    function fit(){
      var fr = fig.getBoundingClientRect(), W = Math.max(1, Math.round(fr.width)), H = Math.max(1, Math.round(fr.height));
      renderer.setSize(W, H, false);
      U.uRes.value.set(W * dpr, H * dpr);
      camera.aspect = W / H;
      /* feet land on the disc center; head leaves a small margin at the top */
      var feetY = H * 0.78, top = W < 500 ? 18 : 26;
      if(disc){ var dr = disc.getBoundingClientRect(); if(dr.height > 0) feetY = dr.top + dr.height / 2 - fr.top; }
      var px = Math.max(80, feetY - top);
      U.uInk.value = (opts.ink != null ? opts.ink : Math.min(3.2, Math.max(1.4, px * 0.0042))) * dpr;   /* ink width in CSS px scales with the figure */
      var vis = figH * H / px;                                  /* world height visible across the canvas */
      var tan = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
      dist = vis / (2 * tan);
      var needW = radius * 2 * 1.08;                             /* never clip the arms mid-turn */
      if(vis * camera.aspect < needW){ vis = needW / camera.aspect; dist = vis / (2 * tan); }
      var wpp = vis / H;
      var cy = (feetY - H / 2) * wpp;               /* world y at screen center, feet at y=0 */
      var az = controls.getAzimuthalAngle ? controls.getAzimuthalAngle() : 0;
      camera.position.set(dist * Math.sin(az), cy, dist * Math.cos(az)); controls.target.set(0, cy, 0);
      camera.near = Math.max(0.1, dist - radius * 3); camera.far = dist + radius * 3 + 50;
      camera.updateProjectionMatrix();
      aim.position.set(0, 0, -dist);                              /* the figure, in camera space */
      [key, rimL, rimR].forEach(function(l){ l.position.copy(aim.position).addScaledVector(l.userData.off, dist * 0.6); });
      controls.update();
    }
    camera.position.set(0, 0, 10); controls.update();
    fit();

    var visible = true, running = false, raf = 0, last = 0, lost = false;
    function frame(t){
      raf = requestAnimationFrame(frame);
      var dt = Math.min(0.1, (t - last) / 1000); last = t;
      controls.update(dt);
      renderer.render(scene, camera);
    }
    function run(){ var want = visible && !document.hidden && !lost; if(want && !running){ running = true; last = performance.now(); raf = requestAnimationFrame(frame); } else if(!want && running){ running = false; cancelAnimationFrame(raf); } }
    var io = ('IntersectionObserver' in window) ? new IntersectionObserver(function(es){ visible = es[es.length - 1].isIntersecting; run(); }) : null;
    if(io) io.observe(fig);
    document.addEventListener('visibilitychange', run);   /* removed in dispose() */
    var ro = ('ResizeObserver' in window) ? new ResizeObserver(function(){ fit(); }) : null;
    if(ro) ro.observe(fig); else window.addEventListener('resize', fit);
    canvas.addEventListener('webglcontextlost', function(e){ e.preventDefault(); lost = true; run(); if(opts.onLost) opts.onLost(); });

    controls.update(0); renderer.render(scene, camera);
    run();

    var api = {
      fig: fig, THREE: THREE, scene: scene, camera: camera, controls: controls, uniforms: U, lights: { key: key, rimL: rimL, rimR: rimR }, fit: fit,
      setPaused: function(p){ externalPause = !!p; applySpin(); },
      dispose: function(){ var ix = window.PF3D.instances.indexOf(api); if(ix >= 0) window.PF3D.instances.splice(ix, 1); running = false; lost = true; cancelAnimationFrame(raf); document.removeEventListener('visibilitychange', run); if(io) io.disconnect(); if(ro) ro.disconnect(); else window.removeEventListener('resize', fit); clearTimeout(cool); renderer.dispose(); canvas.remove(); }
    };
    window.PF3D.instances.push(api);   /* live instances in mount order; also handy for debugging */
    return api;
  }

  /* mount(fig, url, extra): fig is the .pf-fig container; its .pf-3d child hosts the canvas and its .pf-disc child
     marks where the feet land. `extra` is merged over the defaults (onLost, tint, spin, ...). */
  function mount(fig, url, extra){
    var host = fig.querySelector('.pf-3d');
    if(!host) return Promise.reject(new Error('no .pf-3d host in figure'));
    var o = { host: host, fig: fig, disc: fig.querySelector('.pf-disc'), url: url };
    for(var k in (extra || {})) if(Object.prototype.hasOwnProperty.call(extra, k)) o[k] = extra[k];
    return start(o);
  }

  window.PF3D = { start: start, mount: mount, instances: [] };
  document.dispatchEvent(new Event('pf3d-ready'));
})();
