import { AbstractController, RequestParam, RequestBody, Restful } from "ts-express-restful";
import {IRegistryOption} from 'cloud-registry-client';
import RegistryFactory from "../service/registry-factory";
import C from 'cloud-conf';

@Restful("/app")
export default class App extends AbstractController {
    private registry(){
        return RegistryFactory.getRegistry(C.registryServer.type, C.registryServer.conf);
    }
    $isValidId(id: string) {
        return true;
    }

    async get(@RequestParam id: string) {
        return this.registry().getServioce(id);
    }

    async add(@RequestBody app: IRegistryOption) {
        return this.registry().registryService(app);
    }

    async delete(@RequestParam id: string) {
        return this.registry().unRegistry(id);
    }

    async find() {
        return this.registry().fetchServices();
    }

    async update(@RequestParam id: string) {
        return this.registry().refresh(id);
    }
}