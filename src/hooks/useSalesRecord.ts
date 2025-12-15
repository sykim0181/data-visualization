import { SalesRecord } from "@/lib/sales/types";
import { useEffect, useState } from "react";

const useSalesRecord = () => {
  const [records, setRecords] = useState<SalesRecord[]>([]);
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    fetch("/sales.raw.json", { cache: "force-cache" }).then(async (res) => {
      const records = (await res.json()) as SalesRecord[];
      setRecords(records);
      setIsFetched(true);
    });
  }, []);

  return { records, isFetched };
};

export default useSalesRecord;
