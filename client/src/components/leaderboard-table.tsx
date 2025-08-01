import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type Intern } from "@shared/schema";

interface LeaderboardTableProps {
  interns: Intern[];
  currentUser: Intern | null;
}

export default function LeaderboardTable({ interns, currentUser }: LeaderboardTableProps) {
  const getRankColor = (rank: number) => {
    if (rank === 1) return "bg-yellow-500 text-white";
    if (rank === 2) return "bg-gray-400 text-white";
    if (rank === 3) return "bg-orange-400 text-white";
    return "bg-gray-300 text-gray-700";
  };

  const getBadgeColor = (badge: string) => {
    switch (badge.toLowerCase()) {
      case "champion":
        return "bg-yellow-100 text-yellow-800";
      case "rising star":
        return "bg-blue-100 text-blue-800";
      case "team player":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-foundation-navy">Full Rankings</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Intern
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount Raised
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Referrals
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Donations
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Badge
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {interns.map((intern) => {
                const isCurrentUser = currentUser?.id === intern.id;
                
                return (
                  <tr 
                    key={intern.id} 
                    className={isCurrentUser ? "bg-foundation-orange bg-opacity-10" : ""}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${getRankColor(intern.rank)}`}>
                          {intern.rank}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-full mr-3 flex items-center justify-center text-white font-bold ${isCurrentUser ? 'bg-foundation-orange border-2 border-foundation-orange' : 'bg-gray-400'}`}>
                          {intern.firstName[0]}{intern.lastName[0]}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {intern.firstName} {intern.lastName}
                            {isCurrentUser && (
                              <span className="text-foundation-orange font-semibold ml-2">(You)</span>
                            )}
                          </div>
                          <div className="text-sm text-gray-500">{intern.referralCode.toLowerCase()}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-foundation-orange">
                        ${intern.totalRaised.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{intern.referrals}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{intern.donationsCount}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge 
                        variant="secondary" 
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${getBadgeColor(intern.badge)}`}
                      >
                        {intern.badge}
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
