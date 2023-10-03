// ExampleComponent.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';

function ChangeLanguage() {
  const { t } = useTranslation();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <div>
      <h1>{t('pages.changeLang')}</h1>
      <button onClick={() => changeLanguage('en')}>{t('lang.english')}</button>
      <button onClick={() => changeLanguage('ru')}>{t('lang.russian')}</button>
    </div>
  );
}

export default ChangeLanguage;