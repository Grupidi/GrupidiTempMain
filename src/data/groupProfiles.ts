import { GroupProfile } from '../types/profiles';
import { currentGroupProfiles } from './currentGroupProfiles';
import { discoverableGroupProfiles } from './discoverableGroupProfiles';

// Export current groups for the Groups page
export const initialGroupProfiles = currentGroupProfiles;

// Export discoverable groups for the Find Groups page
export const findGroupProfiles = discoverableGroupProfiles;