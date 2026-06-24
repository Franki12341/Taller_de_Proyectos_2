const cacheStore = new Map();

function simpleCache(durationSeconds = 60) {
  return function cacheMiddleware(req, res, next) {
    if (req.method !== "GET") {
      return next();
    }

    const key = req.originalUrl;
    const cached = cacheStore.get(key);

    if (cached && cached.expiresAt > Date.now()) {
      res.set("X-Cache", "HIT");
      res.set("Cache-Control", `public, max-age=${durationSeconds}`);
      return res.json(cached.payload);
    }

    const originalJson = res.json.bind(res);

    res.json = (payload) => {
      cacheStore.set(key, {
        payload,
        expiresAt: Date.now() + durationSeconds * 1000
      });

      res.set("X-Cache", "MISS");
      res.set("Cache-Control", `public, max-age=${durationSeconds}`);
      return originalJson(payload);
    };

    return next();
  };
}

module.exports = simpleCache;