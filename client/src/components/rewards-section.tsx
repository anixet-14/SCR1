import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Star, Users, TrendingUp, Crown, Gem, Rocket, Gift } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { type Achievement } from "@shared/schema";

interface RewardsSectionProps {
  achievements?: Achievement[];
  isLoading: boolean;
}

export default function RewardsSection({ achievements, isLoading }: RewardsSectionProps) {
  const allBadges = [
    { name: "First Donation", icon: Star, earned: true, color: "yellow" },
    { name: "Team Player", icon: Users, earned: true, color: "orange" },
    { name: "Rising Star", icon: TrendingUp, earned: true, color: "blue" },
    { name: "Champion", icon: Crown, earned: false, color: "gray" },
    { name: "Diamond", icon: Gem, earned: false, color: "gray" },
    { name: "Legend", icon: Rocket, earned: false, color: "gray" },
  ];

  const getColorClasses = (color: string, earned: boolean) => {
    if (!earned) {
      return {
        bg: "bg-gray-50",
        border: "border-gray-200",
        iconBg: "bg-gray-400",
        iconText: "text-white",
        opacity: "opacity-60"
      };
    }

    const colorMap = {
      yellow: {
        bg: "bg-yellow-50",
        border: "border-yellow-200",
        iconBg: "bg-yellow-500",
        iconText: "text-white",
        opacity: ""
      },
      orange: {
        bg: "bg-orange-50",
        border: "border-orange-200",
        iconBg: "bg-foundation-orange",
        iconText: "text-white",
        opacity: ""
      },
      blue: {
        bg: "bg-blue-50",
        border: "border-blue-200",
        iconBg: "bg-blue-500",
        iconText: "text-white",
        opacity: ""
      }
    };

    return colorMap[color as keyof typeof colorMap] || colorMap.yellow;
  };

  if (isLoading) {
    return (
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold text-foundation-navy">Rewards & Achievements</CardTitle>
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="text-center p-4">
                <Skeleton className="w-12 h-12 rounded-full mx-auto mb-2" />
                <Skeleton className="h-4 w-16 mx-auto mb-1" />
                <Skeleton className="h-3 w-12 mx-auto" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-foundation-navy">Rewards & Achievements</CardTitle>
          <div className="bg-yellow-100 p-2 rounded-full">
            <Award className="text-yellow-500 h-5 w-5" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {allBadges.map((badge, index) => {
            const colors = getColorClasses(badge.color, badge.earned);
            const IconComponent = badge.icon;
            
            return (
              <div 
                key={index}
                className={`text-center p-4 bg-gradient-to-b from-${badge.color}-50 to-${badge.color}-100 rounded-lg ${colors.border} ${colors.opacity}`}
              >
                <div className={`w-12 h-12 ${colors.iconBg} rounded-full flex items-center justify-center mx-auto mb-2`}>
                  <IconComponent className={`${colors.iconText} h-6 w-6`} />
                </div>
                <p className="text-xs font-medium text-gray-700">{badge.name}</p>
                <p className="text-xs text-gray-500">{badge.earned ? "Earned" : "Locked"}</p>
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 p-4 bg-foundation-orange bg-opacity-10 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="bg-foundation-orange p-2 rounded-full">
              <Gift className="text-white h-5 w-5" />
            </div>
            <div>
              <p className="font-medium text-foundation-navy">Next Reward: Champion Badge</p>
              <p className="text-sm text-gray-600">Raise $500 more to unlock exclusive perks</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
