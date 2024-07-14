import { $Enums, ExpendableMaterial } from '@prisma/client'
import {
  HttpResponse,
  IController,
  IRepository,
  Message,
  StatusCode,
} from '../../types/global.interfaces'
import {
  createExpendableMaterial,
  TCreateExpendableMaterial,
  TUpdateExpendableMaterial,
  updateExpendableMaterial,
} from '../../validator/material.validator'

export class ExpendableMaterialController
  implements
    IController<
      ExpendableMaterial,
      TCreateExpendableMaterial,
      TUpdateExpendableMaterial
    >
{
  constructor(
    private readonly repository: IRepository<
      ExpendableMaterial,
      TCreateExpendableMaterial,
      TUpdateExpendableMaterial
    >
  ) {}
  async index(payload: {
    search?: string
    page?: number
    perPage?: number
    category?: string
    orderBy?: any
  }): Promise<HttpResponse<ExpendableMaterial[]>> {
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
  async show(id: string): Promise<HttpResponse<ExpendableMaterial>> {
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
  async create(
    payload: TCreateExpendableMaterial
  ): Promise<HttpResponse<ExpendableMaterial>> {
    try {
      const payloadValidated = createExpendableMaterial.parse(payload)
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
    payload: TUpdateExpendableMaterial
  ): Promise<HttpResponse<ExpendableMaterial>> {
    try {
      const payloadValidated = updateExpendableMaterial.parse(payload)
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
  async softDelete(id: string): Promise<HttpResponse<ExpendableMaterial>> {
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
  async destroy(id: string): Promise<HttpResponse<ExpendableMaterial>> {
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
  async searchByName(
    name: string
  ): Promise<HttpResponse<ExpendableMaterial[]>> {
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
