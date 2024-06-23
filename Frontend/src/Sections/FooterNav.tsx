import styles from "./FooterNav.module.scss";

const FooterNav = () => {
  return (
    <section className={styles.footerNav}>
      <div className={styles.newsletter}>
        <p>
          Sign up for our newsletter if you want to be updated when we release
          some new products
        </p>
        <div className={styles.newsletterAction}>
          <input type="text" placeholder="email" />
          <button>SIGN UP</button>
        </div>
      </div>
      <div className={styles.footerNavActions}>
        <div>
          <h3>PRODUCTS</h3>
          <p>T-Shirt</p>
          <p>Hoodie</p>
          <p>Jacket</p>
          <p>Pants</p>
        </div>
        <div>
          <h3>CATEGORIES</h3>
          <p>Men</p>
          <p>Women</p>
          <p>Kids</p>
        </div>
      </div>
    </section>
  );
};

export default FooterNav;
