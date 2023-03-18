import prisma from '../db'
import { comparePasword, hashPassword, createJwt } from '../services/auth-service'
import { imageHandler } from '../services/image-handler';
import { validateEmail } from '../services/auth-service'
import { handleSendEmail } from '../services/email-service'

export const createNewUser = async (req, res, next) => {
  // let email = await validateEmail(req.body.email);

    try {
      const user = await prisma.user.create({
        data: {
          email: req.body.email,
          password: await hashPassword(req.body.password),
          username: req.body.username,
          image: await imageHandler(req.body.image),
        },
      });
      const token = createJwt(user);
      res.json({ token });
    } catch (error) {
      res.status(400);
      console.log(error)
      res.json({ error });
    }

};

export const getUserDetails = async (req, res, next) => {
  let user;
  try {
     const data = await prisma.user.findUnique({
        where: {
            username: req.body.username
        },
        
    })
    res.json({ username: data.username, image: data.image, email: data.email, id: data.id, created_at: data.createdAt });

  } catch(error){
      console.log(error)
  }
   
}

export const getAllUsers = async (req, res) => {
    const data = await prisma.user.findMany()
    res.json({ data })
}

export const signInUser = async (req, res) => {
  try {
       const user = await prisma.user.findUnique({
        where: {
            username: req.body.username
        }
   })
   const isValid = await comparePasword(req.body.password, user.password)
   if(!isValid){
        res.status(401)
        res.json('Wrong password, check your password and try again.')
        return
   }
   const token = createJwt(user)
   res.json({token})
  } catch (error) {
    res.json({error})
  }

}