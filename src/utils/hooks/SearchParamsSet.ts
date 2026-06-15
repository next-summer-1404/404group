import { FormFilterSearch } from "../../types/RentTypes/RentFormFilterTypes";

export function useBuildSearchParams(values: FormFilterSearch) {
  const params = new URLSearchParams();
  Object.entries(values).forEach(([key, val]) => {
    if (val === undefined || val === null) return;
    if (typeof val === "string" && val.trim() === "") return;
    if (typeof val === "number" && Number.isNaN(val)) return; // ✅ جلوگیری از NaN
    params.set(key, String(val));
  });
  return params;
}

/** helper: از SearchParams -> Form values */
export function useParseSearchParams(
  searchParams: URLSearchParams
): FormFilterSearch {
  const getNum = (k: string) => {
    const v = searchParams.get(k);
    if (!v) return undefined;
    const n = Number(v);
    return Number.isNaN(n) ? undefined : n;
  };

  return {
    search: searchParams.get("search") ?? undefined,
    sort: searchParams.get("sort") ?? undefined,
    location: searchParams.get("location") ?? undefined,
    propertyType: searchParams.get("propertyType") ?? undefined,
    transactionType: searchParams.get("transactionType") ?? undefined,
    maxPrice: getNum("maxPrice"),
    minRent: getNum("minRent"),
    maxRent: getNum("maxRent"),
    minArea: getNum("minArea"),
    maxArea: getNum("maxArea"),
  };
}
