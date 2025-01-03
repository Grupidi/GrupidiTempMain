import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { ArrowLeft, Map, Users, Bell, User } from "lucide-react";
import { tiers, getCurrentTier } from "../ui/social-credit/tiers";

interface SocialCreditScorePageProps {
  onNavigate: (page: string) => void;
  score: number;
}

export default function SocialCreditScorePage({ onNavigate, score }: SocialCreditScorePageProps) {
  const currentTier = getCurrentTier(score);
  const overallProgress = (score / tiers[tiers.length - 1].min) * 100;

  return (
    <div className={`flex flex-col min-h-screen bg-gradient-to-br from-${currentTier.bgColor.replace('bg-', '')}-50 to-${currentTier.bgColor.replace('bg-', '')}-100`}>
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b px-4 py-4 z-50">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
            onClick={() => onNavigate('profile')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <span className="text-lg font-semibold">Popularity Score</span>
          <div className="w-8" />
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pt-20 pb-24 px-4">
        <Card className="w-full max-w-2xl mx-auto overflow-hidden bg-white shadow-lg mb-6">
          <div className={`h-2 ${currentTier.bgColor}`} />
          <CardHeader className="relative">
            <div className={`absolute inset-0 ${currentTier.bgColor} opacity-10`} />
            <CardTitle className="relative z-10 text-3xl text-gray-900">Popularity Score</CardTitle>
            <CardDescription className="relative z-10 text-gray-600">Your current standing in the social hierarchy</CardDescription>
          </CardHeader>
          <CardContent className="relative">
            <div className={`absolute inset-0 ${currentTier.bgColor} opacity-5`} />
            <div className="relative z-10">
              <div className="text-center mb-6">
                <h2 className={`text-6xl font-bold mb-2 ${currentTier.textColor}`}>
                  {score.toLocaleString()}
                </h2>
                <p className={`text-3xl font-semibold ${currentTier.textColor}`}>
                  {currentTier.name} Tier
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-900">Current Tier Progress</h3>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                  <div
                    className={`h-2.5 rounded-full ${currentTier.bgColor}`}
                    style={{ width: `${((score - currentTier.min) / (currentTier.max - currentTier.min)) * 100}%` }}
                  />
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-900">Overall Progress</h3>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className={`h-2.5 rounded-full ${currentTier.bgColor}`}
                    style={{ width: `${overallProgress}%` }}
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">All Tiers</h3>
                <ul className="space-y-2">
                  {tiers.map((tier, index) => (
                    <li key={index} className="flex justify-between items-center p-2 rounded-md transition-colors duration-200 hover:bg-gray-50">
                      <span className={`font-medium ${tier.name === currentTier.name ? tier.textColor : 'text-gray-900'}`}>
                        {tier.name}
                      </span>
                      <span className={`text-sm ${tier.name === currentTier.name ? tier.textColor : 'text-gray-600'}`}>
                        {tier.name === "Popularist" ? "7,000+" : `${tier.min.toLocaleString()} - ${tier.max.toLocaleString()}`}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-pink-500 text-white z-50">
        <div className="flex justify-around items-center py-2">
          <Button
            variant="ghost"
            className="flex flex-col items-center text-white hover:bg-pink-600"
            onClick={() => onNavigate('activity')}
          >
            <Map className="h-6 w-6" />
            <span className="text-xs">Activity</span>
          </Button>
          <Button
            variant="ghost"
            className="flex flex-col items-center text-white hover:bg-pink-600"
            onClick={() => onNavigate('groups')}
          >
            <Users className="h-6 w-6" />
            <span className="text-xs">Groups</span>
          </Button>
          <Button
            variant="ghost"
            className="flex flex-col items-center text-white hover:bg-pink-600"
            onClick={() => onNavigate('notifications')}
          >
            <Bell className="h-6 w-6" />
            <span className="text-xs">Notifications</span>
          </Button>
          <Button
            variant="ghost"
            className="flex flex-col items-center text-white hover:bg-pink-600"
            onClick={() => onNavigate('profile')}
          >
            <User className="h-6 w-6" />
            <span className="text-xs">Profile</span>
          </Button>
        </div>
      </nav>
    </div>
  );
}