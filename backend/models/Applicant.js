const mongoose = require('mongoose');

const ApplicantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  id: { type: String, required: true, unique: true },
  date: {type: String, required: true},
  time: {type: String, required: true},
  club: {type: String, required: true},
  isCompleted: {type: Boolean, required: true}
});

module.exports = mongoose.model('Applicant', ApplicantSchema);
