import blackShirtImg from "../../../assets/blackShirt.png";
import AdminProductCard from "./AdminProductCard";
import styles from "./AdminProductsList.module.scss";
const dummyData = [
  {
    id: 1,
    name: "Product 1",
    price: "$100",
    image: blackShirtImg,
  },
  {
    id: 2,
    name: "Product 2",
    price: "$200",
    image: blackShirtImg,
  },
  {
    id: 3,
    name: "Product 3",
    price: "$300",
    image: blackShirtImg,
  },
  {
    id: 4,
    name: "Product 4",
    price: "$400",
    image: blackShirtImg,
  },
  {
    id: 5,
    name: "Product 5",
    price: "$500",
    image: blackShirtImg,
  },
  {
    id: 6,
    name: "Product 6",
    price: "$600",
    image: blackShirtImg,
  },
  {
    id: 7,
    name: "Product 7",
    price: "$700",
    image: blackShirtImg,
  },
  {
    id: 8,
    name: "Product 8",
    price: "$800",
    image: blackShirtImg,
  },
];
const AdminProductsList = () => {
  return (
    <div className={styles.adminProductsList}>
      {dummyData.map((product) => {
        return <AdminProductCard key={product.id} product={product} />;
      })}
    </div>
  );
};

export default AdminProductsList;
