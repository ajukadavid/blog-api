import prisma from '../db'
import { comparePasword, hashPassword, createJwt } from '../modules/auth'

export const createNewUser = async (req, res, next) => {
    try {
      const user = await prisma.user.create({
        data: {
          email: req.body.email,
          password: req.body.password,
          username: req.body.username,
        },
      });

      const token = createJwt(user)
      res.json({token})
    }
    catch (e) {
        console.log("error", e)
      res.json({ message: 'errrorr' });
    }
}

export const getUserDetails = async (req, res, next) => {
    const user = await prisma.user.findUnique({
        where: {
            username: req.body.username
        }
    })

    res.json({data: user})
}

export const getAllUsers = async (req, res, next) => {
    const users = await prisma.user.findMany()

    res.json({data: users})
}