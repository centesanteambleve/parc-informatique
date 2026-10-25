// Service worker minimal : toujours la dernière version en ligne,
// copie de secours de la page si pas de réseau.
const CACHE = "parc-info-v1";
self.addEventListener("install", e => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.mode !== "navigate") return; // Firebase, scripts, etc. : comportement normal
  e.respondWith(
    fetch(req).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put("./", copy));
      return res;
    }).catch(() => caches.match("./"))
  );
});
