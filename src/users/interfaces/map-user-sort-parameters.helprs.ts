import { UserSortEnum } from '../enums/user-sort.enum';
import { IUser } from './user.interface';

export function mapUserSortParametersHelper(sort: string | undefined) {
  const _sort: Partial<Record<keyof IUser, any>> = {};

  if (sort) {
    const sortArray = sort.split(',');

    sortArray.forEach((sortOption) => {
      // sort by age
      if (sortOption === UserSortEnum.DATE_OF_BIRTH_ASC) {
        _sort.dateOfBirth = -1;
      } else if (sortOption === UserSortEnum.DATE_OF_BIRTH_DESC) {
        _sort.dateOfBirth = 1;
      }

      // sort by account creation date
      if (sortOption === UserSortEnum.NEWEST) {
        _sort.createdAt = -1;
      } else if (sortOption === UserSortEnum.OLDEST) {
        _sort.createdAt = 1;
      }
    });
  } else {
    _sort.createdAt = -1;
  }

  return _sort;
}
