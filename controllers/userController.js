import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


export const createUser = async (req, res) => {
    try {
      const maxIdUser = await User.findOne({}, { _id: 1 }, { sort: { _id: -1 } });
      const nextId = maxIdUser ? maxIdUser._id + 1 : 1;
      const newUser = new User({
        ...req.body,
        _id: nextId,
        userId: nextId 
      });

      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  };
  
  

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateUserById = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      req.body,
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const deleteUserById = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.userId);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// export const registerUser =

export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phoneNumber, role } = req.body;

    if (!firstName || !lastName || !email || !password || !phoneNumber || !role) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    const maxIdUser = await User.findOne({}, { _id: 1 }, { sort: { _id: -1 } });
    const nextId = maxIdUser ? maxIdUser._id + 1 : 1;
    
    const userExists = await User.findOne({ $or: [{ email }, { userId: nextId }] });

    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      _id: nextId,
      userId: nextId,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber,
      role
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token: generateToken(user._id)
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  } catch (err) {
    if (err.code === 11000 && err.keyValue && err.keyValue.userId != null) {
      // Duplicate key error for userId
      res.status(400).json({ error: 'User ID must be unique' });
    } else {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  }
};





export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for user email
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        email: user.email,
        password: user.password,
        token: generateToken(user._id)
      });
    } else {
      res.status(400);
      throw new Error('Invalid credentials');
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};




//Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET,{
    expiresIn: '30d',
  })
}