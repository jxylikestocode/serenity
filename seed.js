require('dotenv').config({ path: '.env' });
const mongoose = require('mongoose');

const DEMO_SESSION = 'demo-user-session-id';

const moodSchema = new mongoose.Schema({ sessionId: String, mood: String, note: String, crisisDetected: { type: Boolean, default: false } }, { timestamps: true });
const journalSchema = new mongoose.Schema({ sessionId: String, title: String, content: String, mood: { type: String, default: '' }, crisisDetected: { type: Boolean, default: false } }, { timestamps: true });
const replySchema = new mongoose.Schema({ sessionId: String, displayName: { type: String, default: 'Anonymous' }, content: String }, { timestamps: true });
const ventSchema = new mongoose.Schema({ sessionId: String, displayName: { type: String, default: 'Anonymous' }, content: String, category: { type: String, default: 'general' }, supportCount: { type: Number, default: 0 }, crisisDetected: { type: Boolean, default: false }, replies: [replySchema] }, { timestamps: true });

const Mood = mongoose.model('Mood', moodSchema);
const Journal = mongoose.model('Journal', journalSchema);
const Vent = mongoose.model('Vent', ventSchema);

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected');
  await Mood.deleteMany({ sessionId: DEMO_SESSION });
  await Journal.deleteMany({ sessionId: DEMO_SESSION });
  await Vent.deleteMany({ sessionId: { $in: [DEMO_SESSION, 'peer-1', 'peer-2'] } });

  await Mood.insertMany(['okay','bad','okay','good','good','great','good'].map((mood, i) => ({
    sessionId: DEMO_SESSION, mood,
    note: ['Stressed about exams','Rough day','Getting by','Good study session','More confident','Great morning walk!','Productive day'][i],
    createdAt: new Date(Date.now() - (6-i)*86400000)
  })));
  await Journal.insertMany([
    { sessionId: DEMO_SESSION, title: 'First day using Serenity', content: 'I decided to try journaling. School has been overwhelming.', mood: 'okay', createdAt: new Date(Date.now()-5*86400000) },
    { sessionId: DEMO_SESSION, title: 'The breathing exercise helped', content: 'Box breathing before my presentation actually calmed my nerves.', mood: 'good', createdAt: new Date(Date.now()-3*86400000) },
    { sessionId: DEMO_SESSION, title: 'Grateful for small wins', content: 'Grateful for finishing my assignment, a good conversation, and 7 hours of sleep.', mood: 'great', createdAt: new Date(Date.now()-86400000) },
  ]);
  await Vent.insertMany([
    { sessionId: 'peer-1', content: "Does anyone else feel constantly behind in everything?", category: 'school', supportCount: 12, replies: [{ sessionId: 'peer-2', displayName: 'Anonymous', content: "You're not alone. Most of us are struggling too.", createdAt: new Date(Date.now()-2*86400000) }], createdAt: new Date(Date.now()-3*86400000) },
    { sessionId: 'peer-2', content: 'Had a really good day and wanted to share that somewhere.', category: 'general', supportCount: 24, createdAt: new Date(Date.now()-86400000) },
    { sessionId: 'peer-1', content: 'Family pressure about grades is really getting to me.', category: 'family', supportCount: 8, createdAt: new Date(Date.now()-14400000) },
  ]);
  console.log('Seeded!');
  await mongoose.disconnect();
}
seed().catch(e => { console.error(e); process.exit(1); });
