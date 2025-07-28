
import {
  ShieldCheck,
  LogIn,
  UserPlus,
  Settings,
  UserCog,
  Palette,
  HelpCircle,
  AlertTriangle,
  Ban,
  Lock,
  Bug,
  ServerOff,
  Ban as BarrierBlock,
  UserCog as Tool,
  Bell as Notification,
  Monitor as BrowserCheck,
  MessageCircle as Messages,
  Users as UsersIcon,
  AppWindow as Packages,
  ListChecks as Checklist,
  Home as LayoutDashboard,
} from "lucide-react";

import type {To} from "react-router-dom";


interface MenuGroup {
  title: string
  items: MenuItem[]
}

export type MenuItem = {
  title: string;
  url?: To;
  badge?: string | null;
  icon: React.ElementType;
  items?: MenuItem[];
};

export const menuGroups: MenuGroup[] = [
  {
    title: 'General',
    items: [
      {
        title: 'Dashboard',
        url: '/',
        icon: LayoutDashboard,
      },
      {
        title: 'Users',
        url: '/users',
        icon: UsersIcon,
      },
      {
        title: 'Courses',
        url: '/courses',
        icon: Checklist,
      },
      {
        title: 'Apps',
        url: '/apps',
        icon: Packages,
      },
      {
        title: 'Chats',
        url: '/chats',
        badge: '3',
        icon: Messages,
      },
      {
        title: 'Secured by Clerk',
        // icon: ClerkLogo, // Bỏ comment nếu đã import ClerkLogo
        icon: ShieldCheck, // Tạm thời dùng icon ShieldCheck nếu chưa có ClerkLogo
        items: [
          {
            title: 'Sign In',
            url: '/clerk/sign-in',
            icon: LogIn,
          },
          {
            title: 'Sign Up',
            url: '/clerk/sign-up',
            icon: UserPlus,
          },
          {
            title: 'User Management',
            url: '/clerk/user-management',
            icon: UsersIcon,
          },
        ],
      },
    ],
  },
  {
    title: 'Pages',
    items: [
      {
        title: 'Auth',
        icon: LogIn,
        items: [
          {
            title: 'Sign In',
            url: '/sign-in',
            icon: LogIn,
          },
          {
            title: 'Sign In (2 Col)',
            url: '/sign-in-2',
            icon: LogIn,
          },
          {
            title: 'Sign Up',
            url: '/sign-up',
            icon: UserPlus,
          },
          {
            title: 'Forgot Password',
            url: '/forgot-password',
            icon: AlertTriangle,
          },
          {
            title: 'OTP',
            url: '/otp',
            icon: ShieldCheck,
          },
        ],
      },
      {
        title: 'Errors',
        icon: Bug,
        items: [
          {
            title: 'Unauthorized',
            url: '/401',
            icon: Lock,
          },
          {
            title: 'Forbidden',
            url: '/403',
            icon: Ban,
          },
          {
            title: 'Not Found',
            url: '/404',
            icon: AlertTriangle,
          },
          {
            title: 'Internal Server Error',
            url: '/500',
            icon: ServerOff,
          },
          {
            title: 'Maintenance Error',
            url: '/503',
            icon: BarrierBlock,
          },
        ],
      },
    ],
  },
  {
    title: 'Other',
    items: [
      {
        title: 'Settings',
        icon: Settings,
        items: [
          {
            title: 'Profile',
            url: '/settings/',
            icon: UserCog,
          },
          {
            title: 'Account',
            url: '/settings/account',
            icon: Tool,
          },
          {
            title: 'Appearance',
            url: '/settings/appearance',
            icon: Palette,
          },
          {
            title: 'Notifications',
            url: '/settings/notifications',
            icon: Notification,
          },
          {
            title: 'Display',
            url: '/settings/display',
            icon: BrowserCheck,
          },
        ],
      },
      {
        title: 'Help Center',
        url: '/help-center',
        icon: HelpCircle,
      },
    ],
  },
];
