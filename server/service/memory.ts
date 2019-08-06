import AbstractRegistry  from "./registry";
import {IService} from './registry';

export default class MemoryRegistry extends AbstractRegistry {
    private services: {[index: string]: IService} = {};
    async registryService(service: IService): Promise<IService> {
        this.services[service!.id as string] = service;
        return this.services[service!.id as string];
    }    
    async fetchServices(): Promise<IService[]> {
        let services = [];
        for(let key in this.services) {
            services.push(this.services[key]);
        }
        return services;
    }
    async refresh(serviceId: string): Promise<IService> {
        let service = this.services[serviceId];
        if (service) {
            service.refreshAt = Date.now();
        }
        return service;
    }
    async unRegistry(serviceId: string): Promise<boolean> {
        delete this.services[serviceId];
        return true;
    }
    async getServioce(serviceId: string): Promise<IService> {
        return this.services[serviceId];
    }
    async update(service: IService): Promise<IService> {
        let oldService =  this.services[service!.id as string];
        for(let key in service) {
            oldService[key as keyof IService] = (service as any)[key];
        }
        return oldService;
    }
}