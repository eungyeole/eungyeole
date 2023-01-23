import client from "database";
import { NextApiRequest, NextApiResponse } from "next";

const PostHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const posts = await client.post.findMany({
    take: 10,
  });

  res.json(posts);
};

export default PostHandler;
