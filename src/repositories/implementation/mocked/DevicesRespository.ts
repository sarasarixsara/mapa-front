import indexDevices from '../../../mocked/devices/index.json'
import { Device } from '../../../entities/Device'
import { IDevicesRespository } from '../../IDevicesRespository'

export class DevicesRepsository implements IDevicesRespository {
    async index(): Promise<Device[]> {
        return indexDevices.features
    }

    //async show(id:String): Promise<Device>{
     //   return indexDevices.features[0]
    //}
}