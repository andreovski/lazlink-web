interface IAddress {
  state: string;
  city: string;
  postalCode: string;
  street: string;
  number: string;
  locality: string;
  // ? ADD
  complement: string | null;
}
