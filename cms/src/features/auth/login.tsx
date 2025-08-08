import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useNotification } from '@/hooks/useNotification'
import { useAuthStore } from '@/stores/authStore'
import { api } from '@/lib/axios'
import type { LoginResponse } from '@/types/auth.types'

export default function LoginPage() {
  const login = useAuthStore((s) => s.login)
  const navigate = useNavigate()
  const { notify } = useNotification()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (email.includes('admin')) {
      const res = await api.post<LoginResponse>('/auth/login', {
        email,
        password,
      })

      if (res.statusCode === 200) {
        login(res.data.user)
        localStorage.setItem('accessToken', res.data.accessToken)
        localStorage.setItem('refreshToken', res.data.refreshToken)
        navigate('/')
      } else {
        notify({
          title: 'Đăng nhập thất bại',
          description: 'Email hoặc mật khẩu không đúng.',
          type: 'error',
        })
      }

      if (res.status === 200) {
        // .then((res: APIResponse<LoginResponse>) => {
        //   const { data, success, statusCode } = res
        //   console.log('res', res.data)
        //   if (success && statusCode === 200) {
        //     login(data.user)
        //     localStorage.setItem('accessToken', data.accessToken)
        //     localStorage.setItem('refreshToken', data.refreshToken)
        //     navigate('/')
        //   } else {
        //     notify({
        //       title: 'Đăng nhập thất bại',
        //       description: 'Email hoặc mật khẩu không đúng.',
        //       type: 'error',
        //     })
        //   }
        // })
        // login({
        //   id:'1',
        //   username: 'Admin',
        //   email,
        //   avatar: 'https://github.com/shadcn.png',
        //   firstName: 'Admin',
        //   lastName: 'Admin',
        //   phoneNumber: '0909090909',
        //   status: UserStatusEnum.ACTIVE,
        //   role: {
        //     name: RoleEnum.ADMIN,
        //   },
        //   password: '123456',
        //   createdAt: new Date().toISOString(),
        //   updatedAt: new Date().toISOString(),
        // })
        notify({
          title: 'Đăng nhập thành công',
          description: 'Chào mừng bạn quay trở lại!',
          type: 'success',
        })
        // navigate('/')
      } else {
        notify({
          title: 'Đăng nhập thất bại',
          description: 'Email hoặc mật khẩu không đúng.',
          type: 'error',
        })
      }
    }
  }
  
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">CMS Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
