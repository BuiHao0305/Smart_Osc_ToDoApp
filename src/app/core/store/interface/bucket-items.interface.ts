export interface BucketItem {
    id: number;
    bucketId: number;
    parentId: number 
    content: string;
    done: boolean;
    createdAt: string; 
    updatedAt: string;
}
export interface BucketItemsResponse {
    data: BucketItem[]; 
    total: number;    
  }