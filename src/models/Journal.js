import mongoose from 'mongoose';

const journalSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, index: true },
  title: { type: String, required: true, maxlength: 200, trim: true },
  content: { type: String, required: true, maxlength: 5000 },
  mood: { type: String, enum: ['great', 'good', 'okay', 'bad', 'terrible', ''], default: '' },
  crisisDetected: { type: Boolean, default: false }
}, { timestamps: true });

journalSchema.index({ sessionId: 1, createdAt: -1 });

export default mongoose.models.Journal || mongoose.model('Journal', journalSchema);
