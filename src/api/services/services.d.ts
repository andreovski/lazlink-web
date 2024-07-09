interface IService {
  _id: string;
  title: string;
  description: string;
  serviceTime: string;
  value: number;
  //? ADD
  advancePayment: boolean;
}

//! REMOVE 
interface IServiceUpdate {
  id: string;
  services: IService[];
}
