const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Rotta di registrazione
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Controlla se l'utente esiste già
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'Utente già registrato' });
    }

    // Crea un nuovo utente
    user = new User({
      username,
      email,
      password,
    });

    // Cripta la password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Crea un token JWT
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;


