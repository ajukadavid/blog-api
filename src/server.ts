import morgan from 'morgan'
import cors from 'cors'
import express from 'express'
import { v2 as cloudinary } from 'cloudinary'
import { createNewUser, getAllUsers, getUserDetails, signInUser} from './handlers/user'
import { protect} from './modules/auth'
import { handleUpload } from './modules/image-upload'
import  router  from './router'
import multer  from 'multer'
const upload = multer({dest: 'uploads/'})
const app = express()
cloudinary.config({
    secure: true
});

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.post('/image', upload.single('thumbnail'), handleUpload)
app.post('/signUp', createNewUser)
app.post('/signIn', signInUser)
app.get('/users', getAllUsers)
app.get('/viewUser', getUserDetails)
app.use('/api', protect, router)
export default app