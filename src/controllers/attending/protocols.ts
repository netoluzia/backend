export interface Exam {
  id: string
  paid: boolean
  result: string
  description: string
}
export interface AttendingPatient {
  attendant: string
  client: string
  patient: {
    name: string
    birthday: string
    gender: 'M' | 'F'
    address: string
    phone_number: string
    exams: Exam[]
    description: string
  }
  trial_incharge: string
  doctor: string
}
