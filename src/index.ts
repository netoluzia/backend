import express from 'express'
import { config } from 'dotenv'
import { MongoGetUsersRepository } from './repositories/get-users/mongo-get-users'
import { GetUserController } from './controllers/get-users/get-users'
import { MongoClient } from './database/mongo'




const main = async () => {
    config()
    const port = process.env.PORT || 8020
    const app = express()
    await MongoClient.connect()
    app.get('/users', async (req, res) => {
        const getUsersRepository = new MongoGetUsersRepository()
        const getUserController = new GetUserController(getUsersRepository)

        const { body, statusCode } = await getUserController.handle()
        return res.send(body).status(statusCode)
    })
    app.listen(port, () => console.log(`App running on port ${port}`))
}

main()