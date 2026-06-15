export const toPersianDigits = (num: string | number): string => {
  const persianMap: Record<string, string> = {
    "0": "۰",
    "1": "۱",
    "2": "۲",
    "3": "۳",
    "4": "۴",
    "5": "۵",
    "6": "۶",
    "7": "۷",
    "8": "۸",
    "9": "۹",
    ".": "٫",
  };

  return num.toString().replace(/[0-9.]/g, (digit) => persianMap[digit]);
};

export const formatNumberToPersian = (value: number | string): string => {
  if (value == null) return "";

  const strValue = value.toString();

  // سه تا سه تا جدا می‌کنیم
  const withSeparator = strValue.replace(/\B(?=(\d{3})+(?!\d))/g, "٬");

  return toPersianDigits(withSeparator);
};
