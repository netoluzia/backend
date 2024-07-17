export enum StatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  SERVER_ERROR = 500,
}

export enum Message {
  OK = 'Operação realizada com sucesso',
  WRONG_PWD = 'Palavra-passe errada',
  LOGIN_SUCCEED = 'Login feito com sucesso',
  INTERNAL_ERROR = 'Erro de servidor',
  UNKNOWN_USER = 'Usuario desconhecido',
}
export interface Meta<Entity> {
  meta?: {
    perPage?: number
    page?: number
    search?: string
    total?: number
    totalPages?: number
  }
  data: Entity | null
}

export interface HttpResponse<Entity> {
  status: StatusCode
  success: boolean
  message: Message | string
  body?: Meta<Entity>
}

export interface IController<Entity, CreateRecord, UpdateRecord> {
  index(payload: {
    search?: string
    page: number
    perPage: number
    orderBy?: any
    category?: string
  }): Promise<HttpResponse<Entity[]>>
  indexByStatus?(payload: {
    search?: string
    page: number
    perPage: number
    orderBy?: any
    status?: string
  }): Promise<HttpResponse<Entity[]>>
  show(id: string): Promise<HttpResponse<Entity>>
  create(payload: CreateRecord): Promise<HttpResponse<Entity>>
  update(id: string, payload: UpdateRecord): Promise<HttpResponse<Entity>>
  softDelete(id: string): Promise<HttpResponse<Entity>>
  destroy(id: string): Promise<HttpResponse<Entity>>
  searchByName?(name: string): Promise<HttpResponse<Entity[]>>
  filter?(search: string): Promise<HttpResponse<Entity[]>>
  invoiceFromInsurance?(
    payload: {
      search?: string
      page: number
      perPage: number
      orderBy?: any
      category?: string
    },
    insuranceId: string,
    statusOfDocument: string
  ): Promise<HttpResponse<Entity[]>>
}

export interface IRepository<Entity, CreateRecord, UpdateRecord> {
  index(payload: {
    search?: string
    page?: number
    perPage?: number
    orderBy?: any
  }): Promise<Meta<Entity[]>>
  indexByStatus?(payload: {
    search?: string
    page?: number
    perPage?: number
    status?: string
  }): Promise<Meta<Entity[]>>
  show(id: string): Promise<Meta<Entity>>
  create(payload: CreateRecord): Promise<Meta<Entity>>
  update(id: string, payload: UpdateRecord): Promise<Meta<Entity>>
  softDelete(id: string): Promise<Meta<Entity>>
  destroy(id: string): Promise<Meta<Entity>>
  searchByName?(name: string): Promise<Meta<Entity[]>>
  filter?(search: string): Promise<Meta<Entity[]>>
  invoiceFromInsurance?(
    payload: {
      search?: string
      page: number
      perPage: number
      orderBy?: any
      category?: string
    },
    insuranceId: string,
    statusOfDocument: string
  ): Promise<Meta<Entity[]>>
}
