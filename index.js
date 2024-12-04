require('dotenv').config();
const express = require('express'); 
const User = require('./models/user'); 
const mongoose = require('mongoose');

const app = express(); 
const port = 6000;


app.use(express.json());

// Connexion à MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connecté'))
    .catch((err) => {
        console.error('Erreur de connexion à MongoDB :', err);
    });

// Route GET : retourner tous les utilisateurs
app.get('/user', async (req, res) => {
    try {
        const users = await User.find(); // Récupère tous les utilisateurs
        res.status(200).json(users); 
    } catch (error) {
        res.status(500).json({ message: error.message }); // Gère les erreurs
    }
});


// Route POST : ajouter un nouvel utilisateur
app.post('/post-user', async (req, res) => {
    try {
        const { name, post, score, equipe } = req.body;
        const newUser = new User({ name, post, score, equipe });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route PUT : éditer un utilisateur par ID
app.put('/put-user/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedData = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updatedData,
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Route DELETE : supprimer un utilisateur par ID
app.delete('/delete-user/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        res.status(200).json({ message: "Utilisateur supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});
