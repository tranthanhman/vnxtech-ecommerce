import { SearchResultsPage } from "@/components/search/search-results-page"

export default function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  return <SearchResultsPage query={searchParams.q || ""} />
}
