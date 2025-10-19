export interface housesFilter {
  page?: number;
  limit?: number;
  transactionType?: string;
  search?: string;
  order?: string;
  sort?: string;
  propertyType?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  minRent?: number;
  maxRent?: number;
  minMortgage?: number;
  maxMortgage?: number;
  minArea?: number;
  maxArea?: number;
}
