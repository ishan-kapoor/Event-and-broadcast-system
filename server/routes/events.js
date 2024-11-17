import express from 'express';
import Event from '../models/Event.js';
import { authenticateToken, isFaculty } from '../middleware/auth.js';

const router = express.Router();

// Get all events (public)
router.get('/', async (req, res) => {
  try {
    const events = await Event.find()
      .populate('organizer', 'name')
      .sort({ date: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get faculty's events
router.get('/faculty', authenticateToken, isFaculty, async (req, res) => {
  try {
    const events = await Event.find({ organizer: req.user._id })
      .populate('participants', 'name email')
      .sort({ date: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get student's registered events
router.get('/registered', authenticateToken, async (req, res) => {
  try {
    const events = await Event.find({ participants: req.user._id })
      .populate('organizer', 'name')
      .sort({ date: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Register for an event
router.post('/:id/register', authenticateToken, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.participants.includes(req.user._id)) {
      return res.status(400).json({ message: 'Already registered' });
    }

    if (event.participants.length >= event.capacity) {
      return res.status(400).json({ message: 'Event is full' });
    }

    event.participants.push(req.user._id);
    await event.save();
    res.json({ message: 'Successfully registered' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Unregister from an event
router.post('/:id/unregister', authenticateToken, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const index = event.participants.indexOf(req.user._id);
    if (index === -1) {
      return res.status(400).json({ message: 'Not registered for this event' });
    }

    event.participants.splice(index, 1);
    await event.save();
    res.json({ message: 'Successfully unregistered' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new event
router.post('/', authenticateToken, isFaculty, async (req, res) => {
  const event = new Event({
    ...req.body,
    organizer: req.user._id,
  });

  try {
    const newEvent = await event.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update event
router.put('/:id', authenticateToken, isFaculty, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    
    if (event.organizer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    Object.assign(event, req.body);
    const updatedEvent = await event.save();
    res.json(updatedEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete event
router.delete('/:id', authenticateToken, isFaculty, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    
    if (event.organizer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await event.deleteOne();
    res.json({ message: 'Event deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;