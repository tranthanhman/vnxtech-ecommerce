"use client"

import React, { useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { useAuthStore } from "@/stores/authStore";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AuthModal() {
    const { showAuthModal, closeAuthModal } = useAuthStore()
    const pathname = usePathname()

    useEffect(() => (
        closeAuthModal()
    ), [pathname, closeAuthModal])

    return (
        <Dialog open={showAuthModal} onOpenChange={closeAuthModal}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Vui lòng đăng nhập</DialogTitle>
                </DialogHeader>
                <p>
                    Vui lòng đăng nhập tài khoản Smember để xem ưu đãi và thanh toán dễ dàng hơn.
                </p>
                <div className="flex items-center gap-4">
                    <Button variant="outline" className="flex-1">
                        <Link href="/register">
                            Đăng kí
                        </Link>
                    </Button>
                    <Button asChild className="flex-1">
                        <Link href={`/login?redirectUrl=${pathname}`}>
                            Đăng Nhập
                        </Link>
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
