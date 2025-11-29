import { SalesRecord } from "@/lib/sales/types";

interface Props {
  records: SalesRecord[];
}

const DefaultList = async ({ records }: Props) => {
  const data = records.slice(0, 1000);

  return (
    <table className="table-auto">
      <thead className="sticky top-0 bg-white">
        <tr className="whitespace-nowrap p-4">
          <th>Region</th>
          <th>Country</th>
          <th>Item type</th>
          <th>Sales Channel</th>
          <th>Order Priority</th>
          <th>Order Date</th>
          <th>Ship Date</th>
          <th>Order Id</th>
          <th>Units Sold</th>
          <th>Unit Price</th>
          <th>Unit Cost</th>
          <th>Total Revenue</th>
          <th>Total Cost</th>
          <th>Total Profit</th>
        </tr>
      </thead>
      <tbody>
        {data.map((record) => (
          <tr key={record.orderId} className="whitespace-nowrap p-4">
            <td>{record.region}</td>
            <td>{record.country}</td>
            <td>{record.itemType}</td>
            <td>{record.salesChannel}</td>
            <td>{record.orderPriority}</td>
            <td>{record.orderDate}</td>
            <td>{record.shipDate}</td>
            <td>{record.orderId}</td>
            <td>{record.unitsSold}</td>
            <td>{record.unitPrice}</td>
            <td>{record.unitCost}</td>
            <td>{record.totalRevenue}</td>
            <td>{record.totalCost}</td>
            <td>{record.totalProfit}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DefaultList;
