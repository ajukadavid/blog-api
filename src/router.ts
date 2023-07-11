import { Router } from 'express'
import { createNewPost, deletePost, viewPost, getAllPosts, getAllUserPosts, updatePost } from './handlers/posts'

const router = Router()

router.get('/posts', getAllPosts) //get all the posts
router.get('/post/user/:id', getAllUserPosts) // get all the posts for one user
router.get('/post/view/:id', viewPost) // view one post
router.put('/post/update/:id', updatePost) //update one 
router.post('/post/create', createNewPost) // create a post
router.delete('/post/delete/:id', deletePost) //delete a post


export default router
