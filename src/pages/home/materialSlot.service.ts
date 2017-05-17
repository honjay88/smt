 
import {Injectable} from '@angular/core'; 
import {MaterialSlot} from './materialSlot';
import {MaterialSlots } from './mock-mslot';


import {MaterialNo} from './materialSlot';
import {MaterialNos } from './mock-mslot';

@Injectable()
export class MaterialSlotService {

 /* getMaterialSlots(Mslno:string):Promise<MaterialSlot[]> {
     
      return Promise.resolve(MaterialSlots.find(c=>c.sMsl == Mslno)); 
  }*/


 /* getMaterialNos(Mslno:string):Promise<MaterialNo[]> {
      return Promise.resolve(MaterialNos.find(c=>c.sMsl == Mslno)); 
  }*/
  getMaterialNos():Promise<MaterialNo[]> {
      return Promise.resolve(MaterialNos); 
  }
  getMaterialSlots():Promise<MaterialSlot[]> {
     
      return Promise.resolve(MaterialSlots); 
  }
}
