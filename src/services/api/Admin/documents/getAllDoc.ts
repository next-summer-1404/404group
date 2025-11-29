import http from "@/services/api/interceptor/interceptor";
import { DocumentsResponse } from "../../../../types/adminPanel/docType";

export const getAllDocs = async (filters: any) => {
  const params: any = {};

  if (filters.page) params.page = filters.page;
  if (filters.limit) params.limit = filters.limit;
  if (filters.sort) params.sort = filters.sort;
  if (filters.order) params.order = filters.order;
  if (filters.documentType) params.documentType = filters.documentType;
  if (filters.signed) params.signed = filters.signed;

  const res: DocumentsResponse = await http.get("/api/documents", {
    params: params,
  });
  return res;
};
