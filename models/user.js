const mongoose = require('mongoose');
// Création du schéma User
const userSchema = new mongoose.Schema({  
    name: String,  
    post: String,  
    score: Number, 
    equipe: [String], 
});

// Création du modèle User basé sur le schéma
const User = mongoose.model('User', userSchema); 
// Exportation du modèle
module.exports = User;
