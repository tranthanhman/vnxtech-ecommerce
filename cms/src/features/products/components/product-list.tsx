import { useState } from 'react'
import DataTable from '@/components/ui/table/index'
import { getProducts } from '../api/get-products'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useQuery } from '@tanstack/react-query'
import { columns } from './column'
import { useNavigate } from 'react-router-dom'

export default function ProductList() {
  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState(20)
  const navigate = useNavigate()

  const { isLoading, data } = useQuery({
    queryKey: ['products', pageIndex, pageSize],
    queryFn: () => getProducts(pageIndex + 1, pageSize),
  })

  const handlePageChange = (pagination: { pageIndex: number; pageSize: number }) => {
    setPageIndex(pagination.pageIndex)
    setPageSize(pagination.pageSize)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap justify-between items-center mb-2 space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Product List</h2>
          <p className="text-muted-foreground">Manage your products here.</p>
        </div>

        <Button className="space-x-1" onClick={() => navigate('/products/create')}>
          Add Product <Plus size={18} />
        </Button>
      </div>

      <DataTable
        data={data?.data?.products ?? []}
        columns={columns}
        serverSide
        totalPages={data?.data.pagination.totalPages ?? 1}
        pageIndex={pageIndex}
        pageSize={pageSize}
        onPaginationChange={handlePageChange}
        loading={isLoading}
      />
    </div>
  )
}
