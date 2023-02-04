import * as dotenv from 'dotenv'
dotenv.config()
import config from './config'

import app from './server'

app.listen(() => {
    console.log(`Server running on http://localhost:${config.port}`)
})