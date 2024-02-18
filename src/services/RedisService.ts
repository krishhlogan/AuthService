import { Service } from 'typedi';
import {RedisClient, createClient} from 'redis';

@Service()
class RedisService {
  private redisClient: RedisClient;

  constructor() {
    this.redisClient = createClient(); // You can customize connection details if needed
  }

  set(key: string, value: string, expiresIn: number): void {
    this.redisClient.setex(key, expiresIn, value);
  }

  get(key: string, callback: (error: Error | null, result: string | null) => void): void {
    this.redisClient.get(key, callback);
  }

  del(key: string): void {
    this.redisClient.del(key);
  }
}

export default RedisService;