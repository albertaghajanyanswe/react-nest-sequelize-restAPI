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
import i18n from "../../i18n";

const links = [
  {
    id: 'home',
    title: i18n.t('sidebar.home'),
    link: routes.home.path,
    icon: OverviewIcon,
    disabled: false,
  },
  {
    id: 'users',
    title: i18n.t('sidebar.users'),
    link: routes.users.path,
    icon: BlockedIcon,
    disabled: false,
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
    title: i18n.t('sidebar.settings'),
    link: routes.settings.path,
    icon: SettingsIcon,
    disabled: false,
  },

];

export { links };
