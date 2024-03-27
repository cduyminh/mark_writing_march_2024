import Redis from 'ioredis';

const redis = new Redis({
  host: 'redis-10611.c252.ap-southeast-1-1.ec2.cloud.redislabs.com',
  port: 10611,
  password: 'W021xhqgxEvNilfXsr5HMeZnvNRW4nNK',
});

export default redis;