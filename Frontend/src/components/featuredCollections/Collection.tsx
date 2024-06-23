import useWindowSize from "../../hooks/useWindowSize";

type CollectionProps = {
  mainText: string;
  className: string;
};

const Collection = ({ mainText, className }: CollectionProps) => {
  const { mobile } = useWindowSize();

  return (
    <div className={className}>
      <h3>{mainText}</h3>
      {mobile ? null : <button>Discover</button>}
    </div>
  );
};

export default Collection;
