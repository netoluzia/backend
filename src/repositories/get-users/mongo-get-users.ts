import { IGetUserRepository } from "../../controllers/get-users/protocols";
import { User } from "../../models/User";

export class MongoGetUsersRepository implements IGetUserRepository {
  async getUsers(): Promise<User[]> {
    return [
      {
        name: 'Honorio',
        email: 'honorio@email.com',
        password: '123'
      },
      {
        name: 'Jose',
        email: 'jose@email.com',
        password: '123'
      },
    ]
  }
}