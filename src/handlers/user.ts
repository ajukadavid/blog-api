import prisma from '../db'
import { comparePasword, hashPassword, createJwt } from '../services/auth-service'
import { imageHandler } from '../services/image-handler';
import { validateEmail } from '../services/auth-service'
import { handleSendEmail } from '../services/email-service'

export const createNewUser = async (req, res, next) => {
  let email = await validateEmail(req.body.email);
  if (email.valid) {
    try {
      const user = await prisma.user.create({
        data: {
          email: req.body.email,
          password: await hashPassword(req.body.password),
          username: req.body.username,
          image: await imageHandler(req),
        },
      });
      const token = createJwt(user);
      res.json({ token });
    } catch (error) {
      console.log(error);
      let message =
        error.code === "P2002"
          ? "Email Already exists! please sign in."
          : error;
      res.status(400);
      res.json({ error: message });
    }
  } else {
    res.status(400)
    res.json({message: 'Invalid email'})
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
    user = data
    res.json({ username: data.username, image: data.image, email: data.email, id: data.id, created_at: data.createdAt });

  } catch(error){
      !user ? res.json({ error: 'User Does Not Exist!' }) : error
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