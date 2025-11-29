export interface FormFilterSearch {
  search?: string; // جستجو
  sort?: string; // مرتب سازی بر اساس
  location?: string; // محل مورد نظر
  propertyType?: string; // نوع ملک
  transactionType?: string; // نوع معامله
  maxPrice?: number; // حداکثر قیمت
  minPrice?: number; // حداقل قیمت
  maxRent?: number; // حداکثر اجاره
  minRent?: number; // حداقل اجاره
  maxMortgage?: number; // حداکثر وام
  minMortgage?: number; // حداقل وام
  maxArea?: number; // حداکثر متراژ
  minArea?: number; // حداقل متراژ
}
