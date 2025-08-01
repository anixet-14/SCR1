import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import logoPath from "@assets/shecan-logo_1754017822834.png";

export default function Navbar() {
  const [location] = useLocation();
  const { currentUser, setCurrentUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const logout = () => {
    setCurrentUser(null);
    setIsOpen(false);
  };

  const navItems = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/leaderboard", label: "Leaderboard" },
    { path: "/profile", label: "Profile" },
  ];

  return (
    <nav className="bg-foundation-navy shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <img 
              src={logoPath} 
              alt="She Can Foundation Logo" 
              className="h-10 w-10 rounded-full"
            />
            <span className="text-white font-bold text-xl">She Can Foundation</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <button 
                  className={`text-white hover:text-foundation-orange transition-colors duration-200 font-medium ${
                    location === item.path ? "text-foundation-orange" : ""
                  }`}
                >
                  {item.label}
                </button>
              </Link>
            ))}
            <Button 
              onClick={logout}
              className="bg-foundation-orange text-white hover:bg-orange-600 transition-colors duration-200 font-medium"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:text-foundation-orange">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-foundation-navy border-l border-gray-700">
                <div className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                    <Link key={item.path} href={item.path}>
                      <button 
                        onClick={() => setIsOpen(false)}
                        className={`block text-white hover:text-foundation-orange transition-colors duration-200 font-medium py-2 ${
                          location === item.path ? "text-foundation-orange" : ""
                        }`}
                      >
                        {item.label}
                      </button>
                    </Link>
                  ))}
                  <Button 
                    onClick={logout}
                    className="bg-foundation-orange text-white hover:bg-orange-600 transition-colors duration-200 font-medium mt-4"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
