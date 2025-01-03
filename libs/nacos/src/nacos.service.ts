import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { NacosNamingClient } from 'nacos';
import { NacosInstance } from './interface/nacos.interface';

@Injectable()
export class NacosService implements OnModuleInit {
  private client: NacosNamingClient;
  private logger = new Logger();
  constructor() {
    const logger = console;
    this.client = new NacosNamingClient({
      logger,
      serverList: '127.0.0.1:8848',
      namespace: 'public',
      username: 'nacos',
      password: 'nacos',
    });
  }

  async onModuleInit() {
    await this.client.ready();
    this.logger.debug('Nacos连接成功');
  }

  /**
   * 注册服务实例到 Nacos
   */
  async registerService(instance: NacosInstance) {
    console.log(`[Nacos] Registering service: ${instance.serviceName}`);
    await this.client.registerInstance(instance.serviceName, {
      ip: instance.ip,
      port: instance.port,
      instanceId: '',
      healthy: true,
      enabled: true,
    });
    this.logger.debug(
      `${instance.serviceName},${instance.ip},${instance.port}注册成功`,
    );
  }

  /**
   * 注销服务实例
   */
  async deregisterService(instance: NacosInstance) {
    console.log(`[Nacos] Deregistering service: ${instance.serviceName}`);
    await this.client.deregisterInstance(instance.serviceName, {
      ip: instance.ip,
      port: instance.port,
      instanceId: '',
      healthy: false,
      enabled: false,
    });
    this.logger.debug(
      `${instance.serviceName},${instance.ip},${instance.port}销毁成功`,
    );
  }

  /**
   * 服务发现
   */
  async discoverService(serviceName: string): Promise<NacosInstance[]> {
    const instances = await this.client.getAllInstances(serviceName);
    console.log(`[Nacos] Discovered instances for ${serviceName}:`, instances);
    return instances.map((instance) => ({
      ip: instance.ip,
      port: instance.port,
      serviceName,
    }));
  }
}
