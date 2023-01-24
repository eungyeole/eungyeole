import {
  UseInfiniteQueryOptions,
  UseQueryOptions,
} from "@tanstack/react-query";

export type UseInfiniteQueryCommonOptions<T> = Omit<
  UseInfiniteQueryOptions<T, Error, T>,
  "queryKey" | "queryFn"
>;

export type UseQueryCommonOptions<T, F = T> = Omit<
  UseQueryOptions<T, Error, F>,
  "queryKey" | "queryFn"
>;
