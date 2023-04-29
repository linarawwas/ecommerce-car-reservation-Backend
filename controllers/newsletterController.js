import Newsletter from "../models/newsletter.js";

export const addEmail = async (req, res) => {
  const { email } = req.body;

  try {
    const newEmail = new Newsletter({ email });
    await newEmail.save();
    res.status(201).json(newEmail);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getEmails = async (req, res) => {
  try {
    const emails = await Newsletter.find();
    res.status(200).json(emails);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
