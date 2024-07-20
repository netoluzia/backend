import { Customer } from '@prisma/client'
import {
  HttpResponse,
  IController,
  IRepository,
  Message,
  StatusCode,
} from '../../types/global.interfaces'
import {
  createCustomer,
  TCreateCustomer,
  TUpdateCustomer,
  updateCustomer,
} from '../../validator/customer.validator'

export class CustomerController
  implements IController<Customer, TCreateCustomer, TUpdateCustomer>
{
  constructor(
    private readonly repository: IRepository<
      Customer,
      TCreateCustomer,
      TUpdateCustomer
    >
  ) {}
  async index(payload: {
    search?: string
    page?: number
    perPage?: number
    orderBy?: any
  }): Promise<HttpResponse<Customer[]>> {
    try {
      const response = await this.repository.index(payload)
      return {
        message: Message.OK,
        body: response,
        status: StatusCode.OK,
        success: true,
      }
    } catch (error: any) {
      return {
        message: error.message,
        status: StatusCode.SERVER_ERROR,
        success: false,
      }
    }
  }
  async show(id: string): Promise<HttpResponse<Customer>> {
    try {
      const response = await this.repository.show(id)
      return {
        message: Message.OK,
        body: response,
        status: StatusCode.OK,
        success: true,
      }
    } catch (error) {
      return {
        message: Message.OK,
        status: StatusCode.OK,
        success: true,
      }
    }
  }
  async create(payload: TCreateCustomer): Promise<HttpResponse<Customer>> {
    try {
      const payloadValidated = createCustomer.parse(payload)
      const response = await this.repository.create(payloadValidated)
      return {
        message: Message.OK,
        body: response,
        status: StatusCode.OK,
        success: true,
      }
    } catch (error: any) {
      return {
        message: error.message,
        status: StatusCode.OK,
        success: true,
      }
    }
  }
  async update(
    id: string,
    payload: TUpdateCustomer
  ): Promise<HttpResponse<Customer>> {
    try {
      const payloadValidated = updateCustomer.parse(payload)
      const response = await this.repository.update(id, payloadValidated)
      return {
        message: Message.OK,
        body: response,
        status: StatusCode.OK,
        success: true,
      }
    } catch (error: any) {
      return {
        message: error.message,
        status: StatusCode.OK,
        success: true,
      }
    }
  }
  async softDelete(id: string): Promise<HttpResponse<Customer>> {
    try {
      const response = await this.repository.softDelete(id)
      return {
        message: Message.OK,
        body: response,
        status: StatusCode.OK,
        success: true,
      }
    } catch (error) {
      return {
        message: Message.OK,
        status: StatusCode.OK,
        success: true,
      }
    }
  }
  async destroy(id: string): Promise<HttpResponse<Customer>> {
    try {
      const response = await this.repository.destroy(id)
      return {
        message: Message.OK,
        body: response,
        status: StatusCode.OK,
        success: true,
      }
    } catch (error) {
      return {
        message: Message.OK,
        status: StatusCode.OK,
        success: true,
      }
    }
  }
  async searchByName(name: string): Promise<HttpResponse<Customer[]>> {
    try {
      if (!this.repository.searchByName) throw new Error('Nao implementado')
      const response = await this.repository.searchByName(name)
      return {
        message: Message.OK,
        body: response,
        status: StatusCode.OK,
        success: true,
      }
    } catch (error) {
      return {
        message: Message.OK,
        status: StatusCode.OK,
        success: true,
      }
    }
  }
}
