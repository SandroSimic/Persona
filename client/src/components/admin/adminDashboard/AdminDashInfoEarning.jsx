/* eslint-disable react/prop-types */
import { useMemo } from "react";
import { Chart } from "react-charts";
import styles from "./AdminDashInfoEarning.module.scss";

function AdminDashInfoEarning({
  yearlyIncome,
  monthlyIncome,
  monthlyBreakdown,
  year = new Date().getFullYear(),
}) {
  const months = useMemo(
    () => [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    []
  );

  const monthlyData = useMemo(() => {
    return months.map((month, index) => {
      const monthNumber = index + 1;
      const record = monthlyBreakdown.find((item) => {
        const [m, y] = item.month.split("/");
        return parseInt(m, 10) === monthNumber && parseInt(y, 10) === year;
      });
      return {
        primary: month,
        secondary: record ? record.monthlyIncome : 0,
      };
    });
  }, [months, monthlyBreakdown, year]);

  const data = useMemo(
    () => [
      {
        label: "Monthly Income",
        data: monthlyData,
      },
    ],
    [monthlyData]
  );

  // Define the primary axis (X-axis) for the chart.
  const primaryAxis = useMemo(
    () => ({
      getValue: (datum) => datum.primary,
      scaleType: "band", // 'band' is used for categorical (ordinal) data.
    }),
    []
  );

  // Define the secondary axis (Y-axis) for the chart.
  const secondaryAxes = useMemo(
    () => [
      {
        getValue: (datum) => datum.secondary,
        scaleType: "linear", // For numerical values.
      },
    ],
    []
  );

  return (
    <div className={styles.adminDashInfoEarning}>
      <div className={styles.adminDashInfoEarningPrice}>
        <div className={styles.yearlyIncome}>
          <p>Estimated Yearly Income</p>
          <span>${yearlyIncome}</span>
        </div>
        <div className={styles.monthlyIncome}>
          <p>Estimated Monthly Income</p>
          <span>${monthlyIncome}</span>
        </div>
      </div>
      <div className={styles.adminDashGraph}>
        <Chart
        className={styles.adminDashGraphBar}
          options={{
            data,
            primaryAxis,
            secondaryAxes,
            series: { type: "bar" }, // Specify a bar chart
          }}
        />
      </div>
    </div>
  );
}

export default AdminDashInfoEarning;
