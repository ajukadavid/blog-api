import morgan from 'morgan'
import cors from 'cors'
import express from 'express'
import { createNewUser, getAllUsers, getUserDetails, signInUser} from './handlers/user'
import { protect } from './modules/auth'
import  router  from './router'
const app = express()
app.use(cors())

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.post('/signUp', createNewUser)
app.post('/signIn', signInUser)
app.get('/users', getAllUsers)
app.get('/viewUser', getUserDetails)
app.use('/api', protect, router)
export default app