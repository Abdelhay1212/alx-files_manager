import sha1 from 'sha1';
import dbClient from '../utils/db';

class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;

    if (!email) {
      res.status(400).json({ error: 'Missing email' });
    }

    if (!password) {
      res.status(400).json({ error: 'Missing password' });
    }

    const userExist = await dbClient.db.collection('users').findOne({ email });
    if (userExist) {
      res.status(400).json({ error: 'Already exist' });
    }

    const hashedPasswd = sha1(password);
    const user = {
      email,
      password: hashedPasswd,
    };
    const result = await dbClient.db.collection('users').insertOne(user);
    res.status(201).json({ id: result.insertedId, email });
  }
}

export default UsersController;
