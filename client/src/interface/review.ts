export interface ReviewUser {
  id: number;
  imageUrl: string;
  name: string;
  email: string;
  phone: number;
}

export interface MenuReview {
  id: number;
  user: ReviewUser;
  cafeId: number;
  menuItemId: number;
  rating: number;
  comment: string;
  createdBy: number;
  createdAt: string; // or Date if you are handling it as a Date object
  updatedBy: number | null;
  updatedAt: string | null; // or Date if you are handling it as a Date object
  deletedBy: number | null;
  deletedAt: string | null; // or Date if you are handling it as a Date object
}
