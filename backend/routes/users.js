const { User, validate } = require('../models/user');
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
  const users = await User.find().sort('name');

  res.send(users);
});

//create new user
router.post('/', async (req, res) => {
  console.log(req.body.password);
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered');

  user = new User({
    email: req.body.email,
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.password, salt);

  await user.save();

  const token = user.generateAuthToken();

  res.send({ user, token });
});

router.post('/login', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invalid email or password');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password');

  const token = user.generateAuthToken();
  res.send({ user, token });
});

router.get('/profile', auth, (req, res) => {
  const user = req.user; //got user in request from auth middleware
  res.send(user);
});

module.exports = router;
