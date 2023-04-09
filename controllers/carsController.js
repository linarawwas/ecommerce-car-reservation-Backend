import Cars from "../models/carsModel.js";
import asyncHandler from "express-async-handler";
import cloudinary from "../utils/cloudinary.js";
import upload from "../utils/multer.js";

//@des   fetch all cars
//@route GET/api/cars
//@access Public
const getCars = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword ? {
    name:{
      $regex:req.query.keyword ,
      $options:'i'
    }
  } : {}

  const cars = await Cars.find({...keyword});
  res.json(cars);
});

//@des   fetch single car
//@route GET/api/car
//@access Public
const getCarById = asyncHandler(async (req, res) => {
  const car = await Cars.findById(req.params.id);
  if (car) {
    res.json(car);
  } else {
    throw new Error("Product not found");
  }
});

//@desc  Create a new car
//@route POST /api/cars
//@access Private

const createCar = asyncHandler(async (req, res) => {
  upload.single("image")(req, res, async (err) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    } else {
      try {
        // Upload image to cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, { folder: "Cars" });
        // Create new Car
        let car = new Cars({
          name: req.body.name,
          brand: req.body.brand,
          category: req.body.category,
          description: req.body.description,
          public_id: result.public_id,
          url: result.secure_url,
        });
        // save car details in mongodb
        await car.save();
        res.status(200).json({ message: "Car created successfully!", car });
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
      }
    }
  });
});


//@desc   Update a car
//@route  PUT /api/cars/:id
//@access Private/Admin
const updateCar = asyncHandler(async (req, res) => {
  try {
    upload.single("image")(req, res, async (err) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
      } else {
        const { name, brand, category, description } = req.body;
        const car = await Cars.findById(req.params.id);

        if (!car) {
          res.status(404);
          throw new Error("Car not found");
        }

        // Update car properties
        car.name = name || car.name;
        car.brand = brand || car.brand;
        car.category = category || car.category;
        car.description = description || car.description;

        if (req.file) {
          // Delete old image from Cloudinary
          await cloudinary.uploader.destroy(car.public_id);

          // Upload new image to Cloudinary
          const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "Cars",
          });

          car.public_id = result.public_id;
          car.url = result.secure_url;
        }

        const updatedCar = await car.save();
        res.json(updatedCar);
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});



//@desc   Delete a car
//@route  DELETE /api/cars/:id
//@access Private/Admin
const deleteCar = asyncHandler(async (req, res) => {
  const carId = req.params.id;

  const car = await Cars.findById(carId);
  if (!car) {
    res.status(404);
    throw new Error("Car not found");
  }

  // Delete image from Cloudinary
  await cloudinary.uploader.destroy(car.public_id);

  // Delete car from database
  await Cars.deleteOne({ _id: carId });

  res.json({ message: "Car removed" });
});

export { getCars, getCarById, createCar, deleteCar,updateCar };
