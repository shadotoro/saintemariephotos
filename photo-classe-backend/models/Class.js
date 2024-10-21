const mongoose = require('mongoose');

const ClassSchema = new mongoose.Schema({
  codeAcces: { type: String, required: true, unique: true },
  photos: [String],  
    orders: [
    {
      name: { type: String, required: true },
      prenom: { type: String, required: true },
      photoChosen: { type: String, required: true },
      exemplaires: { type: Number, required: true }
    }
  ]
});

module.exports = mongoose.model('Class', ClassSchema);
