import styles from "./UI.module.scss";

type HeadingProps = {
  mainText: string;
  subText?: string;
};

const Heading = ({ mainText, subText }: HeadingProps) => {
  return (
    <div className={styles.heading}>
      <h1>{mainText}</h1>
      <p>{subText}</p>
    </div>
  );
};

export default Heading;
