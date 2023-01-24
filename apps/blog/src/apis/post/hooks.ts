import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { ResponsePost, ResponsePostList } from "../../dto/post";
import { useCommonInfiniteQuery } from "../hooks";
import { UseInfiniteQueryCommonOptions, UseQueryCommonOptions } from "../types";
import { getPostApi, getPostListApi } from "./apis";
import { postQueryKeys } from "./queryKeys";

export const usePostListInfiniteQuery = (
  {
    limit = 10,
    page = 0,
  }: {
    limit?: number;
    page?: number;
  },
  options?: UseInfiniteQueryCommonOptions<ResponsePostList>
) => {
  return useCommonInfiniteQuery<ResponsePostList>(
    postQueryKeys.postList(limit, page),
    ({ pageParam = page }) =>
      getPostListApi({
        page: pageParam,
        limit: limit,
      }),
    options
  );
};

export const usePostListQuery = <T extends ResponsePostList = ResponsePostList>(
  {
    limit = 10,
    page = 0,
  }: {
    limit?: number;
    page?: number;
  },
  options?: UseQueryCommonOptions<ResponsePostList, T>
) => {
  return useQuery<ResponsePostList, Error, T>(
    postQueryKeys.postList(limit, page),
    () =>
      getPostListApi({
        page: page,
        limit: limit,
      }),
    options
  );
};

export const usePostQuery = (
  { id }: { id: string },
  options?: UseQueryCommonOptions<ResponsePost>
) => {
  return useQuery<ResponsePost, Error>(
    postQueryKeys.post(id),
    () => getPostApi(id),
    options
  );
};
