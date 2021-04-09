import React from 'react';
import ReactDOM from 'react-dom';
import { Modal } from '../components/Modal';

export function prompt<T>(content: (resolve: (result: T) => void) => React.ReactNode) {
  return new Promise<T>(resolve => {
    const portal = document.getElementById('portal');

    const onSubmit = (result: T) => {
      // @ts-ignore
      ReactDOM.unmountComponentAtNode(portal);
      resolve(result);
    };

    ReactDOM.render(
      (<Modal>
        {content(onSubmit)}
      </Modal>),
      portal,
    );
  })
}