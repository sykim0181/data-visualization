/* 레코드 속성 값에 따라 높이가 달라지는 행 컴포넌트 */
import { SalesRecord } from "@/lib/sales/types";

const priorityLabel: Record<SalesRecord["orderPriority"], string> = {
  H: "High",
  C: "Critical",
  M: "Medium",
  L: "Low",
};

const StaticSalesRow = ({ record }: { record: SalesRecord }) => {
  return (
    <div className="p-4 bg-white">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="text-sm text-gray-500">
          {record.region} · {record.country}
        </div>
        <div className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">
          {record.salesChannel} · {record.itemType}
        </div>
      </div>

      <div className="mt-1 flex flex-wrap items-baseline gap-2">
        <div className="font-semibold text-sm">
          Order #{record.orderId.toString()}
        </div>
        <div className="text-xs text-gray-500">
          {record.orderDate} → {record.shipDate}
        </div>
      </div>

      <div className="mt-2 text-sm text-gray-600">
        Priority: {priorityLabel[record.orderPriority]}
      </div>

      <div className="mt-2 text-sm text-gray-500 leading-relaxed">
        {record.salesChannel === "Online" ? (
          <p>
            온라인 채널을 통한 주문으로, 마케팅 및 UX 개선에 참고할 수 있습니다.
          </p>
        ) : (
          <p>오프라인 채널 주문으로, 재고·물류와 더 밀접한 지표입니다.</p>
        )}
        {record.totalProfit > 500_000 ? (
          <p>
            이 주문은 단일 건으로도 상당한 이익을 발생시킨 고가 상품 주문에
            해당합니다.
            <br />
            제품 구성을 분석하면 고마진 상품 조합을 찾는 데 도움이 됩니다.
          </p>
        ) : record.totalProfit < 0 ? (
          <p>
            이 주문은 손실이 발생한 케이스로, 가격 전략 또는 비용 구조를
            재검토해야 할 수 있습니다.
          </p>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default StaticSalesRow;
