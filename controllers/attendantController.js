import Attendant from '../models/Attendant.js';

export const createAttendant = async (req, res) => {
  try {
    const attendant = await Attendant.create(req.body);
    res.status(201).json(attendant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAttendants = async (req, res) => {
  const attendants = await Attendant.find().sort({ createdAt: -1 });
  res.json(attendants);
};