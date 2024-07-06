export function pickInitialNames(fullName: string) {
  if (!fullName.length) {
    return "LK";
  }

  const parts = fullName.split(" ");
  const firstLetter = parts[0].charAt(0).toUpperCase();
  const secondLetter = parts[parts.length - 1]?.charAt(0).toUpperCase();

  return secondLetter ? firstLetter + secondLetter : fullName.slice(0, 2);
}

export const timeStringToMinutes = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

export function convertEmptyStringsToNull<T extends Record<string, any>>(
  obj: T,
): T {
  let newObj: Record<string, any> = {};

  for (let key in obj) {
    if (obj[key] === "") {
      newObj[key] = null;
    } else {
      newObj[key] = obj[key];
    }
  }

  return newObj as T;
}

export function formatAddress(address: IAddress): string {
  const { state, city, postalCode, street, number, locality, complement } =
    address;

  // Construindo a string de endereço
  const formattedAddress = `${street}, ${number} - ${complement ? `${complement} -` : ""} ${postalCode} - ${city}/${state}`;

  // Removendo espaços e hífen extra se o complemento for nulo ou vazio
  return formattedAddress.replace(/ - $/, "");
}