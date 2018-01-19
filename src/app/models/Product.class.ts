import { InsuranceCarrier } from "./insuranceCarrier.class";

export class Product{
  name: string;
  image: string;
  insuranceCarriers: InsuranceCarrier[];

  constructor(name?:string, image?:string){
    this.name = name;
    this.image = image;
    this.insuranceCarriers = [];
  }

  addInsuranceCarrier(item:InsuranceCarrier){
    this.insuranceCarriers.push(item);
  }

  getInsuranceCarrierNames(){
    let names:string = "";

    this.insuranceCarriers.forEach(i => {
      names += i.name + " ";
    });
    return names;
  }
}
