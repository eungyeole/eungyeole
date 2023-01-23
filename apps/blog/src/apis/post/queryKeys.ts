export const postQueryKeys = {
  all: ["postQueryKeys"],
  postList: (limit: number, page: number) => [
    ...postQueryKeys.all,
    "postList",
    { limit, page },
  ],
  post: (id: string) => [...postQueryKeys.all, "post", id],
};
