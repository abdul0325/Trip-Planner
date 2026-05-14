import { formatDistanceToNow, isValid } from "date-fns";

export const UtilsService = {
  timeAgo: (date: Date | string): string => {
    if (!isValid(new Date(date))) return ""
    return formatDistanceToNow(new Date(date), { addSuffix: true }).replace(
      /^about /,
      ""
    );
  },

  truncateText: (text?: string, limit: number = 10): string => {
    if (!text) return "";
    if (text.length <= limit) return text;
    return text.slice(0, limit) + "...";
  },

  shortenFileName: (filePath: string, start = 6, end = 5): string => {
    const fullName = filePath.split("/").pop() || "";
    const [name, ext] = fullName.split(/\.(?=[^.]+$)/); // split last dot only
    if (!name) return fullName;
    if (name.length > start + end) {
      return `${name.slice(0, start)}...${name.slice(-end)}.${ext}`;
    }
    return fullName;
  },

  capitalizeFirstLetter: (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },

  toTitleCase: (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLocaleLowerCase();
  },

  isNumberNegative: (value: number): boolean => {
    return value < 0;
  },

  AbsoluteValue: (value: number): number => {
    return Math.abs(value);
  },

  replaceUnderscoreWithSpace: (str: string): string => {
    return str.replaceAll("_", " ");
  },

  capitalizeString: (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  },

  formatCurrencyWithCommas: (input: number | string): string => {
    if (input === null || input === undefined) return "";
    const str = String(input).trim();
    if (str === "") return "";

    const sign = str.startsWith("-") ? "-" : "";
    const unsigned = str.replace(/^[-+]/, "");            // remove sign for processing
    const [intPart, fracPart] = unsigned.split(".");

    const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return sign + formattedInt + (fracPart === undefined ? "" : "." + fracPart);
  },

  IfNumberInfinityReturnHunderedElseNumber: (n: number | string): number => {
    return n === 'Infinity' ? 100 : Number(n)
  },

  IsNumberInfinity: (n: number | string): boolean => {
    return n === Infinity
  },

  calculateCTR: ({ impressions, clicks }: { impressions: number, clicks: number }): number => {
    const impressionsNumber = Number(impressions)
    const clicksNumber = Number(clicks)

    const ctr = clicksNumber / impressionsNumber
    if (isNaN(ctr)) return 0
    if (UtilsService.IsNumberInfinity(ctr)) return clicksNumber
    return Number(ctr.toFixed(2))
  },

  sanitizePercentageValue: (n: string | number): number => {
    const number = Number(n)
    if (isNaN(number)) return 0
    if (UtilsService.IsNumberInfinity(number)) return 100
    return Math.trunc(number)
  },

  getDisputeColor: (status: string): string => {
    switch (status) {
      case "RESOLVED_WITH_REFUND":
        return "bg-green-50 dark:border dark:bg-transparent dark:border-green-500 text-green-500";
      case "RESOLVED_WITHOUT_REFUND":
        return "bg-yellow-50 dark:border dark:bg-transparent dark:border-yellow-500 text-yellow-500";
      case "IN_PROGRESS":
        return "bg-blue-50 dark:border dark:bg-transparent dark:border-blue-500 text-blue-500";
      case "PENDING":
        return "bg-blue-50 dark:border dark:bg-transparent dark:border-blue-500 text-blue-500";
      case "CLOSED_WITHOUT_ACTION":
        return "bg-red-50 dark:border dark:bg-transparent dark:border-red-500 text-red-500";
      default:
        return "bg-gray-50 dark:border dark:bg-transparent dark:border-gray-500 text-gray-500";
    }
  },

  formatNumberToThreeDecimalPlaces: (value: number | string) => {
    const num = Number(value);
    if (Number.isNaN(num)) return value; // not a number → return as-is

    // if it's an integer (no decimal part)
    if (Number.isInteger(num)) return num.toString();

    // otherwise, show up to 2 decimal places
    return num.toFixed(3);
  },

  formatNumberToNDecimalPlaces: (value: number | string, n: number = 2) => {
    const num = Number(value);
    if (Number.isNaN(num)) return value; // not a number → return as-is

    // if it's an integer (no decimal part)
    if (Number.isInteger(num)) return num.toString();

    // otherwise, show up to 2 decimal places
    return num.toFixed(n);
  },

  trendDesciptionGenerator: (trend: string, rate: string | number, type: "usual" | "yesterday") => {
    if (trend === "stable") return "Stable since last time";
    if (trend === "up") return `${UtilsService.formatNumberToNDecimalPlaces(rate, 0)}% more than ${type}`;
    if (trend === "down") return `${UtilsService.formatNumberToNDecimalPlaces(rate, 0)}% less than ${type}`;
    return "Stable since last time";
  },

  removeHashFromString: (str:string): string => {
    return str.replaceAll("#", "-hash-");
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  throttle<T extends (...args: any[]) => void>(
    fn: T,
    delay: number
  ) {
      let lastCall = 0;

      return (...args: Parameters<T>) => {
        const now = Date.now();

        if (now - lastCall < delay) return;

        lastCall = now;
        fn(...args);
      };
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  debounce<T extends (...args: any[]) => void>(
    fn: T,
    delay: number
  ) {
    let timer: ReturnType<typeof setTimeout>;

    return (...args: Parameters<T>) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  },
  isArrayValue: (value: string[] | { min: number; max: number }): value is string[] => {
    return Array.isArray(value);
  },

  isRangeValue: (value: string[] | { min: number; max: number }): value is { min: number; max: number } => {
    return value && typeof value === 'object' && 'min' in value && 'max' in value;
  }
};



// export function normalizeImageUrl(imageUrlOrKey: string | null | undefined): string | null {
//   if (!imageUrlOrKey) return null;
  
//   // If it's already a full URL (starts with http), return as-is
//   if (imageUrlOrKey.startsWith('http')) {
//     return imageUrlOrKey;
//   }
  
  
//   if (cloudfrontBaseUrl) {
//     return `${cloudfrontBaseUrl}/${imageUrlOrKey}`;
//   }
  
//   console.warn('CloudFront base URL not configured. Backend should return full URLs.');
//   return null;
// }
