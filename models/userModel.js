import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
   _id: {
        type: Number,
        default: null
      },
  userId: {
        type: Number,
        unique: true
      },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  }
});

export default mongoose.model('User', userSchema);
