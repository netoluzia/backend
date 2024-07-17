import { $Enums, Invoice } from '@prisma/client'
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
import { generateHashes, generateReference } from '../../utils/invoice'

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
    category?: string
  }): Promise<HttpResponse<Invoice[]>> {
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
        status: StatusCode.OK,
        success: true,
      }
    }
  }
  async indexByStatus(payload: {
    search?: string
    page?: number
    perPage?: number
    status?: string
  }): Promise<HttpResponse<Invoice[]>> {
    try {
      if (!this.repository.indexByStatus) throw new Error('Deu merda')
      const response = await this.repository.indexByStatus(payload)
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
      const payloadToValidate = payload
      payloadToValidate.hash4 = generateHashes(4)
      payloadToValidate.hash64 = generateHashes(64)
      payloadToValidate.reference = await generateReference(payload.type)
      payloadToValidate.serie = String(new Date().getFullYear())

      if (payload.type == 'FR' || payload.type == 'RC') {
        if (payload.amount_received && payload.amount_received < payload.total)
          throw new Error('Insira um montante válido')
        payloadToValidate.status = 'PAGO'
      }

      if (
        payload.type == 'NC' ||
        payload.type == 'RC' ||
        payload.type == 'ND'
      ) {
        if (payload.invoiceId) throw new Error('Insira uma referência válida')
      }

      if (payload.type == 'FT') {
        payloadToValidate.status = 'POR_PAGAR'
      }

      const payloadValidated = createInvoice.parse(payloadToValidate)
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

  async filter(search: string): Promise<HttpResponse<Invoice[]>> {
    try {
      if (!this.repository.filter) throw new Error('Nao implemementado')
      const response = await this.repository.filter(search)
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

  async invoiceFromInsurance(
    payload: {
      search?: string
      page: number
      perPage: number
      orderBy?: any
      category?: string
    },
    insuranceId: string,
    statusOfDocument: string
  ): Promise<HttpResponse<Invoice[]>> {
    try {
      if (!this.repository.invoiceFromInsurance)
        throw new Error('Nor implemeyted')
      const response = await this.repository.invoiceFromInsurance(
        payload,
        insuranceId,
        statusOfDocument
      )
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
}
