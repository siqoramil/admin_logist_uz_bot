import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  ru: {
    translation: {
      language: { ru: 'RU', en: 'EN' },
      common: { refresh: 'Обновить', logout: 'Выйти', close: 'Закрыть', all: 'Все', active: 'Активные', blocked: 'Заблокированные' },
      login: {
        eyebrow: 'Панель управления', title: 'Вход в CRM', description: 'Управляйте пользователями бота и доступами в одном месте.',
        username: 'Логин', password: 'Пароль', submit: 'Войти в панель', loading: 'Проверяем…',
        showPassword: 'Показать пароль', hidePassword: 'Скрыть пароль',
      },
      dashboard: {
        adminPanel: 'Панель администратора', adminHint: 'Контроль доступов и клиентов бота', administrator: 'Администратор',
        nav: 'Управление', users: 'Пользователи', analytics: 'Аналитика', systemStatus: 'Состояние системы', online: 'Бот онлайн',
        eyebrow: 'Дашборд', title: 'Управление пользователями', description: 'Введите username и номер телефона оплатившего клиента вместе.',
      },
      stats: { total: 'Всего доступов', active: 'Активные доступы', linked: 'Подтверждено в Telegram', subscribers: 'Клиенты бота' },
      form: {
        eyebrow: 'Новый клиент', title: 'Добавить доступ', username: 'Telegram username', phone: 'Номер телефона',
        hint: 'Доступ откроется, только если контакт и username клиента совпадут.', submit: 'Разрешить доступ', loading: 'Добавляем…', success: 'Доступ успешно добавлен',
      },
      table: {
        title: 'Список доступов', description: 'Пара username и телефона подтверждается через Telegram', search: 'Поиск…',
        username: 'Username', phone: 'Телефон', verification: 'Проверка', status: 'Статус', created: 'Добавлен', expires: 'Действует до', actions: 'Действия',
        verified: 'Подтверждено', telegramId: 'Telegram ID: {{id}}', waiting: 'Ожидается контакт', active: 'Активен', blocked: 'Заблокирован',
        emptyTitle: 'Доступы не найдены', emptyHint: 'Добавьте нового клиента с помощью кнопки «+».',
      },
      actions: { block: 'Заблокировать', activate: 'Активировать', delete: 'Удалить', deleteConfirm: 'Удалить доступ для @{{username}}?' },
      analytics: {
        eyebrow: 'Финансы', title: 'Аналитика доходов', description: 'Доход рассчитывается по тарифу 100 000 сум за один месяц доступа.',
        currency: 'сум', currentMonth: 'Доход за текущий месяц', recurring: 'Ожидаемый доход в месяц', activeSubscriptions: 'Активные подписки', totalRevenue: 'Общий доход',
        chartTitle: 'Доход по месяцам', chartHint: 'Оплаты и повторные активации за последние 6 месяцев', month: 'месяц', expiringSoon: 'Истекают в течение 7 дней', expiringHint: 'Этих клиентов нужно заранее предупредить о продлении.', totalPayments: 'Всего оплаченных месяцев',
      },
      help: { title: 'Как это работает?', text: 'Клиент нажимает «Отправить мой номер». Бот проверяет владельца контакта, телефон и текущий username.' },
      errors: {
        login: 'Не удалось войти.', request: 'Не удалось выполнить операцию.',
        codes: {
          'invalid-credentials': 'Неверный логин или пароль. Проверьте данные и попробуйте снова.',
          'origin-forbidden': 'Сервер отклонил адрес панели. Проверьте настройку ADMIN_ORIGIN.',
          'admin-build-missing': 'Сервер не нашёл сборку админ-панели. Администратору нужно выполнить сборку заново.',
          'missing-fields': 'Username и номер телефона обязательны. Заполните оба поля.',
          'invalid-username': 'Неверный Telegram username. Нужно от 5 до 32 латинских букв, цифр или символов подчёркивания.',
          'invalid-phone': 'Неверный номер. Введите 9 цифр после +998 в формате 99 123 11 22.',
          'username-in-use': 'Этот username уже привязан к другому номеру. Укажите ранее сохранённый номер или удалите старую запись.',
          'phone-in-use': 'Этот номер уже привязан к другому username. Укажите ранее сохранённый username или удалите старую запись.',
          'invalid-enabled': 'Сервер получил неверный статус доступа. Обновите страницу и повторите действие.',
          'access-not-found': 'Запись доступа не найдена. Возможно, она уже удалена — обновите список.',
          'endpoint-not-found': 'Запрошенный API-адрес не найден. Проверьте версии панели и сервера.',
          'invalid-json': 'Сервер получил повреждённые данные запроса. Обновите страницу и попробуйте снова.',
          'request-too-large': 'Запрос слишком большой. Сократите отправляемые данные.',
          'validation-error': 'Данные не прошли проверку сервера. Проверьте введённые значения.',
          'duplicate-access': 'Username или номер уже существует. Обновите список и проверьте существующую запись.',
          'network-error': 'Нет соединения с сервером. Проверьте, запущен ли backend, интернет и адрес VITE_API_URL.',
          'invalid-response': 'Сервер вернул ответ неизвестного формата. Проверьте совместимость frontend и backend.',
          'server-error': 'Внутренняя ошибка сервера. Повторите позже; если ошибка сохранится, проверьте логи backend.',
          unknown: 'Неизвестная ошибка. Обновите страницу и повторите действие; если не поможет, проверьте логи сервера.',
        },
      },
    },
  },
  en: {
    translation: {
      language: { ru: 'RU', en: 'EN' },
      common: { refresh: 'Refresh', logout: 'Sign out', close: 'Close', all: 'All', active: 'Active', blocked: 'Blocked' },
      login: {
        eyebrow: 'Control center', title: 'Sign in to CRM', description: 'Manage bot users and access from one place.',
        username: 'Username', password: 'Password', submit: 'Sign in', loading: 'Checking…',
        showPassword: 'Show password', hidePassword: 'Hide password',
      },
      dashboard: {
        adminPanel: 'Admin panel', adminHint: 'Bot access and customer control', administrator: 'Administrator',
        nav: 'Management', users: 'Users', analytics: 'Analytics', systemStatus: 'System status', online: 'Bot online',
        eyebrow: 'Dashboard', title: 'User management', description: 'Enter the paying customer’s username and phone number together.',
      },
      stats: { total: 'Total access', active: 'Active access', linked: 'Telegram verified', subscribers: 'Bot customers' },
      form: {
        eyebrow: 'New customer', title: 'Add access', username: 'Telegram username', phone: 'Phone number',
        hint: 'Access opens only when the customer’s contact and username both match.', submit: 'Grant access', loading: 'Adding…', success: 'Access added successfully',
      },
      table: {
        title: 'Access list', description: 'The username and phone pair is verified through Telegram', search: 'Search…',
        username: 'Username', phone: 'Phone', verification: 'Verification', status: 'Status', created: 'Created', expires: 'Active until', actions: 'Actions',
        verified: 'Verified', telegramId: 'Telegram ID: {{id}}', waiting: 'Waiting for contact', active: 'Active', blocked: 'Blocked',
        emptyTitle: 'No access records found', emptyHint: 'Add a new customer using the “+” button.',
      },
      actions: { block: 'Block', activate: 'Activate', delete: 'Delete', deleteConfirm: 'Delete access for @{{username}}?' },
      analytics: {
        eyebrow: 'Finance', title: 'Revenue analytics', description: 'Revenue is calculated at 100,000 UZS for one month of access.',
        currency: 'UZS', currentMonth: 'Revenue this month', recurring: 'Expected monthly revenue', activeSubscriptions: 'Active subscriptions', totalRevenue: 'Total revenue',
        chartTitle: 'Monthly revenue', chartHint: 'Payments and renewals over the last 6 months', month: 'month', expiringSoon: 'Expiring within 7 days', expiringHint: 'Notify these customers about renewal in advance.', totalPayments: 'Total paid months',
      },
      help: { title: 'How does it work?', text: 'The customer taps “Send my phone number”. The bot checks the contact owner, phone number, and current username.' },
      errors: {
        login: 'Sign-in failed.', request: 'The operation failed.',
        codes: {
          'invalid-credentials': 'The username or password is incorrect. Check both values and try again.',
          'origin-forbidden': 'The server rejected the admin panel origin. Check the ADMIN_ORIGIN setting.',
          'admin-build-missing': 'The server could not find the admin build. The administrator must rebuild the panel.',
          'missing-fields': 'Username and phone number are both required. Complete both fields.',
          'invalid-username': 'Invalid Telegram username. Use 5–32 Latin letters, digits, or underscores.',
          'invalid-phone': 'Invalid phone number. Enter 9 digits after +998 in the format 99 123 11 22.',
          'username-in-use': 'This username is already linked to another number. Use the saved number or remove the old record.',
          'phone-in-use': 'This phone number is already linked to another username. Use the saved username or remove the old record.',
          'invalid-enabled': 'The server received an invalid access status. Refresh the page and try again.',
          'access-not-found': 'The access record was not found. It may already be deleted; refresh the list.',
          'endpoint-not-found': 'The requested API endpoint was not found. Check that the panel and server versions match.',
          'invalid-json': 'The server received malformed request data. Refresh the page and try again.',
          'request-too-large': 'The request is too large. Reduce the submitted data.',
          'validation-error': 'The data failed server validation. Check the entered values.',
          'duplicate-access': 'The username or phone number already exists. Refresh the list and check the existing record.',
          'network-error': 'Cannot connect to the server. Check that the backend is running, the network, and VITE_API_URL.',
          'invalid-response': 'The server returned an unknown response format. Check frontend and backend compatibility.',
          'server-error': 'Internal server error. Try again later; check backend logs if it continues.',
          unknown: 'Unknown error. Refresh and retry; check the server logs if it continues.',
        },
      },
    },
  },
} as const

const savedLanguage = localStorage.getItem('crm-language')

void i18n.use(initReactI18next).init({
  resources,
  lng: savedLanguage === 'en' ? 'en' : 'ru',
  fallbackLng: 'ru',
  interpolation: { escapeValue: false },
})

export default i18n
