import prisma from "../db"

export const getAllPosts = async (req, res) => {
    try {
        const allPosts = await prisma.post.findMany()
        res.json({data: allPosts})
    } catch (e) {
        res.json({e})
    }
}

export const getAllUserPosts = async (req, res) => {
    try {
        const posts = await prisma.post.findMany({
            skip: 3,
            take: 5,
            where: {
                belongsToId: req.params.id
            }
        })
        res.json({data: posts})
    } catch (e) {
        res.status(400)

        res.json({e})
    }
}

export const viewPost = async (req, res) => {
    try {
        const post = await prisma.post.findFirst({
            where: {
                belongsToId: req.user.id,
                id: req.params.id
            }
        })
        res.json({data: post, val: 'this is a value'})
    } catch (e) {
        console.log(e)
        res.json({e})
    }
}

export const createNewPost = async (req, res) => {
    try {
        const newPost = await prisma.post.create({
            data: {
                body: req.body.body,
                title: req.body.title,
                image: req.body.image,
                belongsToId: req.user.id,
                user: req.user.username
            }
        })
    console.log(newPost)
    res.json({data: newPost})
    } catch (e) {
        res.status(400)
        console.log(e)
        res.json({e})
    }
}

export const updatePost = async (req, res) => {
    try {
        const updatedPost = await prisma.post.update({
            where: {
                id_belongsToId: {
                    id: req.params.id,
                    belongsToId: req.user.id
                }   
            },
            data: {
                title: req.body.title,
                body: req.body.body
            }
        })
        res.json({data: updatedPost})
    } catch(e) {
        res.json({e})
    }
}


export const deletePost = async (req, res) => {
    try {
        const deletedPost = await prisma.post.delete({
            where: {
                id_belongsToId: {
                    id: req.params.id,
                    belongsToId: req.user.id
                }
            }
        })
        res.json({data: deletedPost})
    } catch (e) {
        res.json({e})
    }
 
}