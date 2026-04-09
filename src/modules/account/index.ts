// I. Account Management module (profile, change password)
export { EditProfile } from './components/EditProfile';
export { EditParentProfile } from './components/EditParentProfile';
export { ChangePassword } from './components/ChangePassword';
export { useProfile } from './hooks/useProfile';
export { profileService } from './services/profileService';
export type { ProfileData, Profile, UserInfo, Certificate } from './types';
