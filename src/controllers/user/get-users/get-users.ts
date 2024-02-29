import { IGetUserController, IGetUsersRepository } from "./protocols";

export class GetUserController implements IGetUserController {
  constructor(private readonly getUsersRepository: IGetUsersRepository) {
  }

  async handle() {
    try {
      const users = await this.getUsersRepository.getUsers()
      return {
        statusCode: 200,
        body: users
      }
    } catch (error) {
      console.log(error)
      return {
        statusCode: 200,
        body: 'Something went wrong'
      }
    }
  }
}
