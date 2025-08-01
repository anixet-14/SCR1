import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share, Copy, Link, Facebook, Twitter, Instagram } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ReferralCardProps {
  referralCode: string;
}

export default function ReferralCard({ referralCode }: ReferralCardProps) {
  const { toast } = useToast();

  const copyReferralCode = async () => {
    try {
      await navigator.clipboard.writeText(referralCode);
      toast({
        title: "Copied!",
        description: "Referral code copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const copyReferralLink = async () => {
    const link = `https://shecanfoundation.org/donate?ref=${referralCode}`;
    try {
      await navigator.clipboard.writeText(link);
      toast({
        title: "Copied!",
        description: "Referral link copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-foundation-navy">Your Referral Code</CardTitle>
          <div className="bg-foundation-orange bg-opacity-10 p-2 rounded-full">
            <Share className="text-foundation-orange h-5 w-5" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="bg-gradient-to-r from-foundation-orange to-orange-500 rounded-lg p-6 text-white mb-6">
          <div className="text-center">
            <p className="text-sm opacity-90 mb-2">Share this code to earn rewards</p>
            <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-4">
              <span className="text-2xl font-bold tracking-wider">{referralCode}</span>
            </div>
            <Button 
              onClick={copyReferralCode}
              className="bg-white text-foundation-orange hover:bg-gray-100 transition-colors duration-200 font-medium"
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy Code
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Link className="text-foundation-orange h-5 w-5" />
              <span className="font-medium">Referral Link</span>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={copyReferralLink}
              className="text-foundation-orange hover:text-orange-600 font-medium"
            >
              Copy
            </Button>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Share className="text-foundation-orange h-5 w-5" />
              <span className="font-medium">Share on Social</span>
            </div>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" className="text-blue-600 hover:text-blue-700">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-blue-400 hover:text-blue-500">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-pink-600 hover:text-pink-700">
                <Instagram className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
