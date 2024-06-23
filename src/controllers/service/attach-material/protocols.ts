import { Service } from '../../../models/Service'
import { HttpRequest, HttpResponse } from '../../protocols'

export interface Material {
  material: string
  qtd: number
}
export interface IAttachMaterialServiceRepository {
  attachMaterial(id: string, material: Material[]): Promise<Service>
}

export interface IAttachMaterialServiceController {
  handle(payload: HttpRequest<Material[]>): Promise<HttpResponse<Service>>
}
