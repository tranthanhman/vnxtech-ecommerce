import { type ColumnDef } from '@tanstack/react-table'
import { useState } from 'react'

import type { Product } from '@/types/product.types'
import DataTable from '@/components/ui/table/index'
import { getProducts } from '../api/get-products'
import { LoaderCircle, MoreHorizontal, Edit, Trash2, Eye, UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useQuery } from '@tanstack/react-query'

export default function ProductList() {
  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState(20)

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
      cell: ({ row }) => <div className="font-medium">{row.getValue('id')}</div>,
    },
    {
      accessorKey: 'imageUrl',
      header: 'Image',
      cell: ({ row }) => {
        const imageUrl = row.getValue('imageUrl') as string
        return (
          <Avatar className="h-12 w-12">
            <AvatarImage src={imageUrl} alt="Product" />
            <AvatarFallback>IMG</AvatarFallback>
          </Avatar>
        )
      },
    },
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => <div className="font-medium">{row.getValue('name')}</div>,
    },
    {
      accessorKey: 'slug',
      header: 'Slug',
      cell: ({ row }) => <div className="text-muted-foreground">{row.getValue('slug')}</div>,
    },
    {
      accessorKey: 'price',
      header: 'Price',
      cell: ({ row }) => {
        const price = parseFloat(row.getValue('price'))
        const formatted = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(price)
        return <div className="font-medium">{formatted}</div>
      },
    },
    {
      accessorKey: 'discountPrice',
      header: 'Discount Price',
      cell: ({ row }) => {
        const discountPrice = row.getValue('discountPrice')
        if (!discountPrice) {
          return <div className="text-muted-foreground">-</div>
        }
        const formatted = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(discountPrice as number)
        return <div className="font-medium text-green-600">{formatted}</div>
      },
    },
    {
      accessorKey: 'stock',
      header: 'Stock',
      cell: ({ row }) => {
        const stock = row.getValue('stock') as number
        return <Badge variant={stock > 0 ? 'default' : 'destructive'}>{stock}</Badge>
      },
    },
    {
      accessorKey: 'isFeatured',
      header: 'Featured',
      cell: ({ row }) => {
        const isFeatured = row.getValue('isFeatured') as boolean
        return (
          <Badge variant={isFeatured ? 'default' : 'secondary'}>{isFeatured ? 'Yes' : 'No'}</Badge>
        )
      },
    },
    {
      accessorKey: 'category.name',
      header: 'Category',
      cell: ({ row }) => {
        const category = row.original.category
        return (
          <div className="flex flex-col">
            <div className="font-medium">{category.name}</div>
            <div className="text-sm text-muted-foreground">{category.slug}</div>
          </div>
        )
      },
    },
    {
      accessorKey: 'brand.name',
      header: 'Brand',
      cell: ({ row }) => {
        const brand = row.original.brand
        return (
          <div className="flex flex-col">
            <div className="font-medium">{brand.name}</div>
            <div className="text-sm text-muted-foreground">{brand.slug}</div>
          </div>
        )
      },
    },
    {
      accessorKey: 'createdAt',
      header: 'Created',
      cell: ({ row }) => {
        const date = new Date(row.getValue('createdAt'))
        return <div className="text-muted-foreground">{date.toLocaleDateString()}</div>
      },
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const product = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(product.id.toString())}
              >
                Copy product ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ['products', pageIndex, pageSize],
    queryFn: () => getProducts(pageIndex + 1, pageSize),
  })

  const handlePageChange = (pagination: { pageIndex: number; pageSize: number }) => {
    setPageIndex(pagination.pageIndex)
    setPageSize(pagination.pageSize)
  }

  if (isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <LoaderCircle size={32} className="animate-spin" />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-medium text-red-600">Error loading products</p>
          <p className="text-sm text-muted-foreground">
            {error instanceof Error ? error.message : 'Something went wrong'}
          </p>
        </div>
      </div>
    )
  }

  if (!data?.products || !Array.isArray(data.products) || data.products.length === 0) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-medium text-red-600">No products found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap justify-between items-center mb-2 space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Product List</h2>
          <p className="text-muted-foreground">Manage your products here.</p>
        </div>

        <Button className="space-x-1">
          Add User <UserPlus size={18} />
        </Button>
      </div>


      <DataTable
        data={data?.products ?? []}
        columns={columns}
        serverSide
        totalPages={data?.pagination?.totalPages ?? 1}
        pageIndex={pageIndex}
        pageSize={pageSize}
        onPaginationChange={handlePageChange}
      />
    </div>
  )
}
