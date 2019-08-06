export interface IService {
    name: string;
    ip: string;
    port: number;
    id?: string;
    createdAt?: number;
    refreshAt?: number;
    status?: number;
    env?: string;
}

type IServiceId = string;

export default abstract class AbstractRegistry {
    private timer!: NodeJS.Timer;
    constructor(conf: any) {
        this.intervalValidService();
    }
    private intervalValidService() {
        this.timer = setInterval(async () => {
            let services = await this.fetchServices();
            for(let service of services) {
                if (!service.refreshAt || service.refreshAt < 5 * 60 * 1000) {
                    service.status = -1;
                    try {
                        await this.update(service);
                    } catch(err) {
                        console.log(`更新${service.name+":"+service.id}发生错误`);
                    }
                }
            }
        }, 2 * 60 * 1000);
    }
    abstract registryService(service: IService):Promise<IService>;
    abstract fetchServices():Promise<IService[]>;
    abstract refresh(serviceId: IServiceId):Promise<IService>;
    abstract unRegistry(serviceId: IServiceId):Promise<boolean>;
    abstract getServioce(serviceId: IServiceId):Promise<IService>;
    abstract update(service: IService):Promise<IService>;
}