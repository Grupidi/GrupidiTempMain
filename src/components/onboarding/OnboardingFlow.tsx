import { CreateAccountPage } from './CreateAccountPage';
import { CreateProfilePage } from './CreateProfilePage';
import { AuthPage } from '../pages/AuthPage';
import { useOnboarding } from '../../hooks/useOnboarding';

interface OnboardingFlowProps {
  onComplete: () => void;
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const { 
    currentStep,
    handleAccountCreated,
    handleLoginSuccess,
    handleProfileCreated
  } = useOnboarding();

  switch (currentStep) {
    case 'create-account':
      return <CreateAccountPage onAccountCreated={handleAccountCreated} />;
    
    case 'login':
      return <AuthPage onLoginSuccess={handleLoginSuccess} />;
    
    case 'create-profile':
      return <CreateProfilePage onProfileCreated={(profileData) => {
        handleProfileCreated(profileData);
        onComplete();
      }} />;
    
    default:
      return null;
  }
}