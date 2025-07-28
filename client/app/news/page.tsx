import { NewsDetailPage } from "@/components/news/news-detail-page"

export default function NewsDetail({ params }: { params: { id: string } }) {
  return <NewsDetailPage newsId={params.id} />
}
