import { $Enums, Protocol } from '@prisma/client'
import {
  HttpResponse,
  IController,
  IRepository,
  Message,
  StatusCode,
} from '../../types/global.interfaces'
import {
  createProtocol,
  TCreateProtocol,
  TUpdateProtocol,
  updateProtocol,
} from '../../validator/protocol.validator'

export class ProtocolController
  implements IController<Protocol, TCreateProtocol, TUpdateProtocol>
{
  constructor(
    private readonly repository: IRepository<
      Protocol,
      TCreateProtocol,
      TUpdateProtocol
    >
  ) {}
  async index(payload: {
    search?: string
    page?: number
    perPage?: number
    category?: string
    orderBy?: any
  }): Promise<HttpResponse<Protocol[]>> {
    try {
      const response = await this.repository.index(payload)
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
  async show(id: string): Promise<HttpResponse<Protocol>> {
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
  async create(payload: TCreateProtocol): Promise<HttpResponse<Protocol>> {
    try {
      const payloadValidated = createProtocol.parse(payload)
      const response = await this.repository.create(payloadValidated)
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
  async update(
    id: string,
    payload: TUpdateProtocol
  ): Promise<HttpResponse<Protocol>> {
    try {
      const payloadValidated = updateProtocol.parse(payload)
      const response = await this.repository.update(id, payloadValidated)
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
  async softDelete(id: string): Promise<HttpResponse<Protocol>> {
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
  async destroy(id: string): Promise<HttpResponse<Protocol>> {
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
  async searchByName(name: string): Promise<HttpResponse<Protocol[]>> {
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
