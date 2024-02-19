import { User } from "../../models/User"
import { HttpResponse } from "../protocols"

export interface IGetUserController {
    handle(): Promise<HttpResponse<User[]>>
}

export interface IGetUserRepository {
    getUsers(): Promise<User[]>
}