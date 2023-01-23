import {
  QueryFunction,
  QueryKey,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { CommonPageResponse } from "../dto/common";
import { UseInfiniteQueryCommonOptions } from "./types";

export const useCommonInfiniteQuery = <
  T extends CommonPageResponse<unknown> = CommonPageResponse<unknown>
>(
  queryKey: QueryKey,
  queryFn: QueryFunction<T>,
  options?: UseInfiniteQueryCommonOptions<T>
) => {
  return useInfiniteQuery<T, Error>(queryKey, queryFn, {
    getNextPageParam: (lastPage) => {
      return lastPage.hasNext ? lastPage.page + 1 : null;
    },
    ...options,
  });
};
