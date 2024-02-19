import { IGetUserController, IGetUserRepository } from "./protocols";

export class GetUserController implements IGetUserController {
  constructor(private readonly getUsersRepository: IGetUserRepository) {
  }

  async handle() {
    // Validar requisicao
    //  Direcionar chamada para o Repository
    try {
      const users = await this.getUsersRepository.getUsers()
      return {
        statusCode: 200,
        body: users
      }
    } catch (error) {
      return {
        statusCode: 200,
        body: 'Something went wrong'
      }
    }
  }
}
