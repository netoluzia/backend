import { InsuranceCompany } from './Insurance'

export interface Client {
  id: string
  name: string
  nif: string
  email: string
  phone_number: string
  protocol: number
  source: string
  insurance_company: string
  insurance_number: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}
