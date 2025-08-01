import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  iconColor: string;
  borderColor: string;
}

export default function StatsCard({ title, value, change, icon: Icon, iconColor, borderColor }: StatsCardProps) {
  return (
    <Card className={`border-l-4 ${borderColor}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-3xl font-bold text-foundation-navy">{value}</p>
          </div>
          <div className={`${iconColor} bg-opacity-10 p-3 rounded-full`}>
            <Icon className={`${iconColor.replace('bg-', 'text-')} text-xl`} />
          </div>
        </div>
        <div className="mt-4">
          <span className="text-green-500 text-sm font-medium">{change}</span>
        </div>
      </CardContent>
    </Card>
  );
}
