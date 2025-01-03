export interface NacosInstance {
  ip: string; // 实例 IP 地址
  port: number; // 实例端口
  serviceName: string; // 服务名称
}

export interface NacosServiceConfig {
  serverList: string[]; // Nacos 服务地址列表
  namespace?: string; // Nacos 命名空间
}
