import prisma from "../db"

export const getAllPosts = async (req, res, next) => {
    try {
        const allPosts = await prisma.post.findMany()
        res.json({data: allPosts})
    } catch (e) {
        
    }
}

export const createNewPost = async (req, res, next) => {
    try {
        const newPost = await prisma.post.create({
            data: {
                body: req.body.body,
                title: req.body.title,
                belongsToId: req.user.id
            }
        })
    
    res.json({data: newPost})
    } catch (error) {
        console.log(error)
    }
}