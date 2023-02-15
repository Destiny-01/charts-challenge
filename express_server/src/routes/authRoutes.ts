import { User } from '@express-server/models/User';
import { Router } from 'express';
import { compare, hash } from 'bcrypt';

const router = Router();

router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    return res.status(500).json({ success: false, error: 'Email taken already' });
  }

  const newUser = await User.create({ name, email, password: await hash(password, 10) });

  return res.status(200).json({ success: true, user: newUser });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ where: { email } });
  if (!existingUser) {
    return res.status(500).json({ success: false, error: 'Incorrect email or password' });
  }

  const isValidPassword = await compare(password, existingUser.password);

  if (!isValidPassword) {
    return res.status(500).json({ success: false, error: 'Incorrect email or password' });
  }

  return res.status(200).json({ success: true, user: existingUser });
});

export default router;
