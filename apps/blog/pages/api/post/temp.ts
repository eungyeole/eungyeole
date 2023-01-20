import client, { Post } from "database";
import { NextApiRequest, NextApiResponse } from "next";

const tempPostHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, content, ...body } = JSON.parse(req.body) as Omit<
    Post,
    "createdAt"
  >;

  const jsonContent = JSON.parse(JSON.stringify(content));

  const result = await client.post.upsert({
    where: {
      id: id,
    },
    create: {
      ...body,
      content: jsonContent,
      createdAt: new Date().toString(),
    },
    update: {
      ...body,
      content: jsonContent,
    },
  });

  res.json(result);
};

export default tempPostHandler;
