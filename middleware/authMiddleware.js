import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler'


export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      try {
          // Get token from header
          token = req.headers.authorization.split(' ')[1];

          // Verify token
          const decoded = jwt.verify(token, process.env.JWT_SECRET);

          // Get user from the token
          req.user = await User.findById(decoded.id).select('-password');

          next();
      } catch (error) {
          console.log(error);
          res.status(401);
          throw new Error('Not authorized');
      }
  }

  if (!token) {
      res.status(401);
      throw new Error('Not authorized, no token');
  }
});

class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const isAdmin = (req, res, next) => {
  if (req.user.role === 'user') {
      return next(new ErrorResponse('Access denied, you must be an admin', 401));
  }
  next();
};

