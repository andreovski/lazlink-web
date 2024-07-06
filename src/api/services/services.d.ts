interface IService {
  title: string;
  description: string;
  serviceTime: string;
  value: string;
  //? ADD
  advancePayment: boolean;
}

interface IServiceUpdate {
  id: string;
  services: IService[];
}
