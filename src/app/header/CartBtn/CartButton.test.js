
import React from 'react';
import ReactDOM from 'react-dom';
import CartButton from "./CartButton";


it('empty cart', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CartButton />, div);
  expect(div.textContent).toBe('Cart: 0');
  ReactDOM.unmountComponentAtNode(div);
});