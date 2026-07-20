import { LucideIcon } from "lucide-react";

type DashboardCardProps = {
  title: string;
  value: number;
  icon: LucideIcon;
};

export function DashboardCard({
  title,
  value,
  icon: Icon,
}: DashboardCardProps) {
  return (
    <div
      className="
      bg-white
      rounded-xl
      shadow-md
      p-6
      border
      hover:shadow-lg
      transition
      duration-300
      "
    >
      <div className="flex items-center gap-3">

        <Icon
          size={28}
          className="text-blue-600"
        />

        <h3
          className="
          text-gray-500
          text-sm
          font-medium
          "
        >
          {title}
        </h3>

      </div>

      <p
        className="
        text-4xl
        font-bold
        text-gray-900
        mt-4
        "
      >
        {value}
      </p>
    </div>
  );
}