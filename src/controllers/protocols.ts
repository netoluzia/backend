export interface HttpResponse<T> {
  statusCode: number
  body: BodyResponse<T>
}

export interface BodyResponse<B> {
  data?: B
  status: boolean
  message: string
}

export interface HttpRequest<B> {
  params?: any
  headers?: any
  body?: B
}

export interface MetaData {
  perPage: number
  page: number
  search: string
  totalPages: number
  totalDocuments: number
}
