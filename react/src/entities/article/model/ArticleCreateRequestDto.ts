export interface ArticleCreateRequestDto {
  title: string,
  slug: string,
  image?: File,
  excerpt: string,
  content: string,
  enabled: boolean,
}
