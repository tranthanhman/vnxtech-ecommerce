import { useMedia } from '../context/media-context'
import MediaViewGrid from './view-grid'
import MediaViewList from './view-list'

export default function MediaList() {
  const { state } = useMedia()
  const { viewMode } = state

  return <div>{viewMode === 'grid' ? <MediaViewGrid /> : <MediaViewList />}</div>
}
