import Cars from "../models/carsModel.js";
import asyncHandler from "express-async-handler";
import cloudinary from "../utils/cloudinary.js";


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
  const { name, brand, category, description } = req.body;
  const image = req.file.path; // get the file path from the uploaded file

  let result;

  try {
    result = await cloudinary.uploader.upload(image, {
      folder: "ecommerce",
    });

    const car = new Cars({
      name,
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
      brand,
      category,
      description,
    });

    const createdCar = await car.save();

    res.status(201).json(createdCar);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

//@desc   Update a car
//@route  PUT /api/cars/:id
//@access Private/Admin
const updateCar = asyncHandler(async (req, res) => {
  const { name, image, brand, category, description } = req.body;

  let car = await Cars.findById(req.params.id);

  if (car) {
    // Update car properties
    car.name = name || car.name;
    car.brand = brand || car.brand;
    car.category = category || car.category;
    car.description = description || car.description;

    if (image) {
      // Delete old image from Cloudinary
      await cloudinary.uploader.destroy(car.image.public_id);

      // Upload new image to Cloudinary
      const result = await cloudinary.uploader.upload(image, {
        folder: "ecommerce",
      });

      car.image.public_id = result.public_id;
      car.image.url = result.secure_url;
    }

    const updatedCar = await car.save();

    res.json(updatedCar);
  } else {
    res.status(404);
    throw new Error("Car not found");
  }
});



//@desc   Delete a car
//@route  DELETE /api/cars/:id
//@access Private/Admin
const deleteCar = asyncHandler(async (req, res) => {
  const car = await Cars.findById(req.params.id);

  if (car) {
    await car.remove();
    res.json({ message: "Car removed" });
  } else {
    res.status(404);
    throw new Error("Car not found");
  }
});

export { getCars, getCarById, createCar, deleteCar,updateCar };
