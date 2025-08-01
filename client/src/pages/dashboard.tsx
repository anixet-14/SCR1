import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import StatsCard from "@/components/stats-card";
import ReferralCard from "@/components/referral-card";
import ProgressCard from "@/components/progress-card";
import RewardsSection from "@/components/rewards-section";
import ActivityFeed from "@/components/activity-feed";
import { DollarSign, Users, Heart, Trophy } from "lucide-react";

export default function Dashboard() {
  const { currentUser } = useAuth();

  const { data: activities, isLoading: activitiesLoading } = useQuery({
    queryKey: ["/api/interns", currentUser?.id, "activities"],
  });

  const { data: achievements, isLoading: achievementsLoading } = useQuery({
    queryKey: ["/api/interns", currentUser?.id, "achievements"],
  });

  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-foundation-light">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-foundation-navy to-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Welcome back, {currentUser.firstName}!
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              You're making a real difference in women's lives
            </p>
            <div className="flex justify-center items-center space-x-2">
              <span className="text-foundation-orange text-2xl font-bold">
                ${currentUser.totalRaised.toLocaleString()}
              </span>
              <span className="text-gray-300">raised this month</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Raised"
            value={`$${currentUser.totalRaised.toLocaleString()}`}
            change="+12% from last month"
            icon={DollarSign}
            iconColor="bg-foundation-orange"
            borderColor="border-foundation-orange"
          />
          <StatsCard
            title="Referrals"
            value={currentUser.referrals.toString()}
            change="+3 this week"
            icon={Users}
            iconColor="bg-green-500"
            borderColor="border-green-500"
          />
          <StatsCard
            title="Donations"
            value={currentUser.donationsCount.toString()}
            change="+8 this week"
            icon={Heart}
            iconColor="bg-blue-500"
            borderColor="border-blue-500"
          />
          <StatsCard
            title="Rank"
            value={`#${currentUser.rank}`}
            change="Up 2 positions"
            icon={Trophy}
            iconColor="bg-purple-500"
            borderColor="border-purple-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Referral Code Card */}
          <div className="lg:col-span-2">
            <ReferralCard referralCode={currentUser.referralCode} />
          </div>

          {/* Progress Card */}
          <ProgressCard 
            goalPercentage={currentUser.goalPercentage}
            totalRaised={currentUser.totalRaised}
            goal={4000}
          />
        </div>

        {/* Rewards Section */}
        <RewardsSection 
          achievements={achievements}
          isLoading={achievementsLoading}
        />

        {/* Recent Activity */}
        <ActivityFeed 
          activities={activities}
          isLoading={activitiesLoading}
        />
      </div>
    </div>
  );
}
