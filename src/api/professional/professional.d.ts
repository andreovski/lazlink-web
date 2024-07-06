interface IProfessional {
  _id: string;
  workTitle: string;
  name: string;
  email: string;
  imageUrl: string | null;
  avatarUrl: string | null;
  about: string | null;
  cellphone: string;
  address: IAddress;
  linkedInUrl: string | null;
  facebookUrl: string | null;
  twitterUrl: string | null;
  instagramUrl: string | null;
  services: IService[];
  recommendations: IRecommendations[];
  scheduleOptions: IScheduleOptions[];
  creditCard: ICreditCard;
  scheduleCount: number;
  premium: boolean;
  indicatedBy: string | null;
  indicationExpiresIn: Date | null;
  userUrl: string;
  showAddress: boolean;
  theme: ITheme;
  createdAt: Date;
  updatedAt: Date | null;

  //? TO ADD
  enterpriseName: string;
  externalLinks: IExternalLinks[];
  useEnterpriseName: boolean;
  whatsappPhone: string;
}
