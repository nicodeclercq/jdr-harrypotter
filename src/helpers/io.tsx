import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';

export function prompt<T>(content: (resolve: (result: T) => void) => React.ReactNode, header?: React.ReactNode) {
  return new Promise<T>(resolve => {
    const portal = document.getElementById('portal');

    const onSubmit = (result: T) => {
      // @ts-ignore
      ReactDOM.unmountComponentAtNode(portal);
      resolve(result);
    };

    ReactDOM.render(
      (<Modal header={header}>
        {content(onSubmit)}
      </Modal>),
      portal,
    );
  })
}

export function confirm({title, message, onConfirm}: {title?: React.ReactNode, message: React.ReactNode, onConfirm: () => void}) {
  const portal = document.getElementById('portal');

  const onSubmit = () => {
    // @ts-ignore
    ReactDOM.unmountComponentAtNode(portal);
    onConfirm();
  };
  const onCancel = () => {
    // @ts-ignore
    ReactDOM.unmountComponentAtNode(portal);
  }

  ReactDOM.render(
    (<Modal header={title}>
      <div className="p-4">
        {message}
      </div>
      <div className="flex justify-end pt-8 space-x-4">
          <Button
              type="primary"
              onClick={onCancel}
            >
              Annuler
            </Button>
          <Button
            type="secondary"
            onClick={onSubmit}
          >
            Supprimer
          </Button>
        </div>
    </Modal>),
    portal,
  );
}