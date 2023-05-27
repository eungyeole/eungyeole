export type TransientProps<T extends string> = `$${T}`;

export type PropsToTransientProps<T> = {
  [K in keyof T as TransientProps<K & string>]: T[K];
};
