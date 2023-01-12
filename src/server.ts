import morgan from 'morgan'
import cors from 'cors'
import express from 'express'


const app = express()
app.use(cors())

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))


export default app