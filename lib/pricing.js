// Base prices in USD
export const BASE_PRICES = {
  pro: 19.9,
  premium: 49.9,
};

// Currency data with exchange rates (approximate, updated periodically)
// In production, you'd fetch live rates from an API
export const CURRENCIES = {
  USD: { symbol: "$", name: "US Dollar", rate: 1, locale: "en-US" },
  EUR: { symbol: "€", name: "Euro", rate: 0.92, locale: "de-DE" },
  GBP: { symbol: "£", name: "British Pound", rate: 0.79, locale: "en-GB" },
  INR: { symbol: "₹", name: "Indian Rupee", rate: 83.5, locale: "en-IN" },
  CAD: { symbol: "C$", name: "Canadian Dollar", rate: 1.36, locale: "en-CA" },
  AUD: { symbol: "A$", name: "Australian Dollar", rate: 1.53, locale: "en-AU" },
  JPY: { symbol: "¥", name: "Japanese Yen", rate: 157, locale: "ja-JP", decimals: 0 },
  SGD: { symbol: "S$", name: "Singapore Dollar", rate: 1.35, locale: "en-SG" },
  AED: { symbol: "د.إ", name: "UAE Dirham", rate: 3.67, locale: "ar-AE" },
  BRL: { symbol: "R$", name: "Brazilian Real", rate: 4.95, locale: "pt-BR" },
  MXN: { symbol: "MX$", name: "Mexican Peso", rate: 17.2, locale: "es-MX" },
  ZAR: { symbol: "R", name: "South African Rand", rate: 18.5, locale: "en-ZA" },
  KRW: { symbol: "₩", name: "South Korean Won", rate: 1320, locale: "ko-KR", decimals: 0 },
  SEK: { symbol: "kr", name: "Swedish Krona", rate: 10.5, locale: "sv-SE" },
  CHF: { symbol: "CHF", name: "Swiss Franc", rate: 0.88, locale: "de-CH" },
  NZD: { symbol: "NZ$", name: "New Zealand Dollar", rate: 1.64, locale: "en-NZ" },
  PHP: { symbol: "₱", name: "Philippine Peso", rate: 56.5, locale: "en-PH" },
  IDR: { symbol: "Rp", name: "Indonesian Rupiah", rate: 15800, locale: "id-ID", decimals: 0 },
  NGN: { symbol: "₦", name: "Nigerian Naira", rate: 1550, locale: "en-NG", decimals: 0 },
  PKR: { symbol: "Rs", name: "Pakistani Rupee", rate: 278, locale: "en-PK", decimals: 0 },
};

// Country to currency mapping
export const COUNTRY_CURRENCY_MAP = {
  US: "USD", CA: "CAD", GB: "GBP", AU: "AUD", NZ: "NZD",
  DE: "EUR", FR: "EUR", IT: "EUR", ES: "EUR", NL: "EUR", BE: "EUR", AT: "EUR", IE: "EUR", PT: "EUR", FI: "EUR", GR: "EUR",
  IN: "INR", JP: "JPY", SG: "SGD", KR: "KRW", PH: "PHP", ID: "IDR", PK: "PKR",
  AE: "AED", SA: "AED",
  BR: "BRL", MX: "MXN",
  ZA: "ZAR", NG: "NGN",
  SE: "SEK", CH: "CHF",
};

/**
 * Convert USD price to local currency
 */
export function convertPrice(usdPrice, currencyCode = "USD") {
  const currency = CURRENCIES[currencyCode] || CURRENCIES.USD;
  const localPrice = usdPrice * currency.rate;
  const decimals = currency.decimals !== undefined ? currency.decimals : 2;

  // Round to nice numbers
  let rounded;
  if (decimals === 0) {
    // Round to nearest 10 for large-number currencies
    rounded = Math.ceil(localPrice / 10) * 10 - 1; // e.g., 1549, 12999
    if (rounded < 100) rounded = Math.ceil(localPrice);
  } else {
    // Keep .9 or .99 endings for psychological pricing
    rounded = Math.ceil(localPrice) - 0.1;
    if (rounded < 1) rounded = localPrice.toFixed(2);
  }

  return {
    amount: rounded,
    formatted: formatCurrency(rounded, currencyCode),
    symbol: currency.symbol,
    currencyCode,
  };
}

/**
 * Format currency with proper locale
 */
export function formatCurrency(amount, currencyCode = "USD") {
  const currency = CURRENCIES[currencyCode] || CURRENCIES.USD;
  const decimals = currency.decimals !== undefined ? currency.decimals : 2;

  try {
    return new Intl.NumberFormat(currency.locale, {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(amount);
  } catch {
    return `${currency.symbol}${amount.toFixed(decimals)}`;
  }
}

/**
 * Get currency from country code
 */
export function getCurrencyFromCountry(countryCode) {
  return COUNTRY_CURRENCY_MAP[countryCode?.toUpperCase()] || "USD";
}

/**
 * Get pricing for a specific country
 */
export function getPricing(countryCode) {
  const currencyCode = getCurrencyFromCountry(countryCode);

  return {
    currency: currencyCode,
    symbol: CURRENCIES[currencyCode]?.symbol || "$",
    pro: convertPrice(BASE_PRICES.pro, currencyCode),
    premium: convertPrice(BASE_PRICES.premium, currencyCode),
    baseUSD: BASE_PRICES,
  };
}
