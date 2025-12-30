self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      try {
        const keys = await caches.keys();
        await Promise.all(keys.map((key) => caches.delete(key)));
      } catch (e) {
        // ignore cache errors
      }

      try {
        await self.registration.unregister();
      } catch (e) {
        // ignore unregister errors
      }
    })()
  );
});
