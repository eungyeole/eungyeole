import { useRouter } from "next/router";

export const usePostId = () => {
  const router = useRouter();
  const { postId } = router.query;

  return String(postId);
};
