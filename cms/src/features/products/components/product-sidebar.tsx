import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tag } from 'lucide-react'
import { X } from 'lucide-react'
import { Upload, Eye, Save } from 'lucide-react'
import { useState } from 'react'

export default function ProductSidebar() {
  const [categories, setCategories] = useState<string[]>([])
  const [tags, setTags] = useState<string[]>([])

  return (
    <div className="w-80 space-y-6">
      {/* Publish */}
      <Card>
        <CardHeader className="cursor-pointer">
          <CardTitle className="flex items-center justify-between">Xuất bản</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <Button variant="outline" className="flex-1 bg-transparent">
              <Save className="w-4 h-4 mr-2" />
              Save Draft
            </Button>
            <Button className="flex-1">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Tag className="w-5 h-5 mr-2" />
            Danh mục
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            {categories.map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm">{category}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={() => setCategories(categories.filter((_, i) => i !== index))}
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            ))}
          </div>
          <div className="flex space-x-2">
            <Input placeholder="Thêm danh mục mới" className="flex-1" />
            <Button size="sm">Add</Button>
          </div>
        </CardContent>
      </Card>

      {/* Tags */}
      <Card>
        <CardHeader>
          <CardTitle>Tags</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="flex items-center">
                {tag}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 ml-1"
                  onClick={() => setTags(tags.filter((_, i) => i !== index))}
                >
                  <X className="w-2 h-2" />
                </Button>
              </Badge>
            ))}
          </div>
          <div className="flex space-x-2">
            <Input placeholder="Thêm tag mới" className="flex-1" />
            <Button size="sm">Add</Button>
          </div>
        </CardContent>
      </Card>

      {/* Featured Image */}
      <Card>
        <CardHeader className="cursor-pointer">
          <CardTitle className="flex items-center justify-between">Featured image</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <img
              src="/placeholder.svg?height=200&width=200"
              alt="Featured product image"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <Button variant="outline" size="sm">
              <Upload className="w-4 h-4 mr-2" />
              Set featured image
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
