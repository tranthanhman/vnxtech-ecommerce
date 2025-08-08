import { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Upload } from 'lucide-react'
import { MediaProvider } from './context/media-context'
import MediaFilter from './components/media-filter'
import MediaList from './components/media-list'

export default function MediaPage() {
  const fileRef = useRef<HTMLInputElement>(null)
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)

  return (
    <MediaProvider>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-center mb-2 space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Media Library</h2>
            <p className="text-muted-foreground">Manage your products here.</p>
          </div>

          <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Upload className="w-4 h-4 mr-2" />
                Add Media File
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Upload Media Files</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-lg font-medium mb-2">
                    Drop files here to upload
                  </p>
                  <p className="text-sm text-gray-400 mb-4">or click to select files</p>
                  <Button variant="outline" onClick={() => fileRef.current?.click()}>Select Files</Button>
                  <input type="file" ref={fileRef} multiple className="hidden" />
                </div>
                <div className="text-sm text-gray-400">
                  <p>Maximum upload file size: 64 MB</p>
                  <p>Allowed file types: JPG, PNG, GIF, PDF, MP4, MP3, DOC, DOCX</p>
                </div>  
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="">
          {/* Media Filter */}
          <MediaFilter />
          {/* Media Grid/List */}
          <MediaList />
        </div>
      </div>
    </MediaProvider>
  )
}
