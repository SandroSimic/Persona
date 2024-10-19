import Input from "../components/ui/Input";
import styles from "./NewsletterSection.module.scss";
import logo from "../assets/logo.png";
import Section from "../components/ui/Section";

const NewsletterSection = () => {
  return (
    <Section className={styles.newsletterSection}>
      <div className={styles.logo}>
        <img src={logo} alt="persona logo" />
      </div>
      <p className={styles.text}>
        Sign up for our newsletter if you want to be updated when we release
        some new products
      </p>
      <div className={styles.actions}>
        <Input placeholder="Email" />
        <button>Subscribe</button>
      </div>
    </Section>
  );
};

export default NewsletterSection;
