import prisma from '../db'
import { comparePasword, hashPassword, createJwt } from '../modules/auth'

export const createNewUser = async (req, res, next) => {
    try {
      const user = await prisma.user.create({
        data: {
          email: req.body.email,
          password: await hashPassword(req.body.password),
          username: req.body.username,
        },
      });
      const token = createJwt(user)
      res.json({token})
    }
    catch (error) {
      res.json({ error });
    }
}

export const getUserDetails = async (req, res, next) => {
    const data = await prisma.user.findUnique({
        where: {
            username: req.body.username
        }
    })
    res.json({ data })
}

export const getAllUsers = async (req, res) => {
    const data = await prisma.user.findMany()

    res.json({ data })
}

export const signInUser = async (req, res) => {
   const user = await prisma.user.findUnique({
        where: {
            username: req.body.username
        }
   })
   const isValid = await comparePasword(req.body.password, user.password)
   if(!isValid){
        res.status(401)
        res.json('Unauthorized User')
        return
   }
   const token = createJwt(user)
   res.json({token})
}