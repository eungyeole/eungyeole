import client, * as db from "database";
import type { NextApiResponse } from "next";
import {
  BadRequestException,
  Body,
  createHandler,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
} from "next-api-decorators";
import { ResponsePost, ResponsePostList } from "../../../dto/post";

class PostHandler {
  @Get()
  public async getPosts(
    @Query("limit") limit: number = 10,
    @Query("page") page: number = 0
  ) {
    const [total, postList] = await Promise.all([
      client.post.count(),
      client.post.findMany({
        take: Number(limit),
        skip: Number(page),
      }),
    ]);

    return new ResponsePostList(total, limit, page, postList);
  }

  @Get("/:id")
  public async getPost(@Param("id") id: db.Prisma.PostWhereUniqueInput["id"]) {
    try {
      const post = await client.post.findUniqueOrThrow({
        where: {
          id,
        },
      });

      return new ResponsePost(post);
    } catch (e) {
      if (e instanceof db.Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestException(e.message);
      }
      throw e;
    }
  }

  @Post("/:id/revalidate")
  public async revalidatePost(
    @Param("id") id: db.Prisma.PostWhereInput["id"],
    @Res() res: NextApiResponse
  ) {
    if (!id) return new BadRequestException("id is required");

    try {
      await res.revalidate(`/post/${id}`);

      return {
        revalidated: true,
      };
    } catch (e) {
      throw new BadRequestException("revalidate failed");
    }
  }

  @Post()
  public async createPost(@Body() body: db.Prisma.PostCreateInput) {
    const post = await client.post.create({
      data: body,
    });

    return new ResponsePost(post);
  }

  @Put("/:id")
  public async updatePost(
    @Param("id") id: db.Prisma.PostWhereUniqueInput["id"],
    @Body() body: db.Prisma.PostCreateInput
  ) {
    const post = await client.post.update({
      where: {
        id,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });

    return new ResponsePost(post);
  }
}

export default createHandler(PostHandler);