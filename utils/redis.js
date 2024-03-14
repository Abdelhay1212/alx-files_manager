import redis from 'redis';

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.client.on('error', (err) => console.error('Redis client error', err));
  }

  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    try {
      const result = await this.client.get(key);
      return result;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async set(key, value, duration) {
    try {
      await this.client.set(key, value, 'EX', duration);
    } catch (err) {
      console.error(err);
    }
  }

  async del(key) {
    try {
      await this.client.del(key);
    } catch (err) {
      throw new Error(err);
    }
  }
}

const redisClient = new RedisClient();
export default redisClient;
