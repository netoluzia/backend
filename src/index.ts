import express from 'express'
import { config } from 'dotenv'

config()
const port = process.env.PORT || 8020
const app = express()

app.listen(port, () => console.log(`App running on port ${port}`))