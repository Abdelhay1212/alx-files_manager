import dbClient from '../utils/db';
import redisClient from '../utils/redis';

class AppController {
  static getStatus(req, res) {
    const redisLive = redisClient.isAlive();
    const dbLive = dbClient.isAlive();
    res.status(200).json({ redis: redisLive, db: dbLive });
  }

  static getStats(req, res) {
    const numUsers = dbClient.nbUsers();
    const numFiles = dbClient.nbFiles();
    res.status(200).json({ users: numUsers, files: numFiles });
  }
}

export default AppController;
