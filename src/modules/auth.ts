import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const comparePasword = (password, hash) => {
    return bcrypt.compare(password, hash)
}

export const hashPassword = (password) => {
    return bcrypt.hash(password, 5)
}
