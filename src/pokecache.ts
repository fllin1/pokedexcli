export type CacheEntry<T> = {
  createdAt: number;
  val: T;
};

export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: NodeJS.Timeout | undefined;
  #interval: number;

  constructor(interval: number) {
    this.#cache = new Map<string, CacheEntry<any>>();
    this.#reapIntervalId = undefined;
    this.#interval = interval;

    this.#startReapLoop();
  }

  add<T>(key: string, val: T): void {
    this.#cache.set(key, {
      createdAt: Date.now(),
      val: val,
    });
  }

  get<T>(key: string): T | undefined {
    this.#reap();
    return this.#cache.get(key)?.val;
  }

  #reap() {
    const threshold = Date.now() - this.#interval;
    for (const [key, entry] of this.#cache.entries()) {
      if (entry.createdAt < threshold) {
        this.#cache.delete(key);
      }
    }
  }

  #startReapLoop() {
    this.#reapIntervalId = setInterval(() => this.#reap(), this.#interval);
  }

  stopReapLoop() {
    clearInterval(this.#reapIntervalId);
    this.#reapIntervalId = undefined;
  }
}
