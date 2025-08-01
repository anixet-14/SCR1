import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { apiRequest } from "@/lib/queryClient";
import logoPath from "@assets/shecan-logo_1754017822834.png";

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { setCurrentUser } = useAuth();

  const generateReferralCode = (firstName: string, lastName: string) => {
    return `${firstName.toUpperCase()}${lastName.toUpperCase()}2025`.replace(/\s/g, '');
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please ensure both password fields are identical.",
        variant: "destructive",
      });
      return;
    }

    if (!agreeToTerms) {
      toast({
        title: "Terms of Service",
        description: "Please agree to the Terms of Service to continue.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const referralCode = generateReferralCode(firstName, lastName);
      
      const response = await apiRequest("POST", "/api/register", {
        firstName,
        lastName,
        email,
        referralCode,
        totalRaised: 0,
        referrals: 0,
        donationsCount: 0,
        rank: 0,
        goalPercentage: 0,
        badge: "Starter",
      });
      
      const user = await response.json();
      setCurrentUser(user);
      
      toast({
        title: "Welcome to She Can Foundation!",
        description: "Your account has been created successfully.",
      });
    } catch (error) {
      toast({
        title: "Signup failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-foundation-navy to-gray-800 flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <img 
              src={logoPath} 
              alt="She Can Foundation Logo" 
              className="h-16 w-16 rounded-full"
            />
          </div>
          <CardTitle className="text-3xl font-bold text-foundation-navy">Join Our Mission</CardTitle>
          <CardDescription>Start making a difference today</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="Sarah"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="focus:ring-foundation-orange focus:border-foundation-orange"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Johnson"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="focus:ring-foundation-orange focus:border-foundation-orange"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="sarah.johnson@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="focus:ring-foundation-orange focus:border-foundation-orange"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="focus:ring-foundation-orange focus:border-foundation-orange"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="focus:ring-foundation-orange focus:border-foundation-orange"
              />
            </div>
            
            <div className="flex items-start space-x-2">
              <Checkbox 
                id="terms" 
                checked={agreeToTerms}
                onCheckedChange={(checked) => setAgreeToTerms(checked === true)}
                className="border-foundation-orange data-[state=checked]:bg-foundation-orange mt-1"
              />
              <Label htmlFor="terms" className="text-sm leading-5 cursor-pointer">
                I agree to the{" "}
                <button 
                  type="button"
                  className="text-foundation-orange hover:text-orange-600 underline"
                  onClick={(e) => e.preventDefault()}
                >
                  Terms of Service
                </button>{" "}
                and{" "}
                <button 
                  type="button"
                  className="text-foundation-orange hover:text-orange-600 underline"
                  onClick={(e) => e.preventDefault()}
                >
                  Privacy Policy
                </button>
              </Label>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-foundation-orange text-white hover:bg-orange-600 transition-colors duration-200 font-semibold text-lg py-3"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
            
            <div className="text-center text-sm">
              <span className="text-gray-600">Already have an account? </span>
              <Link href="/login" className="text-foundation-orange hover:text-orange-600 font-medium">
                Sign in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
