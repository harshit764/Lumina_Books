export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  price: number;
  category: string;
  coverUrl: string;
  createdAt: any;
  updatedAt: any;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Admin {
  uid: string;
  email: string;
  role: 'super' | 'editor';
}
