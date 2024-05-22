export interface AccountClosure {
  id: string
  day: string
  month: string
  specialities: Speciality[]
}

interface Speciality {
  description: string
  amount: number
}
