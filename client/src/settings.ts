import { ProductIntendedForEnum, ProductProductStateEnum } from './generated/openapi';
import i18n from './i18n';

const SETTINGS = {
  apiUrl: process.env.REACT_APP_API_URL,
  uiUrl: process.env.REACT_APP_UI_URL,
  fileRead: '/api/proxy/files/read',
  usersStatuses: [
    { label: `${i18n.t('users.active')}`, value: 'active' },
    { label: `${i18n.t('users.inactive')}`, value: 'inactive' },
  ],
  timeLists: [
    { label: '12:00 AM', value: '12:00 AM' },
    { label: '12:30 AM', value: '12:30 AM' },
    { label: '01:00 AM', value: '01:00 AM' },
    { label: '01:30 AM', value: '01:30 AM' },
    { label: '02:00 AM', value: '02:00 AM' },
    { label: '02:30 AM', value: '02:30 AM' },
    { label: '03:00 AM', value: '03:00 AM' },
    { label: '03:30 AM', value: '03:30 AM' },
    { label: '04:00 AM', value: '04:00 AM' },
    { label: '04:30 AM', value: '04:30 AM' },
    { label: '05:00 AM', value: '05:00 AM' },
    { label: '05:30 AM', value: '05:30 AM' },
    { label: '06:00 AM', value: '06:00 AM' },
    { label: '06:30 AM', value: '06:30 AM' },
    { label: '07:00 AM', value: '07:00 AM' },
    { label: '07:30 AM', value: '07:30 AM' },
    { label: '08:00 AM', value: '08:00 AM' },
    { label: '08:30 AM', value: '08:30 AM' },
    { label: '09:00 AM', value: '09:00 AM' },
    { label: '09:30 AM', value: '09:30 AM' },
    { label: '10:00 AM', value: '10:00 AM' },
    { label: '10:30 AM', value: '10:30 AM' },
    { label: '11:00 AM', value: '11:00 AM' },
    { label: '11:30 AM', value: '11:30 AM' },
    { label: '12:00 PM', value: '12:00 PM' },
    { label: '12:30 PM', value: '12:30 PM' },
    { label: '01:00 PM', value: '01:00 PM' },
    { label: '01:30 PM', value: '01:30 PM' },
    { label: '02:00 PM', value: '02:00 PM' },
    { label: '02:30 PM', value: '02:30 PM' },
    { label: '03:00 PM', value: '03:00 PM' },
    { label: '03:30 PM', value: '03:30 PM' },
    { label: '04:00 PM', value: '04:00 PM' },
    { label: '04:30 PM', value: '04:30 PM' },
    { label: '05:00 PM', value: '05:00 PM' },
    { label: '05:30 PM', value: '05:30 PM' },
    { label: '06:00 PM', value: '06:00 PM' },
    { label: '06:30 PM', value: '06:30 PM' },
    { label: '07:00 PM', value: '07:00 PM' },
    { label: '07:30 PM', value: '07:30 PM' },
    { label: '08:00 PM', value: '08:00 PM' },
    { label: '08:30 PM', value: '08:30 PM' },
    { label: '09:00 PM', value: '09:00 PM' },
    { label: '09:30 PM', value: '09:30 PM' },
    { label: '10:00 PM', value: '10:00 PM' },
    { label: '10:30 PM', value: '10:30 PM' },
    { label: '11:00 PM', value: '11:00 PM' },
    { label: '11:30 PM', value: '11:30 PM' },
  ],
  currencyList: [
    { label: 'AMD', value: 'AMD' },
    { label: 'USD', value: 'USD' },
  ],
  intendedForList: [
    { label: i18n.t('products.intendedForOptions.forSale'), value: ProductIntendedForEnum.Sale },
    { label: i18n.t('products.intendedForOptions.forRent'), value: ProductIntendedForEnum.Rent },
    { label: i18n.t('products.intendedForOptions.forFreeGiving'), value: ProductIntendedForEnum.FreeGiving },
  ],
  productStateList: [
    { label: i18n.t('products.productStateOptions.new'), value: ProductProductStateEnum.New },
    { label: i18n.t('products.productStateOptions.used'), value: ProductProductStateEnum.Used },
    { label: i18n.t('products.productStateOptions.notOperable'), value: ProductProductStateEnum.NotOperable },
  ],
  regexp: {
    // eslint-disable-next-line
    number: '^(|(?!0\d)(\d+(\.\d*)?|\.\d+)([eE][-+]?\d+)?)$',
    percentage: /^$|^100$|^(?:\d{0,2}(?:\.\d{0,2})?)$/
  }
};

export default SETTINGS;