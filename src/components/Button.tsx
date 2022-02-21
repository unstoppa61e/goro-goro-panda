type Props = {
  handleOnClick: () => void;
};

const Button = ({ handleOnClick }: Props) => {
  return (
    <button
      onClick={handleOnClick}
      className="rounded-lg h-14 w-28 border-2 border-white bg-ok text-lg font-bold mt-8 font-kosugi-maru"
    >
      覚えた！
    </button>
  );
};

export default Button;
