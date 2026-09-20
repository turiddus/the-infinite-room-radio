const CACHE='tir-radio-v4-pro3';
const CORE=['./manifest.webmanifest','./icon.svg'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(u.origin!==location.origin) return;
  if(u.pathname.endsWith('/monitor.html')){
    e.respondWith(fetch(new Request(e.request,{cache:'no-store'})));
    return;
  }
  if(e.request.mode==='navigate' || u.pathname.endsWith('/index.html') || u.pathname.endsWith('/the-infinite-room-radio/')){
    e.respondWith(fetch(e.request).then(resp=>resp).catch(()=>caches.match('./index.html')));
    return;
  }
  e.respondWith(fetch(e.request).then(resp=>{const copy=resp.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return resp}).catch(()=>caches.match(e.request)));
});