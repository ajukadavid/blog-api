import { Router } from 'express'
import { createNewPost } from './handlers/posts'

const router = Router()

router.get('/posts', (req, res) => {res.json('hiii')}) //get all the posts
router.get('/post/:UserId', () => {}) // get all the posts for one user
router.put('/post/:UserId/:id', () => {}) //get one particular post
router.post('/post/:id', createNewPost) // create a post
router.delete('/post/:id', () => {})


export default router
