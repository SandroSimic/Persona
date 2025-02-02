import { useGetDashboardState } from "../adminQueries/useGetDashboardState";
import { BsBoxFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";
import styles from "./AdminDashInfo.module.scss";
import AdminDashInfoCard from "./AdminDashInfoCard";
import AdminDashInfoEarning from "./AdminDashInfoEarning";

function AdminDashInfo() {
  const { data, isLoading } = useGetDashboardState();

  if (isLoading) return <div>loading</div>;

  const infoData = [
    {
      title: "Products",
      value: data?.totalProducts,
      icon: <BsBoxFill color="white" size={20} />,
      color: styles.blue,
    },
    {
      title: "Customers",
      value: data?.totalCustomers,
      icon: <FaUserAlt color="white" size={20} />,
      color: styles.orange,
    },
    {
      title: "Total Income",
      value: `$${data?.totalIncome}`,
      icon: <MdAttachMoney color="white" size={20} />,
      color: styles.green,
    },
  ];

  return (
    <div className={styles.adminDashInfoContainer}>
      <div className={styles.adminDashInfo}>
        {infoData.map((info) => (
          <AdminDashInfoCard
            key={info.title}
            color={info.color}
            icon={info.icon}
            title={info.title}
            value={info.value}
          />
        ))}
      </div>
      <AdminDashInfoEarning
        yearlyIncome={data?.estimatedYearlyIncome}
        monthlyIncome={data?.estimatedMonthlyIncome}
        monthlyBreakdown={data?.monthlyBreakdown}
      />
    </div>
  );
}

export default AdminDashInfo;
