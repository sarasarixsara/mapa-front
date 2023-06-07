import { Device } from "../entities/Device";

export interface IDevicesRespository {
    index(): Promise<Device[]>
    //show(id:String): Promise<Device>
}