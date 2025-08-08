"use client";
import React, { useEffect } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { User } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/stores/authStore";
import { api } from "@/lib/api";

export default function UserProfile() {
    const { user, setUser, isAuthenticated } = useAuthStore();
    useEffect(() => {
        if (!user) {
            api.get(process.env.NEXT_PUBLIC_API_URL + '/users/me', {
                credentials: "include"
            }).then((data) => setUser(data.user))
        }
    }, [])
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    className="flex flex-col items-center p-2"
                >
                    <User className="h-5 w-5 text-gray-600" />
                    {!isAuthenticated || !user ? (
                        <span className="text-xs text-gray-600">Tài khoản</span>
                    ) : (
                        <span className="text-xs text-gray-600">{user?.name}</span>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {!isAuthenticated || !user ? (
                    <>
                        <DropdownMenuItem asChild>
                            <Link href="/login">Đăng nhập</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="/register">Đăng ký</Link>
                        </DropdownMenuItem>
                    </>
                ) : (
                    <DropdownMenuItem asChild>
                        <Link href="/account">Tài khoản của tôi</Link>
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
