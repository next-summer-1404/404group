export interface DocumentItem {
  id: string;
  houseId: string;
  documentType: string;
  filePath: string;
  signed: boolean;
  signature: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface DocumentsResponse {
  documents: DocumentItem[];
  totalCount: number;
}
