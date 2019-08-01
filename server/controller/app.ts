import { AbstractController, RequestParam, RequestBody, Restful } from "ts-express-restful";
import {IRegistryOption} from 'cloud-registry-client';

@Restful("/app")
export default class App extends AbstractController {
    private services: {[index: string]: IRegistryOption} = {};
    $isValidId(id: string) {
        return true;
    }

    async get(@RequestParam id: string) {
        return this.services[id];
    }

    async add(@RequestBody app: IRegistryOption) {
        this.services[app!.id as string] = app;
        return this.services[app!.id as string];
    }

    async delete(@RequestParam id: string) {
        delete this.services[id];
        return this.services;
    }

    async find() {
        let services = [];
        for(let key in this.services) {
            services.push(this.services[key]);
        }
        return services;
    }

    async update(@RequestParam id: string) {
        let app = this.services[id];
        if (app) {
            app.refreshAt = Date.now();
        }
        return app;
    }
}