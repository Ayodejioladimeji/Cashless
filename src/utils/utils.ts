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