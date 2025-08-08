import Link from "next/link";
import React from "react";

export default function PageBreadcrumb() {
    return <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
        <Link href="/" className="hover:text-red-600">
            Trang chủ
        </Link>
        <span>/</span>
        <span className="text-gray-900">Test</span>
    </nav>
}
