const express = require('express');
const router = express.Router();
const Applicant = require('../models/Applicant');

express().use(express.json());

// Create a new interview
router.post('/', async (req, res) => {
  const { name, id, date, time, club, isCompleted } = req.body;

  if (!name || !date || !time || !club || !id) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  
  try {
    const applicant = new Applicant({ name, id, date, time, club, isCompleted });
    await applicant.save();
    res.status(201).json(applicant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all interviews
router.get('/', async (req, res) => {
  try {
    const applicants = await Applicant.find();
    res.status(200).json(applicants);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get pending interviews
router.get('/pending-interviews', async (req, res) => {
  try {
    const applicants = await Applicant.find({ isCompleted: false });
    res.status(200).json(applicants);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get recent interviews
router.get('/recent-interviews', async (req, res) => {
  try {
    const applicants = await Applicant.find({ isCompleted: true });
    res.status(200).json(applicants);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get upcoming interviews
router.get('/upcoming-interviews', async (req, res) => {
  try {
    const applicants = await Applicant.find({ isCompleted: false }).sort({ $natural: -1 }).limit(2);
    res.status(200).json(applicants);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update mark as done
router.patch('/:id/complete', async (req, res) => {
  try {
    const applicant = await Applicant.findById(req.params.id);
    if (!applicant) return res.status(404).send('Interview not found');

    applicant.isCompleted = true;
    await applicant.save();
    res.status(200).send(applicant);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


module.exports = router;
