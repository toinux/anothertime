import { z } from 'zod';

type HexColor = `#${string}`;
const hexColorSchema = z.custom<HexColor>((val) => typeof val === 'string' && /^#[0-9A-Fa-f]{6}$/.test(val), {
    message: 'Doit être une couleur hexadécimale valide (ex: #FF00AA)'
});
const namedColors = ['default'] as const;
const namedColorSchema = z.enum(namedColors);
const colorSchema = z.union([namedColorSchema, hexColorSchema]).nullable();
const iconSchema = z.object({
    name: z.string().nullable(),
    x: z.number(),
    y: z.number()
});

export const anothertimeConfigSchema = z.object({
    time: z.object({
        animation: z.enum(['NONE', 'SCROLL', 'FADE']),
        separator: z.enum(['NONE', 'BLINK', 'FADE']),
        hourColor: colorSchema,
        minutesColor: colorSchema,
        separatorColor: colorSchema
    }),
    week: z.object({
        startSunday: z.boolean(),
        style: z.enum(['LARGE', 'PROGRESS', 'DOTTED', 'DOTTED2']),
        dayColor: colorSchema,
        weekColor: colorSchema
    }),
    widgets: z.object({
        animation: z.enum(['NONE', 'SCROLL', 'FADE']),
        calendar: z.object({
            enabled: z.boolean(),
            style: z.enum(['SMALL', 'LARGE', 'ICON']),
            color: colorSchema,
            icon: iconSchema,
            headColor: colorSchema,
            bodyColor: colorSchema,
            textColor: colorSchema
        }),
        temperature: z.object({
            enabled: z.boolean(),
            fahrenheit: z.boolean(),
            color: colorSchema,
            icon: iconSchema
        }),
        humidity: z.object({
            enabled: z.boolean(),
            icon: iconSchema,
            color: colorSchema
        })
    }),
    seconds: z.object({
        color: colorSchema,
        backgroundColor: colorSchema
    })
});

export type AnothertimeConfig = z.infer<typeof anothertimeConfigSchema>;
type Color = z.infer<typeof colorSchema>;
export type Icon = z.infer<typeof iconSchema>;

export type Paths<T> = T extends object
    ? {
          [K in keyof T]-?: K extends string ? (T[K] extends object ? `${K}` | `${K}.${Paths<T[K]>}` : `${K}`) : never;
      }[keyof T]
    : never;

export type ConfigPath = Paths<AnothertimeConfig>;

export type PathValue<T, P extends string> = P extends `${infer K}.${infer Rest}`
    ? K extends keyof T
        ? PathValue<T[K], Rest>
        : never
    : P extends keyof T
      ? T[P]
      : never;

export type ConfigPathValue<P extends string> = PathValue<AnothertimeConfig, P>;

type PathsOfType<ValueType> = {
    [P in ConfigPath]: PathValue<AnothertimeConfig, P> extends ValueType ? P : never;
}[ConfigPath];

export type BooleanPath = PathsOfType<boolean>;
export type SelectPath = PathsOfType<string>;
export type ColorPath = PathsOfType<Color>;
export type IconPath = PathsOfType<Icon>;

const makeGuard =
    <T>(schema: z.ZodType<T>) =>
    (value: unknown): value is T =>
        schema.safeParse(value).success;

export const isColor = makeGuard(colorSchema);
