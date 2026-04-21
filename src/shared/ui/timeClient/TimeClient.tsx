"use client";

import { useEffect, useState } from "react";
import { useFormatter } from "next-intl";

const TimeClient = ({ initialTime }: { initialTime: string }) => {
  const [time, setTime] = useState(new Date(initialTime));
  const format = useFormatter();

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeTest = format.dateTime(time, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }).toLowerCase();
  return (
    <div className="absolute right-5 top-5 text-text-main/70 hidden lg:flex text-[.85rem]">
      {timeTest}
    </div>
  );
};

export default TimeClient;
