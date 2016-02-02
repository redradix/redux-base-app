import React from 'react'
import { Link } from 'react-router'
import { translate } from 'react-i18next/lib'

function Home({t}) {
  return (
    <div>
      <h3>{t('home.title')}</h3>
      <p><Link to="/ingredients">{t('home.ingredientsLink')}</Link>
      {' '}
      <Link to="/ingredients/create">{t('home.createIngredientLink')}</Link></p>

      <p><Link to="/dishes">{t('home.dishesLink')}</Link>
      {' '}
      <Link to="/dishes/create">{t('home.createDishLink')}</Link></p>

      <p><Link to="/orders">{t('home.ordersLink')}</Link>
      {' '}
      <Link to="/orders/create">{t('home.createOrderLink')}</Link></p>
    </div>
  );
}

export default translate(['common'])(Home);
