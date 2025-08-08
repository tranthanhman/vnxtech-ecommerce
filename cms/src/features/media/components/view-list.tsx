import { Checkbox } from '@/components/ui/checkbox'
import { useMedia } from '../context/media-context'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Copy, Download, Edit, Eye, MoreVertical, Trash2 } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import type { Media } from '@/types/media.types'

export default function MediaViewList() {
  const { state, dispatch } = useMedia()
  const { files, selectedItems } = state

  return (
    <div className="rounded-lg border">
      <div className="grid grid-cols-12 gap-4 p-4 border-b text-sm font-medium text-gray-700">
        <div className="col-span-1">
          <Checkbox
            checked={selectedItems?.length === files.length && files.length > 0}
            onCheckedChange={() => dispatch({ type: 'SELECT_ALL_ITEMS', payload: true })}
          />
        </div>
        <div className="col-span-4">File</div>
        <div className="col-span-2">Type</div>
        <div className="col-span-2">Size</div>
        <div className="col-span-2">Date</div>
        <div className="col-span-1">Actions</div>
      </div>

      {/* Map Files */}
      {files.map((item: Media) => (
        <div key={item.id} className="grid grid-cols-12 gap-4 p-4 border-b">
          <div className="col-span-1">
            <Checkbox
              checked={selectedItems?.includes(item?.id)}
              onCheckedChange={() => dispatch({ type: 'TOGGLE_ITEM_SELECTION', payload: item.id })}
            />
          </div>
          <div className="col-span-4 flex items-center space-x-3">
            <img
              src={item.url || '/placeholder.svg'}
              alt={item.name}
              className="w-12 h-12 object-cover rounded"
            />
            <div>
              <p className="font-medium text-gray-900">{item.name}</p>
            </div>
          </div>
          <div className="col-span-2 text-sm text-gray-600">{item.type}</div>
          <div className="col-span-2 text-sm text-gray-600">{item.size}</div>
          <div className="col-span-2 text-sm text-gray-600">{item.createdAt}</div>
          <div className="col-span-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Eye className="w-4 h-4 mr-2" />
                  View
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy URL
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </DropdownMenuItem>
                <Separator />
                <DropdownMenuItem className="text-red-600">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ))}
    </div>
  )
}
