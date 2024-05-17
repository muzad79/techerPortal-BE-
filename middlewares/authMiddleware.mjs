
import jwt from 'jsonwebtoken';
import logger from '../config/logger.mjs';

 

export const authenticate = (
  req,
  res,
  next
) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(220).json({ message:"unauthorized access" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY || '');

    // Attach user info to the request
    req.user = decoded;
    next();
  } catch (error) {
    logger.error('JWT verification failed', error);
    res.status(220).json({ message:"internal server error"  });
  }
};
