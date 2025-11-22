export class Cache {
    #cache = new Map();
    #reapIntervalId;
    #interval;
    constructor(interval) {
        this.#cache = new Map();
        this.#reapIntervalId = undefined;
        this.#interval = interval;
        this.#startReapLoop();
    }
    add(key, val) {
        this.#cache.set(key, {
            createdAt: Date.now(),
            val: val,
        });
    }
    get(key) {
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
