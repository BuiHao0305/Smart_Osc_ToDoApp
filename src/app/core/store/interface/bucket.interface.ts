export interface ListBucket {
  id: number;
  userId: number;
  title: string;
  public: boolean;
  createdAt: string;
  updatedAt: string | null;
}

export interface ListBucketResponse {
  type: string;
  data: ListBucket[];
  total: number;
}


