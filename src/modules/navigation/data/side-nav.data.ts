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
        text: 'Dashboard',
        link: '/dashboard/quans',
    },
    Innkeeper: {
        icon: 'user',
        text: 'Innkeeper',
        link: '/dashboard/innkeeper',
    },
    Thaydoidatsan: {
        text: 'Thaydoidatsan',
        link: '/dashboard/thaydoidatsan',
    },

};
