export interface AccountClosure {
  id: string
  day: string
  month: string
  type: string
  specialities: Speciality[]
}

export interface Speciality {
  description: string
  amount: number
}
