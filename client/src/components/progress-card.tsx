import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target } from "lucide-react";

interface ProgressCardProps {
  goalPercentage: number;
  totalRaised: number;
  goal: number;
}

export default function ProgressCard({ goalPercentage, totalRaised, goal }: ProgressCardProps) {
  const remaining = goal - totalRaised;
  const weeklyAmount = 425; // Mock data
  const dailyAverage = 92; // Mock data
  const daysRemaining = 12; // Mock data

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-foundation-navy">Monthly Goal</CardTitle>
          <div className="bg-green-100 p-2 rounded-full">
            <Target className="text-green-500 h-5 w-5" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-6">
          <div className="relative w-32 h-32 mx-auto mb-4">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
              <path 
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                fill="none" 
                stroke="#E5E7EB" 
                strokeWidth="2"
              />
              <path 
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                fill="none" 
                stroke="var(--foundation-orange)" 
                strokeWidth="2" 
                strokeDasharray={`${goalPercentage}, 100`}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-foundation-navy">{goalPercentage}%</span>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-2">
            ${totalRaised.toLocaleString()} of ${goal.toLocaleString()} goal
          </p>
          <p className="text-xs text-gray-500">
            ${remaining > 0 ? remaining.toLocaleString() : 0} remaining
          </p>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">This week</span>
            <span className="font-medium text-foundation-navy">${weeklyAmount}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Average/day</span>
            <span className="font-medium text-foundation-navy">${dailyAverage}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Days remaining</span>
            <span className="font-medium text-foundation-navy">{daysRemaining}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
