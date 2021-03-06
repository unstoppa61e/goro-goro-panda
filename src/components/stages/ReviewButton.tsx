type Props = {
  handleOnClick: () => void;
};
const ReviewButton = ({ handleOnClick }: Props) => {
  return (
    <>
      {/*buttonタグ + 小杉丸ゴシックフォントの組み合わせだと、スマホでのみ、１文字目（「覚」）が他の文字より明るくなるというバグに遭遇したため、divにしてある*/}
      <div
        onClick={handleOnClick}
        className="relative flex items-center justify-center font-kosugi-maru rounded-full py-2.5 px-16 border-4 border-white shadow-lg shadow-black/25 sm:hover:border-gray-200 sm:hover:text-gray-200 active:border-gray-200 active:text-gray-200 bg-gradient-to-b from-navy-darkest to-navy-darker text-lg font-bold cursor-pointer"
        data-testid="review"
      >
        <span className="absolute top-1.5 w-42 h-5.5 bg-white opacity-30 rounded-full" />
        覚え直す
      </div>
    </>
  );
};

export default ReviewButton;
