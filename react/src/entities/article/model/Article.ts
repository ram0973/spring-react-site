export interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  enabled: boolean;
  author: string
  dateCreated: Date;
}