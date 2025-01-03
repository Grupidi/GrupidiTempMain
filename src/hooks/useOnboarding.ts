import { useState } from 'react';

type OnboardingStep = 'create-account' | 'create-profile' | 'login' | 'complete';

export function useOnboarding() {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('create-account');
  const [userData, setUserData] = useState<any>(null);
  const [profileData, setProfileData] = useState<any>(null);

  const handleAccountCreated = (data: any) => {
    setUserData(data);
    setCurrentStep('login');
  };

  const handleLoginSuccess = () => {
    setCurrentStep('create-profile');
  };

  const handleProfileCreated = (data: any) => {
    setProfileData(data);
    setCurrentStep('complete');
  };

  return {
    currentStep,
    userData,
    profileData,
    handleAccountCreated,
    handleLoginSuccess,
    handleProfileCreated
  };
}