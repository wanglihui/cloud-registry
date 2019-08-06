export enum ERegistryType {
    ZOOKEEPER = 'zookeeper',
    MEMORY = 'memory',
}
import MemoryRegistry from './memory';
import AbstractRegistry from './registry';
import ZookeeperRegistry from './zookeeper';

export default class RegistryFactory {
    static registries: {[index: string]: AbstractRegistry} = {};

    static getRegistry(type: ERegistryType, conf: any) {
        if (RegistryFactory.registries[type]) {
            return RegistryFactory.registries[type];
        }
        if (type == ERegistryType.ZOOKEEPER) {
            RegistryFactory.registries[type] = new ZookeeperRegistry(conf);

        }
        if (type == ERegistryType.MEMORY) {
            RegistryFactory.registries[type] = new MemoryRegistry(conf);
        }
        if (!RegistryFactory.registries[type]) {
            throw new Error("not support registry type!");
        }
        return RegistryFactory.registries[type];
    }
}