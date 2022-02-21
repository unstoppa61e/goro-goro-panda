type Props = {
  handleOnClick: () => void;
};

const Button = ({ handleOnClick }: Props) => {
  return (
    <button
      onClick={handleOnClick}
      className="rounded-lg h-11 w-36 border-2 border-white bg-ok text-lg font-bold mt-8 font-kosugi-maru"
    >
      おぼえた！
    </button>
  );
};

export default Button;
