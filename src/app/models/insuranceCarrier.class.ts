export class InsuranceCarrier {

  name: string;
  email: string;
  primaryColor:string;
  secondaryColor:string;
  logo:string;

  constructor(name?: string, email?: string, primary?:string, secondary?:string, logo?:string) {
    this.name = name;
    this.email = email;
    this.primaryColor= primary;
    this.secondaryColor = secondary;
    this.logo = logo;
  }
}
