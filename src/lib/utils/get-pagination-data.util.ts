import { Model } from 'mongoose';

export async function getPaginationDataUtil<T>(
  limit: string | number | undefined,
  page: string | number | undefined,
  model: Model<T>
) {
  const _limit = limit ? +limit : 20;
  const _page = page ? +page : 1;
  const skip = (_page - 1) * _limit;
  const totalProducts = await model.countDocuments();
  const totalPages = Math.ceil(totalProducts / _limit);

  return { skip, _limit, totalPages, _page };
}
