interface IService {
  _id: string;
  title: string;
  description: string;
  serviceTime: string;
  value: string;
  //? ADD
  advancePayment: boolean;
}

//! REMOVE 
interface IServiceUpdate {
  id: string;
  services: IService[];
}
