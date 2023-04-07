import mongoose from "mongoose";

const contactSchema = mongoose.Schema(

    {
        // user: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     required: true,
        //     ref: 'user',
        // },
        name:{
            type:String,
            required:true,
        },

        email: { 
            type: String, 
            required: true,
            validate: {
              validator: function(v) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v); // Regex pattern for email validation
              },
              message: props => `${props.value} is not a valid email address!`
            }
          },

          phoneNumber: { 
            type: String, 
            required: true,
            validate: {
              validator: function(v) {
                return /^(\+?\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(v); // Regex pattern for phone number validation
              },
              message: props => `${props.value} is not a valid phone number!`
            }
          },
        message:{
            type:String,
        }
        


    }
);
const contact = mongoose.model("contact", contactSchema);
export default contact;