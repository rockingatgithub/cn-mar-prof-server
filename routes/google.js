const express = require('express')
const { OAuth2Client } = require("google-auth-library");
const Customer = require("../models/customer");
const router = express.Router()

const googleClient = new OAuth2Client({
    clientId: '44918824988-cohh4f1c4035rqvb5s00hjnkvc0qmjqf.apps.googleusercontent.com',
  });

router.post('/googleAuth',async (req, res) => {
    const { token } = req.body;

  const ticket = await googleClient.verifyIdToken({
    idToken: token,
    audient: '44918824988-cohh4f1c4035rqvb5s00hjnkvc0qmjqf.apps.googleusercontent.com',
  });

  const payload = ticket.getPayload();

  let user = await Customer.findOne({ email: payload?.email });
  if (!user) {
    user = await Customer.create({
      email: payload?.email,
      password: '1234',
      name: payload?.name,
    });

    await user.save();
  }

  res.json({ user, token });
})


module.exports = router