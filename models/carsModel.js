import mongoose from "mongoose";
import Reservation from "./reservationModel";
const carSchema = mongoose.Schema(
  {
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: "User",
    // },

    name: {
      type: String,
      required: [true, "Please enter product name"],
    },
    
    // image: [
      
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
        reservation_id: [{ type: Schema.Types.ObjectId, ref: Reservation }],

    // ],
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: [true, 'Please select category for this product'],
      enum:{
        values:[
            'BMW',
            'MERCEDES',
            'TOYOTA',
            'ELECTRIC CAR'
        ],
        message:'Please select correct catergory for car'
      }
    },
    description: {
      type: String,
      required: [true, "Please enter product description"],
    },
  },
  {
    timestamps: true,
  }
);
const Cars = mongoose.model("Cars", carSchema);

export default Cars;
