import mongoose from 'mongoose';

const replySchema = new mongoose.Schema({
  sessionId: { type: String, required: true },
  displayName: { type: String, default: 'Anonymous' },
  content: { type: String, required: true, maxlength: 1000 }
}, { timestamps: true });

const ventSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, index: true },
  displayName: { type: String, default: 'Anonymous', maxlength: 50 },
  content: { type: String, required: true, maxlength: 2000 },
  category: { type: String, enum: ['general', 'school', 'relationships', 'family', 'work', 'health', 'other'], default: 'general' },
  supportCount: { type: Number, default: 0 },
  crisisDetected: { type: Boolean, default: false },
  replies: [replySchema]
}, { timestamps: true });

ventSchema.index({ createdAt: -1 });

export default mongoose.models.Vent || mongoose.model('Vent', ventSchema);
