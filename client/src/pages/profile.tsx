import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Edit, Key, Download, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Profile() {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  
  const [firstName, setFirstName] = useState(currentUser?.firstName || "");
  const [lastName, setLastName] = useState(currentUser?.lastName || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [phone, setPhone] = useState("+1 (555) 123-4567");
  const [bio, setBio] = useState("Passionate about women's empowerment and creating positive change in my community. I believe every woman deserves the opportunity to reach her full potential.");
  
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsUpdates, setSmsUpdates] = useState(false);
  const [achievementAlerts, setAchievementAlerts] = useState(true);

  if (!currentUser) return null;

  const handleSaveChanges = () => {
    toast({
      title: "Profile updated",
      description: "Your changes have been saved successfully.",
    });
  };

  const joinDate = new Date(currentUser.joinedAt);

  return (
    <div className="min-h-screen bg-foundation-light">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
              <div className="w-24 h-24 bg-foundation-orange rounded-full flex items-center justify-center text-white font-bold text-2xl">
                {currentUser.firstName[0]}{currentUser.lastName[0]}
              </div>
              <div className="text-center md:text-left flex-1">
                <h1 className="text-3xl font-bold text-foundation-navy mb-2">
                  {currentUser.firstName} {currentUser.lastName}
                </h1>
                <p className="text-gray-600 mb-4">Intern at She Can Foundation</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
                  <div className="bg-foundation-orange bg-opacity-10 px-3 py-1 rounded-full">
                    <span className="text-foundation-orange font-medium">
                      Joined: {joinDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </span>
                  </div>
                  <div className="bg-green-100 px-3 py-1 rounded-full">
                    <span className="text-green-600 font-medium">Active Status</span>
                  </div>
                </div>
              </div>
              <Button className="bg-foundation-orange text-white hover:bg-orange-600">
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Profile Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Personal Information */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-foundation-navy">Personal Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="focus:ring-foundation-orange focus:border-foundation-orange"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="focus:ring-foundation-orange focus:border-foundation-orange"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="focus:ring-foundation-orange focus:border-foundation-orange"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="focus:ring-foundation-orange focus:border-foundation-orange"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      rows={4}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Tell us about yourself and your passion for empowering women..."
                      className="focus:ring-foundation-orange focus:border-foundation-orange"
                    />
                  </div>
                  
                  <Button 
                    type="button" 
                    onClick={handleSaveChanges}
                    className="bg-foundation-orange text-white hover:bg-orange-600"
                  >
                    Save Changes
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Account Settings */}
          <div className="space-y-6">
            {/* Account Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-foundation-navy">Account Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Member Since</span>
                    <span className="font-medium text-foundation-navy">
                      {joinDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Raised</span>
                    <span className="font-medium text-foundation-navy">
                      ${currentUser.totalRaised.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Referrals</span>
                    <span className="font-medium text-foundation-navy">{currentUser.referrals}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Current Rank</span>
                    <span className="font-medium text-foundation-navy">#{currentUser.rank}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-foundation-navy">Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Email Notifications</span>
                    <Switch 
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                      className="data-[state=checked]:bg-foundation-orange"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">SMS Updates</span>
                    <Switch 
                      checked={smsUpdates}
                      onCheckedChange={setSmsUpdates}
                      className="data-[state=checked]:bg-foundation-orange"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Achievement Alerts</span>
                    <Switch 
                      checked={achievementAlerts}
                      onCheckedChange={setAchievementAlerts}
                      className="data-[state=checked]:bg-foundation-orange"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-foundation-navy">Account Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="ghost" className="w-full justify-start">
                    <Key className="mr-3 h-4 w-4 text-foundation-orange" />
                    <span className="text-gray-700">Change Password</span>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Download className="mr-3 h-4 w-4 text-foundation-orange" />
                    <span className="text-gray-700">Download Data</span>
                  </Button>
                  <Separator />
                  <Button variant="ghost" className="w-full justify-start hover:bg-red-50">
                    <Trash className="mr-3 h-4 w-4 text-red-500" />
                    <span className="text-red-700">Delete Account</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
