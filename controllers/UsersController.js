import dbClient from '../utils/db';
import bcrypt from 'bcrypt';

class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;

    if (email === null) {
      res.status(400).send('Missing email');
    }

    if (password === null) {
      res.status(400).send('Missing password');
    }

    const collection = await dbClient.db.collection('users');
    const user = await collection.findOne({ email });
    if (user) {
      res.status(400).send('Already exist');
    }

    const hashed_passwd = await bcrypt.hash(password, 10);
    const user = {
      email: email,
      password: hashed_passwd
    };
    const result = await collection.insertOne(user);
    res.status(201).json({email: email, id: result.insertedId})
  }
}

export default UsersController;
