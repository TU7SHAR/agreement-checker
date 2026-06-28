// Simple in-memory rate limiter for API protection
// In production with multiple instances, use Redis-based rate limiting

const requests = new Map();

const WINDOW_MS = 60 * 1000; // 1 minute window
const MAX_REQUESTS_PER_WINDOW = 5; // 5 requests per minute per IP
const CLEANUP_INTERVAL = 5 * 60 * 1000; // Clean up every 5 minutes

// Periodic cleanup of old entries
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, data] of requests.entries()) {
      if (now - data.windowStart > WINDOW_MS * 2) {
        requests.delete(key);
      }
    }
  }, CLEANUP_INTERVAL);
}

export function checkRateLimit(identifier, options = {}) {
  const {
    windowMs = WINDOW_MS,
    maxRequests = MAX_REQUESTS_PER_WINDOW,
  } = options;

  const now = Date.now();
  const key = identifier;

  if (!requests.has(key)) {
    requests.set(key, {
      count: 1,
      windowStart: now,
    });
    return { allowed: true, remaining: maxRequests - 1, resetIn: windowMs };
  }

  const data = requests.get(key);

  // Reset window if expired
  if (now - data.windowStart > windowMs) {
    data.count = 1;
    data.windowStart = now;
    return { allowed: true, remaining: maxRequests - 1, resetIn: windowMs };
  }

  // Check if limit exceeded
  if (data.count >= maxRequests) {
    const resetIn = windowMs - (now - data.windowStart);
    return { allowed: false, remaining: 0, resetIn };
  }

  // Increment counter
  data.count++;
  return {
    allowed: true,
    remaining: maxRequests - data.count,
    resetIn: windowMs - (now - data.windowStart),
  };
}

export function getClientIP(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIP = request.headers.get("x-real-ip");
  if (realIP) {
    return realIP;
  }
  return "unknown";
}
