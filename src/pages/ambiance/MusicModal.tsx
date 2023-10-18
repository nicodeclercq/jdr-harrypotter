import { Form } from "../../components/Form";
import { Modal } from "../../components/Modal";

type Props = {
  value?: { name: string; url: string };
  onSubmit: (value: { name: string; url: string }) => void;
  onCancel: () => void;
};

export function MusicModal({ onSubmit, onCancel, value }: Props) {
  return (
    <Modal>
      <Form
        onSubmit={onSubmit}
        onCancel={onCancel}
        fields={{
          name: { defaultValue: value?.name ?? "", label: "Nom" },
          url: { defaultValue: value?.url ?? "", label: "Url" },
        }}
      />
    </Modal>
  );
}
