import * as dotenv from 'dotenv'
dotenv.config()
// import config from './config'

import app from './server'

const port = 4000
app.listen(port, () => {
    console.log(`hello on http://localhost:${port}`)
})