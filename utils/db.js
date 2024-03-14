import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';

    const uri = `mongodb://${host}:${port}`;
    this.client = new MongoClient(uri, { useUnifiedTopology: true });

    this.client.connect()
      .then(() => {
        this.db = this.client.db(database);
      }).catch((err) => console.error('Connection to MongoDB failed', err));
  }

  isAlive() {
    return !!this.db;
  }

  nbUsers() {
    return this.db.collection('users').countDocuments();
  }

  nbFiles() {
    return this.db.collection('files').countDocuments();
  }
}

const dbClient = new DBClient();
export default dbClient;
