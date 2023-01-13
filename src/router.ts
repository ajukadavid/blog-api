import { Router } from 'express'
import { createNewPost, getAllPosts, getAllUserPosts } from './handlers/posts'

const router = Router()

router.get('/posts', getAllPosts) //get all the posts
router.get('/post/user/:id', getAllUserPosts) // get all the posts for one user
router.get('/post/:id', () => {}) // view one post
router.put('/post/:id', () => {}) //update one 
router.post('/post/:id', createNewPost) // create a post
router.delete('/post/:id', () => {})


export default router
