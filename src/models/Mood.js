import mongoose from 'mongoose';

const moodSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, index: true },
  mood: { type: String, required: true, enum: ['great', 'good', 'okay', 'bad', 'terrible'] },
  note: { type: String, maxlength: 500, default: '' },
  crisisDetected: { type: Boolean, default: false }
}, { timestamps: true });

moodSchema.index({ sessionId: 1, createdAt: -1 });

export default mongoose.models.Mood || mongoose.model('Mood', moodSchema);
