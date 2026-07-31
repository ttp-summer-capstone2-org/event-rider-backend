import { Router } from 'express';
import bcrypt from 'bcrypt'; // this is for hashing/comparing passwords
import jwt from 'jsonwebtoken' 
import { Users } from '../models/index.js';


const router = Router();
const SECRET = process.env.JWT_SECRET;

router.post('/signup', async(req,res)=> {
    const {name, dob, email, password } = req.body;

    try {
        //we need to hash our password that we got from the user, and since it takes some time we
        //need it to await to give it time to return, now that hashed password can be saved to the database
        const password_hash = await bcrypt.hash(password, 10); 
    
        //now we can store the hashed password into the database
        const user = await Users.create({ name, dob, email, password_hash });

        const userPayload = { id: user.id, email: user.email }

        // wrist band reference, makes sense now (id: user.id is the wristband and SECRET is the 
        // unique stamp to let the person in without having to go through verifying
        // take our you id let me see your ticket .. etc)
        const token = jwt.sign( userPayload, SECRET, { expiresIn: '15m' }); //make payload instea***** also make it expire 
        console.log('Signed token:', token);

        // the cookie stored will now be called token and it will send it back to me on every 
        // request to the server. this way we dont have to keep logging back in
        // also like mentioned before in the demo we want httpOnly for added security, not anyone can see it in the
        // http console
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 15 * 60 * 1000 
        });
        res.status(201).json({message: `${user.name}, Welcome! Enjoy your experience`});
    } catch (error) {
        console.log('Sign Up error:', error.message);
        res.status(400).json({message: 'Email is already in use'})
    }

});

router.post('/login', async(req,res) => {
    const { identifier, password } = req.body;

    try {
        const user = await Users.findOne({ where: { email: identifier } })
        if (!user){
            return res.status(401).json({ message: 'Invalid authentication'})
        }

        const match = await bcrypt.compare(password, user.password_hash);
        if(!match){
            return res.status(401).json({ message: 'Invalid authentication'})
        }

        const userPayload = { id: user.id, email: user.email};
        const token = jwt.sign(userPayload, SECRET, { expiresIn: '15m'});
        console.log('Signed token:', token);

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 15 * 60 * 1000
        })

        res.status(201).json( {message: `you are now logged in as ${user.name}`});
    } catch (error) {
        console.log('Login error:', error.message);
        res.status(500).json({ message: 'Something went wrong, panic'})
    }
})

router.get('/logout', (req, res) => {
    
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out'})
})

router.get('/me', async(req,res) => {
    const token = req.cookies.token;

    if(!token) {
        return res.send('You must be logged in')
    }

    try {
        const userPayload = jwt.verify(token, SECRET);
        res.send(`You are logged in as ${userPayload.email}`);
    } catch (error) {
        res.send('Session is invalid or expired. Log in again!!!')
    }
})




export default router;