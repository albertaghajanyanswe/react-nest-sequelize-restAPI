const ru = {
  pages: {
    changeLang: 'Изменить язык',
    changeTheme: 'Изменить тему',
    light: 'Светлый',
    dark: 'Тёмный',
    users: 'Список всех пользователей',
    meetings: 'Встречи',
    products: 'Продукты'
  },
  lang: {
    english: 'English',
    russian: 'Русский'
  },
  login: {
    title: 'Войти',
    email: 'Электронная почта',
    username: 'Имя пользователя',
    password: 'Пароль',
    signIn: 'Войти',
    signInGuest: 'Войти как гость',
    createAccount: 'У вас еще нет учетной записи?',
    register: 'Зарегистрировать один',
    errors: {
      common: 'Неверные учетные данные!',
    },
    registerGuest: 'Зарегистрируйтесь в качестве гостя',
    nickName: 'Псевдоним',
    firstName: 'Имя',
    lastName: 'Фамилия',

  },
  register: {
    title: 'Регистрация',
    nickName: 'Псевдоним',
    firstName: 'Имя',
    lastName: 'Фамилия',
    email: 'Электронная почта',
    password: 'Пароль',
    backToLogin: 'Назад для входа в систему',
    errors: {
      common: 'Не удалось зарегистрировать нового пользователя',
    },
    submit: 'Зарегистрироваться',
    switchGuest: 'Переключиться с гостевой учетной записью',
    guestNickName: 'Псевдоним вашей гостевой учетной записи',
    guestPassword: 'Пароль вашей гостевой учетной записи'
  },
  navbar: {
    todo: 'Todo',
    todoList: 'Список дел',
    users: 'Пользователи',
    logout: 'Выйти',
    meeting: 'Забронировать встречу',
    products: 'Продукты'
  },
  todo: {
    title: 'СПИСОК ЗАДАЧ',
    addTodo: 'Добавить задачу',
    statuses: {
      all: 'Все',
      inprogress: 'В процессе',
      completed: 'Завершено'
    },
    modal: {
      title: 'Добавить TODO',
      description: 'Заполните детали задачи.',
      id: 'ID',
      name: 'Имя',
      estimatedDate: 'Предполагаемая дата',
      status: 'Статус',
      reminderDate: 'Дата напоминания',
      reminder: {
        title: 'Запланировать напоминание',
        description: 'Установить дату напоминания о делах.',
        setReminder: 'Установить напоминание',
      }
    },
    noTodos: 'Нет задач',
    sortByStatus: 'Сортировать по статусу',
    sortByEstimatedDate: 'Сортировать по предполагаемой дате',
    table: {
      id: 'ID',
      name: 'Имя',
      estimatedDate: 'Предполагаемая дата',
      status: 'Статус',
      reminderDate: 'Дата напоминания',
      user: 'Пользователь'
    },
  },
  table: {
    noResult: 'Нет результата'
  },
  actions: {
    login: 'Войти',
    signIn: 'Войти',
    SignOut: 'Выйти',
    cancel: 'Отменить',
    submit: 'Отправить',
    search: 'Поиск',
    edit: 'Редактировать',
    delete: 'Удалить',
    setReminder: 'Установить время напоминания',
    changeStatus: 'Нажмите на строку, чтобы изменить статус'
  },
  actionMsg: {
    success: {
      create: 'Успешно создано.',
      update: 'Успешно обновлено.',
      delete: 'Успешно удалено.',
      move: 'Успешно перемещено.',
      operationSucceeded: 'Операция выполнена успешно.',
    },
    error: {
      get: 'Не удалось получить данные',
      create: 'Не удалось создать элемент.',
      update: 'Не удалось обновить элемент.',
      delete: 'Не удалось удалить элемент.',
      unknownError: 'Неизвестная ошибка.',
    },
  },
  meeting: {
    title: 'Название',
    description: 'Описание',
    startDate: 'Дата начала',
    endDate: 'Дата окончания',
    createMeeting: "Создать встречу",
  },
  validation: {
    required: '{name} требуется'
  },
  errors: {
    required: 'Поле {field} является обязательным.',
    minChars: 'Минимальная длина {поля} должна составлять {count} символов.',
    maxValue: 'Максимальное значение {field} должно быть {maxValue}.',
    greaterZero: 'Значение {поля} должно быть больше нуля.',
    incorrectEmail: 'Неверный формат электронной почты.',
    noUploadedFiles: 'Нет загруженных файлов',
    passwordMismatches: "Подтверждение пароля не совпадает.",
    fileSizeLimit: 'Максимальный размер файла должен составлять 10 МБ',
    validDate: 'Неверная дата.',
    validPhone: 'Неверный номер телефона.',
    passwordRequirements: 'Введенный пароль не соответствует требованиям.',
  },
};

export default ru;
