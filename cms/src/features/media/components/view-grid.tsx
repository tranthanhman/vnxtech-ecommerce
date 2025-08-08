import { Card, CardContent } from '@/components/ui/card'
import { useMedia } from '../context/media-context'
import { Checkbox } from '@/components/ui/checkbox'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'
import { Trash } from 'lucide-react'
import { api } from '@/lib/axios'
import type { APIResponse } from '@/types/api.types'
import type { Media } from '@/types/media.types'

export default function MediaViewGrid() {
  const { state, dispatch } = useMedia()
  const { files, selectedItems } = state

  const handleDelete = async (id: number) => {
    try {
      await api.delete<APIResponse<Media>>(`/media/${id}`).then(({ data }) => {
        if (data.statusCode === 200 && data.success) {
          dispatch({ type: 'REMOVE_FILE', payload: id })
        }
      })
    } catch (error: any) {
      console.error('Xóa lỗi:', error.message)
    }
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
      {files.length > 0 && files.map((item) => (
        <ContextMenu key={item.id}>
          <ContextMenuTrigger>
            <Card
              key={item.id}
              className="group relative overflow-hidden hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={item.url || '/placeholder.svg'}
                    alt={item.name}
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <Checkbox
                      checked={selectedItems?.includes(item.id)}
                      onCheckedChange={() =>
                        dispatch({ type: 'TOGGLE_ITEM_SELECTION', payload: item.id })
                      }
                    />
                  </div>
                </div>
                <div className="p-2">
                  <p className="text-xs font-medium text-gray-900 truncate" title={item.name}>
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-500">{item.size}</p>
                </div>
              </CardContent>
            </Card>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>Profile</ContextMenuItem>
            <ContextMenuItem>Billing</ContextMenuItem>
            <ContextMenuItem>Team</ContextMenuItem>
            <ContextMenuItem onClick={() => handleDelete(item.id)}>
              <Trash />
              Delete
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      ))}
    </div>
  )
}
