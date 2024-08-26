import jwt from 'jsonwebtoken'

const generteTokenAndSetCookie = (userId,res) =>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn: '15d',
    })
    res.cookie("jwt",token, {
        httpOnly: true, //this cookie cannot be accessed by browser
        maxAge: 15*24*60*60*1000, //equals to 15 days
        sameSite: "strict" // csrf "For security of the token"
    })

    return token;
 }
 export default generteTokenAndSetCookie;