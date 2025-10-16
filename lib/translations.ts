export const translations = {
  RU: {
    // Header
    'announcements': 'Анонсы серверов Lineage 2',
    'personal_cabinet': 'Личный кабинет',
    'login': 'Войти',
    'my_account': 'Мой аккаунт',
    
    // Servers Section
    'soon_open': 'Скоро откроются',
    'already_opened': 'Уже открылись',
    'today': 'Сегодня',
    'tomorrow': 'Завтра',
    'vip_servers': 'VIP сервера',
    'opening_soon': 'Открытие скоро',
    'already_opened_short': 'Уже открытые',
    
    // Common
    'user': 'Пользователь',
    'l2pick': 'l2pick.',
    'com': 'com',
  },
  EN: {
    // Header
    'announcements': 'Lineage 2 Server Announcements',
    'personal_cabinet': 'Personal Cabinet',
    'login': 'Login',
    'my_account': 'My Account',
    
    // Servers Section
    'soon_open': 'Opening Soon',
    'already_opened': 'Already Opened',
    'today': 'Today',
    'tomorrow': 'Tomorrow',
    'vip_servers': 'VIP Servers',
    'opening_soon': 'Opening Soon',
    'already_opened_short': 'Already Opened',
    
    // Common
    'user': 'User',
    'l2pick': 'l2pick.',
    'com': 'com',
  }
};

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.RU;
