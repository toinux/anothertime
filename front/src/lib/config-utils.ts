import type { AnothertimeConfig, ConfigPath, ConfigPathValue } from '@/types/config.ts';

export type DeepPartial<T> = T extends object ? { [K in keyof T]?: DeepPartial<T[K]> } : T;

export function buildConfigPatch<P extends ConfigPath>(
    path: P,
    value: ConfigPathValue<P>
): DeepPartial<AnothertimeConfig> {
    const keys = path.split('.');
    const result: Record<string, unknown> = {};
    let current = result;

    keys.forEach((key, index) => {
        if (index === keys.length - 1) {
            current[key] = value;
        } else {
            const next: Record<string, unknown> = {};
            current[key] = next;
            current = next;
        }
    });

    return result as DeepPartial<AnothertimeConfig>;
}
