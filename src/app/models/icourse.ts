export interface ICourse {
  id: number;
  title: string;
  instructor: string;
  price: number;
  seats: number;
  Image: string;
  catId: number;
  category: string;
  isProcessing?: boolean;
}
