export const addComma = (num: string | number) => {
    if (typeof num === "string") {
        return num?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
        return num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
};

// remove non Numeric
export const removeNum = (num:string | number) => {
    if (typeof num === "string") {
        return num?.replace(/[^0-9]/g, "");
    } else {
        return num?.toString().replace(/[^0-9]/g, "");
    }
};

// Format money
export const formatMoney = (data: number | string) => {
    return addComma(removeNum(data));
};

export const getInitials = (name: string) => {
    return name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
};

export const formatNumbers = (amount : number | string) => {
    // Convert the amount to a string
    let amountStr = typeof amount === "number" ? amount.toString() : amount;

    let parts = amountStr.split(".");
    let integerPart = parts[0];
    let fractionalPart = parts.length > 1 ? "." + parts[1] : "";

    let formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    let formattedFractional =
        fractionalPart.length > 2 ? fractionalPart.slice(0, 3) : fractionalPart;

    // Combine the integer and fractional parts with commas
    let formattedAmount = formattedInteger + formattedFractional;

    return formattedAmount;
};

export const generateTransactionReference = (): string => {
    const prefix = "TRX";
    const timestamp = Date.now().toString();
    const randomString = Math.random().toString(36).substring(2, 10).toUpperCase();

    return `${prefix}-${timestamp}-${randomString}`;
}