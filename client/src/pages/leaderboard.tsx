import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import LeaderboardTable from "@/components/leaderboard-table";
import { Card, CardContent } from "@/components/ui/card";
import { Crown } from "lucide-react";

export default function Leaderboard() {
  const { currentUser } = useAuth();

  const { data: interns, isLoading } = useQuery({
    queryKey: ["/api/interns"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-foundation-light flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-foundation-orange"></div>
          <p className="mt-4 text-lg text-gray-600">Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  const sortedInterns = interns?.sort((a: any, b: any) => a.rank - b.rank) || [];
  const topThree = sortedInterns.slice(0, 3);
  const totalRaised = sortedInterns.reduce((sum: number, intern: any) => sum + intern.totalRaised, 0);
  const totalDonations = sortedInterns.reduce((sum: number, intern: any) => sum + intern.donationsCount, 0);

  return (
    <div className="min-h-screen bg-foundation-light">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-foundation-navy to-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Intern Leaderboard</h1>
            <p className="text-xl text-gray-300 mb-8">Celebrating our top performers</p>
            <div className="flex justify-center items-center space-x-8">
              <div className="text-center">
                <p className="text-2xl font-bold text-foundation-orange">
                  ${totalRaised.toLocaleString()}
                </p>
                <p className="text-gray-300">Total Raised</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-foundation-orange">
                  {sortedInterns.length}
                </p>
                <p className="text-gray-300">Active Interns</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-foundation-orange">
                  {totalDonations.toLocaleString()}
                </p>
                <p className="text-gray-300">Total Donations</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top 3 Podium */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Second Place */}
          {topThree[1] && (
            <Card className="text-center order-1 md:order-1">
              <CardContent className="pt-6">
                <div className="relative mb-4">
                  <div className="w-20 h-20 bg-gray-400 rounded-full mx-auto flex items-center justify-center text-white font-bold text-2xl">
                    {topThree[1].firstName[0]}{topThree[1].lastName[0]}
                  </div>
                  <div className="absolute -top-2 -right-2 bg-gray-400 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                </div>
                <h3 className="text-lg font-bold text-foundation-navy mb-1">
                  {topThree[1].firstName} {topThree[1].lastName}
                </h3>
                <p className="text-foundation-orange font-semibold text-xl mb-2">
                  ${topThree[1].totalRaised.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">{topThree[1].referrals} referrals</p>
              </CardContent>
            </Card>
          )}

          {/* First Place */}
          {topThree[0] && (
            <Card className="text-center relative order-2 md:order-2 transform md:scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-white px-4 py-1 rounded-full text-sm font-bold flex items-center">
                <Crown className="mr-1 h-4 w-4" />
                Leader
              </div>
              <CardContent className="pt-6 mt-4">
                <div className="relative mb-4">
                  <div className="w-24 h-24 bg-yellow-500 rounded-full mx-auto flex items-center justify-center text-white font-bold text-2xl">
                    {topThree[0].firstName[0]}{topThree[0].lastName[0]}
                  </div>
                  <div className="absolute -top-2 -right-2 bg-yellow-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">
                    1
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foundation-navy mb-1">
                  {topThree[0].firstName} {topThree[0].lastName}
                </h3>
                <p className="text-foundation-orange font-semibold text-2xl mb-2">
                  ${topThree[0].totalRaised.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">{topThree[0].referrals} referrals</p>
              </CardContent>
            </Card>
          )}

          {/* Third Place */}
          {topThree[2] && (
            <Card className="text-center order-3 md:order-3">
              <CardContent className="pt-6">
                <div className="relative mb-4">
                  <div className="w-20 h-20 bg-orange-400 rounded-full mx-auto flex items-center justify-center text-white font-bold text-2xl">
                    {topThree[2].firstName[0]}{topThree[2].lastName[0]}
                  </div>
                  <div className="absolute -top-2 -right-2 bg-orange-400 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                </div>
                <h3 className="text-lg font-bold text-foundation-navy mb-1">
                  {topThree[2].firstName} {topThree[2].lastName}
                </h3>
                <p className="text-foundation-orange font-semibold text-xl mb-2">
                  ${topThree[2].totalRaised.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">{topThree[2].referrals} referrals</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Full Leaderboard Table */}
        <LeaderboardTable interns={sortedInterns} currentUser={currentUser} />
      </div>
    </div>
  );
}
