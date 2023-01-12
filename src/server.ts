import morgan from 'morgan'
import cors from 'cors'
import express from 'express'
import { createNewUser, getUserDetails} from './handlers/user'

const app = express()
app.use(cors())

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.post('/user', createNewUser)
app.get('/viewUser', getUserDetails)
export default app