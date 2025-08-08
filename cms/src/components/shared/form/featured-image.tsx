import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export default function FeaturedImage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ảnh đại diện</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          <img src="/images/placeholder.jpg" alt="Featured Image" width={100} height={100} className="rounded-md"   />
          <Input type="file" accept="image/*" />
        </div>
      </CardContent>
    </Card>
  )
}
