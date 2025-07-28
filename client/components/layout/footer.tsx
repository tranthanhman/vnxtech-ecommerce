import Link from "next/link"
import { Facebook, Instagram, Youtube, Phone, Mail, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-red-600 text-white px-3 py-2 rounded font-bold text-xl">FPT</div>
              <span className="font-bold text-xl">Shop</span>
            </div>
            <p className="text-gray-300 mb-4">Hệ thống bán lẻ điện thoại, laptop, tablet và phụ kiện chính hãng</p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-blue-500 cursor-pointer hover:text-blue-400" />
              <Instagram className="h-5 w-5 text-pink-500 cursor-pointer hover:text-pink-400" />
              <Youtube className="h-5 w-5 text-red-500 cursor-pointer hover:text-red-400" />
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white">
                  Liên hệ
                </Link>
              </li>
              <li>
                <Link href="/warranty" className="text-gray-300 hover:text-white">
                  Bảo hành
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-gray-300 hover:text-white">
                  Hỗ trợ
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Danh mục</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/category/phone" className="text-gray-300 hover:text-white">
                  Điện thoại
                </Link>
              </li>
              <li>
                <Link href="/category/laptop" className="text-gray-300 hover:text-white">
                  Laptop
                </Link>
              </li>
              <li>
                <Link href="/category/tablet" className="text-gray-300 hover:text-white">
                  Tablet
                </Link>
              </li>
              <li>
                <Link href="/category/accessories" className="text-gray-300 hover:text-white">
                  Phụ kiện
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Liên hệ</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span className="text-gray-300">1900 6868</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span className="text-gray-300">support@fptshop.com.vn</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span className="text-gray-300">Hà Nội, Việt Nam</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 FPTShop. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  )
}
