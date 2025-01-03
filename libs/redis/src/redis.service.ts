import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';

@Injectable()
export class RedisService {
  @Inject('REDIS_CLIENT')
  private redisClient: RedisClientType

  async keys(patten: string){
    return await this.redisClient.keys(patten)
  }

  async get(key: string){
    return await this.redisClient.get(key)
  }

  /**
   * 设置缓存
   * @param key
   * @param value
   * @param ttl 过期时间
   */
  async set(key: string, value: string,ttl?: number){
    await this.redisClient.set(key, value)

    if(ttl){
      await this.redisClient.expire(key, ttl)
    }

  }
}
