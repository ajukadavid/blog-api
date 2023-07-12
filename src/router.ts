import { Router } from 'express'
import { createNewPost, deletePost, viewPost, getAllPosts, getAllUserPosts, updatePost } from './handlers/posts'

const router = Router()

router.get('/posts', getAllPosts) 
router.get('/post/user/:id', getAllUserPosts)
router.get('/post/view/:id', viewPost) 
router.put('/post/update/:id', updatePost)  
router.post('/post/create', createNewPost)
router.delete('/post/delete/:id', deletePost) 


export default router
