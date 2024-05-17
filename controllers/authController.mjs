
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Teacher from '../models/teacher.mjs';
import logger from '../config/logger.mjs';
import { createDocument, getSingleDocument } from '../services/dbServices.mjs';
import passport from '../config/passport.mjs';

export const register = async (req, res) => {
 
    const { name,username, password } = req.body;
    try {

    // Check if the user already exists
    const existingUser = await getSingleDocument(Teacher,{username})

    if (existingUser) {
       res.status(220).json({ message:"Teacher already present" });
       return
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    createDocument(Teacher,{username,name,password:hashedPassword,isDeleted:false})

    res.status(201).json({ message:"Teacher successfully registered" });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error:"internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await getSingleDocument(Teacher,{username})

    if (user == null) {
      res.status(220).json({ message: "register first" });
      return
    }

    // Check if the provided password matches the stored hash
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
       res.status(220).json({ message:"invalid credentials" });
       return
    }

    // Create a JWT token
    const token = jwt.sign(
      { userId: user._id.toString() },
      process.env.SECRET_KEY || '',
      {
        expiresIn: '1h', // Token expiration time
      }
    );

    res.status(200).json({ token ,user});
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error:"internal server error" });
  }
};

export const newLogin = (req, res, next) => {
    console.log("hi from login controller")
    passport.authenticate('local', (err, user, info) => {
      if (err) {
       
        console.log(err)
        logger.error(err);
        return res.status(500).json({ error: 'internal server error' });
      }
      if (!user) {
        return res.status(220).json({ message: 'Invalid credentials' });
      }
     
     
        const token = jwt.sign(
          { userId: user._id.toString() },
          process.env.SECRET_KEY || '',
          { expiresIn: '1h' }
        );
        return res.status(200).json({message:"user logged in successfully", token, user });
      
    })(req, res, next);
  };
