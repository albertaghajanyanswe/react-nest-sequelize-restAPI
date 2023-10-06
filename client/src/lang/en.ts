const en = {
  pages: {
    changeLang: 'Change language',
    changeTheme: 'Change theme',
    light: 'Light',
    dark: 'Dark',
    meetings: 'Meetings',
    products: 'Products',
    home: 'Home',
    users: 'Users',
    settings: 'settings',
    logout: 'Logout'
  },
  sidebar: {
    home: 'Home',
    users: 'Users',
    overview: 'Overview',
    clients: 'Clients',
    companies: 'Companies',
    companiesEmployee: 'Companies employee',
    payments: 'Payments',
    appointments: 'Appointments',
    applications: 'Applications',
    notifications: 'Notifications',
    settings: 'Settings',
    help: 'Help center',
    welcome: 'Welcome',
    cfRegistration: 'CF Registration',
    departments: 'Departments',
    members: 'Members'
  },
  lang: {
    english: 'English',
    russian: 'Русский'
  },
  login: {
    title: 'Sign in',
    email: 'Email',
    username: 'Username',
    password: 'Password',
    signIn: 'Sign in',
    signInGuest: 'Sign in as a guest',
    createAccount: 'Dont have an account yet ?',
    register: 'Register one',
    errors: {
      common: 'Invalid credentials!',
    },
    registerGuest: 'Register as a guest',
    nickName: 'Nick name',
    firstName: 'First name',
    lastName: 'Last name',

  },
  register: {
    title: 'Registration',
    nickName: 'Nick name',
    firstName: 'First name',
    lastName: 'Last name',
    email: 'Email',
    password: 'Password',
    phone: 'Phone number',
    backToLogin: 'Back to Sign in',
    errors: {
      common: 'Could not register new user.'
    },
    submit: 'Register',
    switchGuestAccount: 'Switch with your guest account',
    guestNickName: 'Your guest account nick name',
    guestPassword: 'Your guest account password'
  },
  navbar: {
    todo: 'Todo',
    todoList: 'Todo List',
    users: 'Users',
    logout: 'Log Out',
    meeting: 'Booking meeting',
    products: 'Products'
  },
  todo: {
    title: 'TODO LIST',
    addTodo: 'Add Todo',
    statuses: {
      all: 'All',
      inprogress: 'Inprogress',
      completed: 'Completed'
    },
    modal: {
      title: 'Add TODO',
      description: 'Fill the todo details.',
      id: 'ID',
      name: 'Name',
      estimatedDate: 'Estimated date',
      status: 'Status',
      reminderDate: 'Reminder date',
      reminder: {
        title: 'Schedule reminder',
        description: 'Set up todo reminder date.',
        setReminder: 'Set reminder',
      }
    },
    noTodos: 'No Todos',
    sortByStatus: 'Sort by status',
    sortByEstimatedDate: 'Sort by estimated date',
    table: {
      id: 'ID',
      name: 'Name',
      estimatedDate: 'Estimated date',
      status: 'Status',
      reminderDate: 'Reminder date',
      user: 'User'
    },
  },
  table: {
    noResult: 'No result'
  },
  actions: {
    login: 'Login',
    signIn: 'Sign In',
    signOut: 'Sign Out',
    cancel: 'Cancel',
    submit: 'Submit',
    search: 'Search',
    edit: 'Edit',
    delete: 'Delete',
    setReminder: 'Set reminder time',
    changeStatus: 'Click to the row to change status'
  },
  actionMsg: {
    success: {
      create: 'Successfully created.',
      update: 'Successfully updated.',
      delete: 'Successfully deleted.',
      move: 'Successfully Moved.',
      operationSucceeded: 'Operation succeeded.',
    },
    error: {
      get: 'Could not get data',
      create: 'Could not create item.',
      update: 'Could not update item.',
      delete: 'Could not delete item.',
      unknownError: 'Unknown error.',
    },
  },
  meeting: {
    title: 'Title',
    description: 'Description',
    startDate: 'Start date',
    endDate: 'End date',
    createMeeting: "Create meeting",
  },
  validation: {
    required: '{name} is required'
  },
  errors: {
    required: '{field} field is required.',
    minChars: '{field} min length should be {count} character.',
    maxValue: '{field} max value should be {maxValue}.',
    greaterZero: '{field} value must be greater than zero.',
    incorrectEmail: 'Incorrect email format.',
    noUploadedFiles: 'No uploaded files',
    passwordMismatches: "Password confirmation doesn't match.",
    fileSizeLimit: 'Max file size should be 10 mb',
    invalidDate: 'Invalid date.',
    invalidPhone: 'Invalid phone number.',
    passwordRequirements: 'The entered password does not match the requirements.',
  },
};

export default en;
