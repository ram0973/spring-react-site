export interface ArticleCreateRequestDto {
  title: string,
  slug: string,
  image?: File | null,
  excerpt: string,
  content: string,
  enabled: boolean,
}
