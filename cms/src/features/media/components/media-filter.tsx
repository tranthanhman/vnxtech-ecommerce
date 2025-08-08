'use client'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { List, Grid3X3 } from 'lucide-react'
import { useMedia } from '../context/media-context'

export default function MediaFilter() {
  const { state, dispatch } = useMedia()
  const { viewMode, filterType, filterDate, searchTerm } = state

  return (
    <div className="rounded-lg border p-4 mb-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          {/* View Mode Toggle */}
          <div className="flex items-center border rounded-lg">
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => dispatch({ type: 'SET_VIEW_MODE', payload: 'list' })}
              className="rounded-r-none"
            >
              <List className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => dispatch({ type: 'SET_VIEW_MODE', payload: 'grid' })}
              className="rounded-l-none"
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
          </div>

          {/* Filters */}
          <Select
            value={filterType}
            onValueChange={(value) => dispatch({ type: 'SET_FILTER_TYPE', payload: value })}
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder="All media items" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All media items</SelectItem>
              <SelectItem value="image">Images</SelectItem>
              <SelectItem value="video">Videos</SelectItem>
              <SelectItem value="audio">Audio</SelectItem>
              <SelectItem value="document">Documents</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filterDate}
            onValueChange={(value) => dispatch({ type: 'SET_FILTER_DATE', payload: value })}
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder="All dates" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All dates</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This week</SelectItem>
              <SelectItem value="month">This month</SelectItem>
            </SelectContent>
          </Select>

          {/* {selectedItems.length > 0 && (
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={selectAllItems}>
                {selectedItems.length === filteredItems.length ? 'Deselect All' : 'Select All'}
              </Button>
              <Button variant="destructive" size="sm" onClick={deleteSelectedItems}>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete ({selectedItems.length})
              </Button>
            </div>
          )} */}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search media"
            value={searchTerm}
            onChange={(e) => dispatch({ type: 'SET_SEARCH_TERM', payload: e.target.value })}
            className="pl-10 w-64"
          />
        </div>
      </div>

      {/* Selected Items Info */}
      {/* {selectedItems.length > 0 && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            {selectedItems.length} item{selectedItems.length > 1 ? 's' : ''} selected
          </p>
        </div>
      )} */}
    </div>
  )
}
