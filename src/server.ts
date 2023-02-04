import morgan from 'morgan'
import cors from 'cors'
import express from 'express'
import { v2 as cloudinary } from 'cloudinary'
import { createNewUser, getAllUsers, getUserDetails, signInUser} from './handlers/user'
import { protect} from './modules/auth'
import { imageHandler } from './modules/image-handler'
import  router  from './router'
import multer  from 'multer'
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const app = express()
cloudinary.config({
    secure: true
});

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.post('/signUp', upload.single('image'), createNewUser)
app.post('/signIn', signInUser)
app.get('/users', getAllUsers)
app.get('/viewUser', getUserDetails)
app.use('/api', protect, router)
export default app