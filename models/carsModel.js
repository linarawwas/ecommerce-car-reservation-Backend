import mongoose from "mongoose";

const { Schema, model } = mongoose;

const carSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter product name"],
    },

    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    reservation_id: [
      { type: Schema.Types.ObjectId, ref: 'Reservation', required: true },
    ],

    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: [true, "Please select category for this product"],
      enum: {
        values: ["BMW", "MERCEDES", "TOYOTA", "ELECTRIC CAR"],
        message: "Please select correct catergory for car",
      },
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

const   Cars = model("Cars", carSchema);

export default Cars;