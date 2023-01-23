export class CommonPageResponse<T> {
  datas: T[];
  total: number;
  page: number;
  hasNext: boolean;
  hasPrev: boolean;

  constructor(total: number, limit: number, page: number, datas: T[]) {
    this.total = total;
    this.datas = datas;
    this.page = Number(page);
    this.hasNext = total > limit * (page + 1);
    this.hasPrev = page > 0;
  }
}
