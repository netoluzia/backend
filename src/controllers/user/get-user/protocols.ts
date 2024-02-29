import { User } from '../../../models/User'

export interface IGetUserRepository {
  getUser(): Promise<User>
}
