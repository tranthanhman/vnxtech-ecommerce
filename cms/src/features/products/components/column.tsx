import { type ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { MoreHorizontal, Edit, Trash2, Eye } from 'lucide-react'
import { type Product } from '@/types/product.types'

export const columns: ColumnDef<Product>[] = [
  {
    id: 'id',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: '`imageUrl`',
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