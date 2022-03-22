type Props = {
  toggleModal: () => void;
};

const ModalToggleButton = ({ toggleModal }: Props) => {
  return (
    <button
      onClick={toggleModal}
      className="mt-8 border-2 p-2 text-xl"
      data-testid="debug"
    >
      toggle modal for debug
    </button>
  );
};

export default ModalToggleButton;
