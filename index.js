import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser'
import { readFileSync } from 'fs'

import courseRoutes from './routes/courses.js'
import userRoutes from './routes/users.js'

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

app.use(cors())

app.use('/courses', courseRoutes)
app.use('/users', userRoutes)

const CONNECTION_URL = 'mongodb+srv://Hieu:5RbDZMTedjbsLFVg@cluster0.szrka.mongodb.net/f8-data?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000

mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log('Listening on port ' + PORT)))
    .catch(error => console.error(error.message))