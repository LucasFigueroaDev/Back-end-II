import crypto from 'crypto'
export const tokenRest = ()=>{
    const token = crypto.randomBytes(32).toString('hex');
    return token
}