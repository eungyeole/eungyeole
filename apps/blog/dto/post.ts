import * as db from "database";
import { CommonPageResponse } from "./common";

export class ResponsePost {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  content: string;
  categories: string[];
  createdAt: string;
  thumbnailUrl: string | null;

  constructor(post: db.Post) {
    this.id = post.id;
    this.slug = post.slug;
    this.title = post.title;
    this.description = post.description;
    this.content = JSON.parse(JSON.stringify(post.content));
    this.categories = post.categories;
    this.createdAt = post.createdAt.toISOString();
    this.thumbnailUrl = post.thumbnailUrl;
  }
}

export class ResponsePostList extends CommonPageResponse<ResponsePost> {
  constructor(total: number, limit: number, page: number, datas: db.Post[]) {
    super(
      total,
      limit,
      page,
      datas.map((post) => new ResponsePost(post))
    );
  }
}
