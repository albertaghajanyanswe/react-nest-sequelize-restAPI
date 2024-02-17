import { decorateShowField } from "../../../helpers/adapter";
import SETTINGS from "../../../settings";

const options = {
  fields: [],
  rowsPerPageOptions: [1, 2, 3, 4, 5, 10, 25, 50, 100],
  searchFields: ['name', 'description'],
  filterFields: decorateShowField([
    { id: 'intendedFor_in', label: 'products.intendedFor', placeholder: 'products.intendedFor', type: 'select', options: SETTINGS.intendedForList, adapterCallback: (data: any) => data, priority: 1, sortBySelected: true, multiple: true, selectAll: true, selectAllLabel: 'actions.selectAll' } as const,
  ])
};

export { options };