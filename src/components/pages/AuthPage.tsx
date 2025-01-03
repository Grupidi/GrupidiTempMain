import { useState } from 'react';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Alert, AlertDescription } from "../ui/alert";
import { CheckCircle2 } from "lucide-react";

interface AuthPageProps {
  onLoginSuccess: () => void;
}

export default function AuthPage({ onLoginSuccess }: AuthPageProps) {
  const [currentPage, setCurrentPage] = useState('login');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    emailOrUsername: ''
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent, page: string) => {
    e.preventDefault();
    
    switch (page) {
      case 'login':
        setSuccessMessage("Login successful!");
        setTimeout(onLoginSuccess, 1000);
        break;
      case 'signup':
        setSuccessMessage("Sign up successful! Please log in.");
        setTimeout(() => setCurrentPage('login'), 1500);
        break;
      case 'forgotEmail':
        setSuccessMessage("An SMS with your email recovery information has been sent to your phone.");
        break;
      case 'forgotUsername':
        setSuccessMessage("An SMS with your username recovery information has been sent to your phone.");
        break;
      case 'forgotPassword':
        setSuccessMessage("An email with password reset instructions has been sent to your email address.");
        break;
    }
  };

  const renderSuccessMessage = () => {
    if (!successMessage) return null;
    return (
      <Alert className="mt-4 bg-green-50 border-green-200">
        <CheckCircle2 className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800 ml-2">
          {successMessage}
        </AlertDescription>
      </Alert>
    );
  };

  const renderLoginPage = () => (
    <>
      <h1 className="text-3xl font-bold text-center">Login to Grupidi</h1>
      <form onSubmit={(e) => handleSubmit(e, 'login')} className="space-y-4">
        <div>
          <Label htmlFor="emailOrUsername">Email or Username</Label>
          <Input 
            id="emailOrUsername" 
            name="emailOrUsername" 
            type="text" 
            placeholder="Enter your email or username"
            value={formData.emailOrUsername}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input 
            id="password" 
            name="password" 
            type="password" 
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <Button type="submit" className="w-full bg-pink-500 hover:bg-pink-600">Sign In</Button>
      </form>
      {renderSuccessMessage()}
      <div className="mt-2 flex flex-col items-center gap-0">
        <Button variant="ghost" onClick={() => setCurrentPage('forgotEmail')} className="text-blue-500 hover:underline h-6 p-0">Forgot Email?</Button>
        <Button variant="ghost" onClick={() => setCurrentPage('forgotUsername')} className="text-blue-500 hover:underline h-6 p-0">Forgot Username?</Button>
        <Button variant="ghost" onClick={() => setCurrentPage('forgotPassword')} className="text-blue-500 hover:underline h-6 p-0">Forgot Password?</Button>
      </div>
      <div className="text-center mt-4">
        <span className="text-sm">Don't have an account? </span>
        <Button variant="ghost" onClick={() => setCurrentPage('signup')} className="text-pink-500 hover:underline p-0 h-auto text-sm">Sign up</Button>
      </div>
    </>
  );

  const renderSignUpPage = () => (
    <>
      <h1 className="text-3xl font-bold text-center">Join Grupidi</h1>
      <form onSubmit={(e) => handleSubmit(e, 'signup')} className="space-y-4">
        <div>
          <Label htmlFor="username">Username</Label>
          <Input 
            id="username" 
            name="username" 
            type="text" 
            placeholder="Choose a unique username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            name="email" 
            type="email" 
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone (optional)</Label>
          <Input 
            id="phone" 
            name="phone" 
            type="tel" 
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input 
            id="password" 
            name="password" 
            type="password" 
            placeholder="Create a strong password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input 
            id="confirmPassword" 
            name="confirmPassword" 
            type="password" 
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <Button type="submit" className="w-full bg-pink-500 hover:bg-pink-600">Create Account</Button>
      </form>
      {renderSuccessMessage()}
      <p className="text-center mt-4">
        Already a user?{' '}
        <Button variant="link" onClick={() => setCurrentPage('login')} className="text-pink-500 hover:underline p-0">
          Sign in
        </Button>
      </p>
    </>
  );

  const renderForgotEmailPage = () => (
    <>
      <h1 className="text-3xl font-bold text-center">Recover Email</h1>
      <p className="text-center text-gray-600 mt-2">Enter your phone number to recover your email.</p>
      <form onSubmit={(e) => handleSubmit(e, 'forgotEmail')} className="space-y-4 mt-4">
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input 
            id="phone" 
            name="phone" 
            type="tel" 
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <Button type="submit" className="w-full bg-pink-500 hover:bg-pink-600">Recover Email</Button>
      </form>
      {renderSuccessMessage()}
      <Button variant="link" onClick={() => {
        setCurrentPage('login');
        setSuccessMessage('');
      }} className="block text-center text-blue-500 hover:underline mt-4">
        Back to Sign In
      </Button>
    </>
  );

  const renderForgotUsernamePage = () => (
    <>
      <h1 className="text-3xl font-bold text-center">Recover Username</h1>
      <p className="text-center text-gray-600 mt-2">Enter your phone number to recover your username.</p>
      <form onSubmit={(e) => handleSubmit(e, 'forgotUsername')} className="space-y-4 mt-4">
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input 
            id="phone" 
            name="phone" 
            type="tel" 
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <Button type="submit" className="w-full bg-pink-500 hover:bg-pink-600">Recover Username</Button>
      </form>
      {renderSuccessMessage()}
      <Button variant="link" onClick={() => {
        setCurrentPage('login');
        setSuccessMessage('');
      }} className="block text-center text-blue-500 hover:underline mt-4">
        Back to Sign In
      </Button>
    </>
  );

  const renderForgotPasswordPage = () => (
    <>
      <h1 className="text-3xl font-bold text-center">Reset Password</h1>
      <p className="text-center text-gray-600 mt-2">Enter your email to reset your password.</p>
      <form onSubmit={(e) => handleSubmit(e, 'forgotPassword')} className="space-y-4 mt-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            name="email" 
            type="email" 
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <Button type="submit" className="w-full bg-pink-500 hover:bg-pink-600">Reset Password</Button>
      </form>
      {renderSuccessMessage()}
      <Button variant="link" onClick={() => {
        setCurrentPage('login');
        setSuccessMessage('');
      }} className="block text-center text-blue-500 hover:underline mt-4">
        Back to Sign In
      </Button>
    </>
  );

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'login':
        return renderLoginPage();
      case 'signup':
        return renderSignUpPage();
      case 'forgotEmail':
        return renderForgotEmailPage();
      case 'forgotUsername':
        return renderForgotUsernamePage();
      case 'forgotPassword':
        return renderForgotPasswordPage();
      default:
        return renderLoginPage();
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
          {renderCurrentPage()}
        </div>
      </div>
    </div>
  );
}