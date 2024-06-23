import { HttpRequest, HttpResponse } from '../../protocols'
import { Stock } from '../../../models/Stock'
export interface Material {
  material: string
  qtd: number
}
export interface IGetMaterialFromServiceRepository {
  getMaterialFromService(id: string): Promise<Stock>
}

export interface IGetMaterialFromServiceController {
  handle(id: string): Promise<HttpResponse<Stock>>
}
