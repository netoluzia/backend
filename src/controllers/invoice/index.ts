import { Invoice } from '@prisma/client'
import {
  HttpResponse,
  IController,
  IRepository,
  Message,
  StatusCode,
} from '../../types/global.interfaces'
import {
  createInvoice,
  TCreateInvoice,
  TUpdateInvoice,
  updateInvoice,
} from '../../validator/invoice.validator'

export class InvoiceController
  implements IController<Invoice, TCreateInvoice, TUpdateInvoice>
{
  constructor(
    private readonly repository: IRepository<
      Invoice,
      TCreateInvoice,
      TUpdateInvoice
    >
  ) {}
  async index(payload: {
    search?: string
    page?: number
    perPage?: number
  }): Promise<HttpResponse<Invoice[]>> {
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
  async show(id: string): Promise<HttpResponse<Invoice>> {
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
  async create(payload: TCreateInvoice): Promise<HttpResponse<Invoice>> {
    try {
      const payloadValidated = createInvoice.parse(payload)
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
    payload: TUpdateInvoice
  ): Promise<HttpResponse<Invoice>> {
    try {
      const payloadValidated = updateInvoice.parse(payload)
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
  async softDelete(id: string): Promise<HttpResponse<Invoice>> {
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
  async destroy(id: string): Promise<HttpResponse<Invoice>> {
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
}
