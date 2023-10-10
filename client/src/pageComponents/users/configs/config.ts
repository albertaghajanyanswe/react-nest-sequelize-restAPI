import { User } from '../../../generated/openapi';
import { decorateShowField } from '../../../helpers/adapter';
import SETTINGS from '../../../settings';
import { ColumnBold, ColumnActions } from './cellComponents';

const tableOptions = {
  fields: decorateShowField([
    { id: 'id', orderField: 'id', label: 'users.id', type: 'text', component: ColumnBold, sortable: true, width: '19%', cellPaddingRight: '8px', cellPaddingLeft: '16px' } as const,
    { id: 'firstName', orderField: 'firstName', label: 'users.firstName', type: 'text', component: ColumnBold, sortable: true, width: '19%', cellPaddingRight: '8px', cellPaddingLeft: '16px' } as const,
    { id: 'lastName', orderField: 'lastName', label: 'users.lastName', type: 'text', component: ColumnBold, sortable: true, width: '19%', cellPaddingRight: '8px', cellPaddingLeft: '16px' } as const,
    { id: 'email', orderField: 'email', label: 'users.email', type: 'text', component: ColumnBold, sortable: true, width: '19%', cellPaddingRight: '8px', cellPaddingLeft: '16px' } as const,
    { id: 'action', label: '', type: 'customComponent', component: ColumnActions, sortable: false, width: '5%', cellPaddingRight: '8px', cellPaddingLeft: '16px',
      show: ({ currentUser }: { currentUser?: User | null }) => {
        return currentUser?.roles?.includes('ADMIN');
      }
    } as const,
  ] as const),
  rowsPerPageOptions: [1, 2, 3, 4, 5, 10, 25, 50, 100],
  searchFields: ['firstName', 'lastName', 'email', 'nickName'],
  filterFields: decorateShowField([
    {id: 'isActive_eq', label: 'users.userStatus', placeholder: 'users.userStatus', type: 'select', options: SETTINGS.usersStatuses, adapterCallback: (data: any) => data, priority: 1, sortBySelected: true, multiple: false, selectAll: true, selectAllLabel: 'users.allUsers' } as const,
  ])
};

export { tableOptions };