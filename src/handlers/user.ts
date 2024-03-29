import prisma from '../db'
import { comparePasword, hashPassword, createJwt, validateEmail } from '../services/auth-service'

export const createNewUser = async (req, res, next) => {
    try {
        const user = await prisma.user.create({
          data: {
            email: req.body.email,
            password: await hashPassword(req.body.password),
            username: req.body.username,
            image: await req.body.image,
          },
        });
        const token = createJwt(user);
        res.json({ token });
    
    } catch (error) {
      console.log(error)
      res.status(400);
      let errMsg 
      if(error.code === 'P2002' && error.meta.target[0] === 'username' || error.meta.target[0] === 'email'){
        let val = error.meta.target[0] === 'username' ? 'username' : 'email'
        errMsg = `${val} already exists.`
      }
      res.json({ error: errMsg });
    }

};

export const getUserDetails = async (req, res,) => {
  try {
     const data = await prisma.user.findUnique({
        where: {
            username: req.body.username
        },
        
    })
    res.json({ username: data.username, image: data.image, email: data.email, id: data.id, created_at: data.createdAt });

  } catch(error){
    console.log(error)
      res.json({ error })
  }
   
}

export const getAllUsers = async (req, res) => {
    const data = await prisma.user.findMany()
    res.json({ data: 'hello' })
}

export const signInUser = async (req, res) => {
  try {
       const user = await prisma.user.findUnique({
        where: {
            username: req.body.username
        }
   })
   if(!user) {
    res.status(401)
    res.json({error: 'User does not exist, please check username and try again.'})
    return
   }
   const isValid = await comparePasword(req.body.password, user.password)
   if(!isValid){
        res.status(401)
        res.json({error: 'Wrong password, check your password and try again.'})
        return
   }
   const token = createJwt(user)
   res.json({token})
  } catch (error) {
    // console.log(error)
    // res.status(400)
    // res.json({error: error})
  }

}