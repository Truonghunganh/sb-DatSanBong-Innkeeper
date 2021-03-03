import { SideNavItems, SideNavSection } from '@modules/navigation/models';

export const sideNavSections: SideNavSection[] = [
    {
        text: 'CORE',
        items: ['Dashboard'],
    },
    {
        text: 'MANAGER',
        items: ['Innkeeper', 'Thaydoidatsan'],
    },
    
];

export const sideNavItems: SideNavItems = {
    Dashboard: {
        icon: 'arrows-alt',
        text: 'Danh sách các quán đang hoạt động',
        link: '/dashboard/quans',
    },
    Innkeeper: {
        icon: 'user',
        text: 'thông tin chủ quán',
        link: '/dashboard/innkeeper',
    },
    Thaydoidatsan: {
        text: 'Thay đổi đặt sân',
        link: '/dashboard/thaydoidatsan',
    },

};
