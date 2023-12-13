import { ReactComponent as OverviewIcon } from '../../assets/sidebar/overview.svg';
// import { ReactComponent as CompaniesIcon } from '../../assets/sidebar/companies.svg';
// import { ReactComponent as PaymentsIcon } from '../../assets/sidebar/payments.svg';
// import { ReactComponent as AppointmentsIcon } from '../../assets/sidebar/appointments.svg';
// import { ReactComponent as ApplicationsIcon } from '../../assets/sidebar/applications.svg';
// import { ReactComponent as NotificationsIcon } from '../../assets/sidebar/notifications.svg';
import { ReactComponent as SettingsIcon } from '../../assets/sidebar/settings.svg';
// import { ReactComponent as ClientsIcon } from '../../assets/sidebar/clients.svg';
// import { ReactComponent as DepartmentsIcon } from '../../assets/sidebar/departments.svg';
// import { ReactComponent as MembersIcon } from '../../assets/sidebar/members.svg';
import { ReactComponent as BlockedIcon } from '../../assets/sidebar/blocked.svg';
import { routes } from '../../../src/configs';
import { routesAccess } from '../../configs/roles';

const links = [
  {
    id: 'home',
    title: 'sidebar.home',
    link: routes.home.path,
    icon: OverviewIcon,
    disabled: false,
    roles: routesAccess.home.access,
  },
  {
    id: 'users',
    title: 'sidebar.users',
    link: routes.users.path,
    icon: BlockedIcon,
    disabled: false,
    roles: routesAccess.users.access,
  },
  {
    id: 'products',
    title: 'sidebar.products',
    link: routes.products.path,
    icon: BlockedIcon,
    disabled: false,
    roles: routesAccess.users.access,
  },
  {
    id: 'divider-1',
    title: '',
    link: '',
    icon: '',
    type: 'divider'
  },
  {
    id: 'settings',
    title: 'sidebar.settings',
    link: routes.settings.path,
    icon: SettingsIcon,
    disabled: false,
    roles: routesAccess.settings.access,
  },

];

export { links };
