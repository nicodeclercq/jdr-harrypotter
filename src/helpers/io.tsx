import React from "react";
import { Button } from "../components/Button";
import { Modal } from "../components/Modal";
import { ReactPortalAppRoot } from "../root";

export function prompt<T>(
  content: (resolve: (result: T) => void) => React.ReactNode,
  header?: React.ReactNode
) {
  return new Promise<T>((resolve) => {
    const onSubmit = (result: T) => {
      ReactPortalAppRoot.render(<></>);
      resolve(result);
    };

    ReactPortalAppRoot.render(
      <Modal header={header}>{content(onSubmit)}</Modal>
    );
  });
}

export function confirm({
  title,
  message,
  onConfirm,
}: {
  title?: React.ReactNode;
  message: React.ReactNode;
  onConfirm: () => void;
}) {
  const onSubmit = () => {
    ReactPortalAppRoot.unmount();
    onConfirm();
  };
  const onCancel = () => {
    ReactPortalAppRoot.unmount();
  };

  ReactPortalAppRoot.render(
    <Modal header={title}>
      <div className="p-4">{message}</div>
      <div className="flex justify-end pt-8 space-x-4">
        <Button type="primary" onClick={onCancel}>
          Annuler
        </Button>
        <Button type="secondary" onClick={onSubmit}>
          Supprimer
        </Button>
      </div>
    </Modal>
  );
}
