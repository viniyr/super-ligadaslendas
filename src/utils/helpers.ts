import bcrypt from "bcryptjs";

export module helpers {
  export function unformatAll(value: string) {
    return value
      .replaceAll(".", "")
      .replaceAll(",", "")
      .replaceAll("-", "")
      .replaceAll("(", "")
      .replaceAll(")", "")
      .replaceAll(" ", "");
  }

  export function cellphoneMask(value: string) {
    if (!value) return "-";

    let formattedNumber = "";
    const numbersOnly = value.replace(/[^\d]/g, "");

    if (numbersOnly.length > 0) {
      formattedNumber = `(${numbersOnly.slice(0, 2)}`;
    }
    if (numbersOnly.length > 2) {
      formattedNumber += `) ${numbersOnly.slice(2, 7)}`;
    }
    if (numbersOnly.length > 7) {
      formattedNumber += `-${numbersOnly.slice(7, 11)}`;
    }

    return formattedNumber;
  }

  export async function encryptPassword(password: string) {
    const times = 5;
    return await bcrypt.hash(password, times);
  }
}
