import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Package, X } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useState, useEffect } from 'react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import TiptapEditor from '@/components/editor/tiptap-editor'
import ProductSidebar from './product-sidebar'
import { generateSlug } from '@/utils/slugify'
import {createProduct} from '../api/create-product'

const formSchema = z.object({
  // name: z.string().min(2, {
  //   message: 'Tên sản phẩm phải có ít nhất 2 ký tự.',
  // }),
  // slug: z.string().min(2, {
  //   message: 'Slug phải có ít nhất 2 ký tự.',
  // }),
  // sku: z.string().min(2, {
  //   message: 'SKU phải có ít nhất 2 ký tự.',
  // }),
  // // price: z.number().min(0, {
  // //   message: 'Giá phải lớn hơn 0.',
  // // }),
  // // discountPrice: z.number().min(0, {
  //   // message: 'Giá phải lớn hơn 0.',
  // // }),
  // // stock: z.number().min(0, {
  // //   message: 'Số lượng phải lớn hơn 0.',
  // // }),
  // description: z.string().min(2, {
  //   message: 'Mô tả phải có ít nhất 2 ký tự.',
  // }),
  // categoryId: z.number().min(1, {
  //   message: 'Danh mục phải có ít nhất 1 ký tự.',
  // }),
  // brandId: z.number().min(1, {
  //   message: 'Thương hiệu phải có ít nhất 1 ký tự.',
  // }),
  // gallery: z.array(z.string()).min(1, {
  //   message: 'Ảnh phải có ít nhất 1 ký tự.',
  // }),
  // isFeatured: z.boolean(),
  // updatedAt: z.date(),
})

export default function ProductDetailPage() {
  const [productImages, setProductImages] = useState([
    '/placeholder.svg?height=200&width=200',
    '/placeholder.svg?height=200&width=200',
  ])

  const removeImage = (index: number) => {
    setProductImages(productImages.filter((_, i) => i !== index))
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      slug: '',
      gallery: [1,2],
    },
  })

  // Tự động tạo slug từ tên sản phẩm
  useEffect(() => {
    console.log('rerenderr');
    
    const subscription = form.watch((value, { name }) => {
      if (name === 'name') {
        const productName = value.name as string
        if (productName) {
          const slug = generateSlug(productName)
          form.setValue('slug', slug)
        }
      } 
    })
    return () => subscription.unsubscribe()
  }, [form])

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log('object', values)
    const response = await createProduct(values)
    console.log('response', response)
  }

  

  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/components">Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="space-y-4 mt-2">
        <h2 className="text-2xl font-bold tracking-tight">Chỉnh sủa sản phẩm</h2>

        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Main Content */}
                <div className="flex-1">
                  <div className="space-y-4">
                    {/* Name */}
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tên sản phẩm</FormLabel>
                          <FormControl>
                            <Input placeholder="" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Permalink */}
                    <FormField
                      control={form.control}
                      name="slug"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Permalink</FormLabel>
                          <FormControl>
                            <Input {...field} disabled />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Product Images */}
                    <FormField
                      control={form.control}
                      name="gallery"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Hình ảnh sản phẩm</FormLabel>
                          <FormControl>
                            <Input type="file" multiple accept="image/*" className="hidden" />
                          </FormControl>
                          <div className="flex gap-2 mt-2">
                            <Button type="button" variant="outline" size="sm">
                              Thêm ảnh
                            </Button>
                            <Button type="button" variant="secondary" size="sm">
                              Xóa tất cả
                            </Button>
                          </div>
                          <FormMessage />

                          <div className="grid grid-cols-4 gap-4 mb-4">
                            {productImages.map((image, index) => (
                              <div key={index} className="relative group">
                                <img
                                  src={image || '/placeholder.svg'}
                                  alt={`Product ${index + 1}`}
                                  className="w-full h-32 object-cover rounded-lg border"
                                />
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
                                  onClick={() => removeImage(index)}
                                >
                                  <X className="w-3 h-3" />
                                </Button>
                                {index === 0 && (
                                  <Badge className="absolute bottom-2 left-2 text-xs">
                                    Ảnh chính
                                  </Badge>
                                )}
                              </div>
                            ))}
                          </div>
                        </FormItem>
                      )}
                    />

                    {/* Product Description */}
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <Label>Content</Label>
                          <TiptapEditor {...field} />
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Product Details */}
                    <Card className="mb-6">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Package className="w-5 h-5 mr-2" />
                          Thông tin sản phẩm
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          {/* Product Description */}
                          <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                              <FormItem>
                                <Label>Giá bán (VNĐ)</Label>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="discountPrice"
                            render={({ field }) => (
                              <FormItem>
                                <Label>Giá so sánh (VNĐ)</Label>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="sku"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Mã sản phẩm (SKU)</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="stock"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Số lượng tồn kho</FormLabel>
                                <FormControl>
                                  <Input type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Sidebar */}
                <ProductSidebar />
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  )
}
