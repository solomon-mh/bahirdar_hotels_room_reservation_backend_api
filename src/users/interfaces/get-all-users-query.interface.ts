import { Gender } from '../../lib/shared/gender.enum';
import { IGetAllQuery } from '../../lib/shared/get-all-query.interface';
import { UserRole } from '../enums/user-role.enum';

export interface IGetAllUsersQuery extends IGetAllQuery {
  gender?: Gender;
  role?: UserRole;
  isVerified?: boolean;
}
