export interface HttpResponse<T> {
  statusCode: number
  body: T | string
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
