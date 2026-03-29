import mongoose from 'mongoose';

const attendantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  staffId: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Attendant = mongoose.model('Attendant', attendantSchema);

export default Attendant;