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
  const newObj: Record<string, any> = {};

  for (const key in obj) {
    if (
      typeof obj[key] === "object" &&
      obj[key] !== null &&
      !Array.isArray(obj[key])
    ) {
      // Se for um objeto (não nulo e não array), chama a função recursivamente
      newObj[key] = convertEmptyStringsToNull(obj[key]);
    } else if (obj[key] === "") {
      // Se for uma string vazia, converte para null
      newObj[key] = null;
    } else {
      // Caso contrário, mantém o valor original
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
