export interface ListBucket {
  id: number;
  userId: number;
  title: string;
  public: boolean;
  createdAt: string;
  updatedAt: string | null;
}

export interface ListBucketResponse {
  data: ListBucket[];
  total: number;
}


