import React from 'react';
import { storiesOf } from '@storybook/react';
import Dropdown from '../component/dropdown/Dropdown';

storiesOf('Dropdown', module)
  .add('Default', () => (
    <Dropdown
      options={['USD', 'EUR', 'GBP', 'JPY', 'AUD']} 
      selectedItem="USD" 
      onChange={(event) => {
        console.log('Selected item:', event.target.value);
      }}
    />
  ));
