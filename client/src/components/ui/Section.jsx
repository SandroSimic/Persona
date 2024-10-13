import styles from "./Section.module.scss";

// dodaj classname na section koji se zove section
const Section = ({ children, className }) => {
  return (
    <section className={`${className ? className : ""} ${styles.section}`}>
      {children}
    </section>
  );
};

export default Section;
