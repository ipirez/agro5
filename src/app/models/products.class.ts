import {InsuranceCarrier} from "./insuranceCarrier.class";

export class Product {
  id: string;
  name: string;
  image: string;
  insuranceCarriers: InsuranceCarrier[];

  constructor(id: string, name: string, insuranceCarriers: InsuranceCarrier[]) {
    this.insuranceCarriers = [];
    this.id = id;
    this.name = name;
    this.insuranceCarriers = insuranceCarriers;
  }

  getInsuranceNames() {
    let insuranceNames:string = "";
    this.insuranceCarriers.forEach((item) => {
      insuranceNames += item.name + ",";
    });
    return insuranceNames;//this.insuranceCarriers.forEach(item =>{ return item.name; });
  }
}
