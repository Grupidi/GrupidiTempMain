export class ProfileValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ProfileValidationError';
  }
}

export function validateUsername(username: string | undefined): string {
  if (!username) {
    throw new ProfileValidationError('Username is required');
  }
  
  if (typeof username !== 'string') {
    throw new ProfileValidationError('Username must be a string');
  }

  if (username.length < 3) {
    throw new ProfileValidationError('Username must be at least 3 characters long');
  }

  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    throw new ProfileValidationError('Username can only contain letters, numbers, and underscores');
  }

  return username;
}

export function validateUniqueUsername(
  username: string,
  existingProfiles: { [key: string]: any }
): boolean {
  return !existingProfiles[username];
} 