import Posts from "src/components/worksapce/posts";
import { NextPageWithAuth } from "src/types";

const PostsPage: NextPageWithAuth = () => {
  return <Posts />;
};

PostsPage.requireAuth = true;

export default PostsPage;
