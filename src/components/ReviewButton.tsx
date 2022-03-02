type Props = {
  handleOnClick: () => void;
};
const ReviewButton = ({ handleOnClick }: Props) => {
  return (
    <>
      {/*buttonタグ + 小杉丸ゴシックフォントの組み合わせだと、スマホでのみ、１文字目（「覚」）が他の文字より明るくなるというバグに遭遇したため、divにしてある*/}
      <div
        onClick={handleOnClick}
        className="h-12 w-28 cursor-pointer rounded bg-gray-300 sm:hover:bg-gray-500 active:bg-gray-500 flex items-center justify-center font-kosugi-maru rounded-lg text-lg font-bold"
      >
        覚え直す
      </div>
    </>
  );
};

export default ReviewButton;
