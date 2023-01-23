import { ResponsePost, ResponsePostList } from "../../dto/post";
import { apiClient } from "../client";
import * as db from "database";

export const getPostListApi = async ({
  limit,
  page,
}: {
  limit: number;
  page: number;
}) => {
  return await apiClient.get<ResponsePostList>("/post", {
    limit,
    page,
  });
};

export const getPostApi = async (id: string) => {
  return await apiClient.get<ResponsePost>(`/post/${id}`);
};

export const createPostApi = async (body: db.Prisma.PostCreateInput) => {
  return await apiClient.post<ResponsePost>("/post", body);
};

export const updatePostApi = async (
  id: string,
  body: db.Prisma.PostCreateInput
) => {
  return await apiClient.put<ResponsePost>(`/post/${id}`, body);
};
