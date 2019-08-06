import AbstractRegistry from "./registry";
// import {} from 'zookeeper';
export default class ZookeeperRegistry extends AbstractRegistry {
    update(service: import("./registry").IService): Promise<import("./registry").IService> {
        throw new Error("Method not implemented.");
    }
    registryService(service: import("./registry").IService): Promise<import("./registry").IService> {
        throw new Error("Method not implemented.");
    }    
    fetchServices(): Promise<import("./registry").IService[]> {
        throw new Error("Method not implemented.");
    }
    refresh(serviceId: string): Promise<import("./registry").IService> {
        throw new Error("Method not implemented.");
    }
    unRegistry(serviceId: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    getServioce(serviceId: string): Promise<import("./registry").IService> {
        throw new Error("Method not implemented.");
    }
}