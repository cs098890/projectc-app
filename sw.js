const C='projectc-v202606111814';
const ASSETS=['.','index.html','manifest.webmanifest','icon-180.png','icon-512.png',
'https://cdn.jsdelivr.net/npm/chart.js@4.4.3/dist/chart.umd.min.js',
'https://cdn.jsdelivr.net/npm/chartjs-adapter-date-fns@3.0.0/dist/chartjs-adapter-date-fns.bundle.min.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  if(e.request.url.includes('openfoodfacts')||e.request.url.includes('api.github.com'))return; // live lookups + sync stay network-only
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(n=>{
    if(n.ok&&e.request.method==='GET'){const cl=n.clone();caches.open(C).then(c=>c.put(e.request,cl))}return n})))});
