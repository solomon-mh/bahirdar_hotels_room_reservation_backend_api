import { Model } from 'mongoose';

export async function getPaginationDataUtil<T>(
  limit: string | number | undefined,
  page: string | number | undefined,
  model: Model<T>,
  condition?: any
): Promise<{
  skip: number;
  _limit: number;
  totalPages: number;
  _page: number;
}> {
  const _limit = limit ? +limit : 10;
  const _page = page ? +page : 1;
  const skip = (_page - 1) * _limit;
  const totalProducts = condition
    ? await model.countDocuments(condition)
    : await model.countDocuments();
  const totalPages = Math.ceil(totalProducts / _limit);

  return { skip, _limit, totalPages, _page };
}
