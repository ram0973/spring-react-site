export interface ArticleCreateRequestDto {
  title: string,
  slug: string,
  image: string,
  excerpt: string,
  content: string,
  enabled: boolean,
  files: File[],
}
