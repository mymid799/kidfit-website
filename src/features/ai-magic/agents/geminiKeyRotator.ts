/**
 * GEMINI KEY ROTATOR 🔄
 * ─────────────────────────────────────────────────────────────────────
 * Quản lý pool nhiều Gemini API Keys. Tự động:
 * - Xoay vòng qua các key (Round Robin)
 * - Đặt cooldown 60s cho key bị 429 (Rate Limited)
 * - Đặt cooldown 24h cho key bị 429 hết ngày (Quota Exceeded)
 * - Log trạng thái của từng key
 *
 * Kết quả: 4 keys = 60 req/phút thay vì 15 req/phút
 */

interface KeyStatus {
    key: string;
    label: string;
    cooldownUntil: Date | null;
    totalCalls: number;
    failCount: number;
}

class GeminiKeyRotatorClass {
    private keyPool: KeyStatus[] = [];
    private currentIndex = 0;

    constructor() {
        this.initKeys();
    }

    private initKeys() {
        const rawKeys = [
            process.env.GEMINI_API_KEY,
            process.env.GEMINI_KEY_2,
            process.env.GEMINI_KEY_3,
            process.env.GEMINI_KEY_4,
        ];

        this.keyPool = rawKeys
            .filter(k => k && k.trim().length > 0)
            .map((key, idx) => ({
                key: key!.trim(),
                label: `Key-${idx + 1}`,
                cooldownUntil: null,
                totalCalls: 0,
                failCount: 0,
            }));

        console.log(`🔑 [Key Rotator] Đã nạp ${this.keyPool.length} Gemini key(s).`);
    }

    /**
     * Lấy key tiếp theo khả dụng (không trong cooldown)
     */
    getNextKey(): string {
        const now = new Date();
        const totalKeys = this.keyPool.length;

        // Duyệt qua toàn bộ pool để tìm key không bị cooldown
        for (let i = 0; i < totalKeys; i++) {
            const candidate = this.keyPool[this.currentIndex % totalKeys];
            this.currentIndex = (this.currentIndex + 1) % totalKeys;

            if (!candidate.cooldownUntil || candidate.cooldownUntil <= now) {
                candidate.totalCalls++;
                console.log(`🔑 [Key Rotator] Sử dụng ${candidate.label} | Calls: ${candidate.totalCalls}`);
                return candidate.key;
            }
        }

        // Tất cả key đang bị cooldown → tìm key có cooldown ngắn nhất
        const soonestKey = this.keyPool.reduce((a, b) => {
            if (!a.cooldownUntil) return a;
            if (!b.cooldownUntil) return b;
            return a.cooldownUntil < b.cooldownUntil ? a : b;
        });

        const waitMs = soonestKey.cooldownUntil
            ? Math.max(0, soonestKey.cooldownUntil.getTime() - now.getTime())
            : 0;

        console.warn(`⚠️ [Key Rotator] Tất cả key đều bị cooldown. Key khả dụng sớm nhất: ${soonestKey.label} sau ${Math.ceil(waitMs / 1000)}s`);

        // Trả về key sẽ sớm hết cooldown nhất (chấp nhận lỗi ở tầng trên)
        soonestKey.totalCalls++;
        return soonestKey.key;
    }

    /**
     * Đánh dấu một key bị rate limited (429) - cooldown 65 giây
     */
    markRateLimited(key: string) {
        const target = this.keyPool.find(k => k.key === key);
        if (target) {
            target.cooldownUntil = new Date(Date.now() + 65_000); // 65 giây
            target.failCount++;
            console.warn(`🚫 [Key Rotator] ${target.label} bị Rate Limit → cooldown 65s (Lần lỗi: ${target.failCount})`);
        }
    }

    /**
     * Đánh dấu một key bị hết quota ngày - cooldown 24 giờ
     */
    markQuotaExceeded(key: string) {
        const target = this.keyPool.find(k => k.key === key);
        if (target) {
            target.cooldownUntil = new Date(Date.now() + 24 * 3600_000); // 24 giờ
            target.failCount++;
            console.error(`❌ [Key Rotator] ${target.label} hết quota ngày → cooldown 24h`);
        }
    }

    /**
     * Lấy danh sách trạng thái của tất cả key (dùng để debug / dashboard)
     */
    getStatus() {
        const now = new Date();
        return this.keyPool.map(k => ({
            label: k.label,
            status: !k.cooldownUntil || k.cooldownUntil <= now ? '✅ Available' : `⏳ Cooldown ${Math.ceil((k.cooldownUntil.getTime() - now.getTime()) / 1000)}s`,
            calls: k.totalCalls,
            fails: k.failCount,
        }));
    }

    get poolSize(): number {
        return this.keyPool.length;
    }
}

// Singleton - toàn bộ ứng dụng dùng chung 1 instance
export const GeminiKeyRotator = new GeminiKeyRotatorClass();
