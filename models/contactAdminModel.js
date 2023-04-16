import mongoose from 'mongoose';
//models for contact
const contactAdminSchema = new mongoose.Schema({
    // _id: {
    //   type: String, 
    //   required: true,
    //   unique: true
    // },
    phoneNumber: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    streetLocation: {
      type: String,
      required: true
    }
  });
  


export default mongoose.model('ContactAdmin', contactAdminSchema);