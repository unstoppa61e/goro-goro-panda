type Props = {
  handleOnClick: () => void;
};

const StartAnsweringButton = ({ handleOnClick }: Props) => {
  return (
    <>
      {/*buttonタグ + 小杉丸ゴシックフォントの組み合わせだと、スマホでのみ、１文字目（「覚」）が他の文字より明るくなるというバグに遭遇したため、divにしてある*/}
      <div
        onClick={handleOnClick}
        className="flex items-center justify-center font-kosugi-maru rounded-lg h-14 w-28 border-2 border-white hover:border-gray-200 hover:text-gray-200 bg-ok text-lg font-bold cursor-pointer"
      >
        覚えた！
      </div>
    </>
  );
};

export default StartAnsweringButton;
