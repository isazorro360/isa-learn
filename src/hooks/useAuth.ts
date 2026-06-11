import { useEffect, useState } from 'react';
import { authStateListener, FirebaseUser, isAdminUser } from '../services/auth';
import { createOrUpdateUserProfile, getUserProfile } from '../services/users';
import type { UserProfileDoc } from '../types';

export default function useAuth() {
  const [user, setUser] = useState<FirebaseUser>(null);
  const [profile, setProfile] = useState<UserProfileDoc | null>(null);
  const [roles, setRoles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for test admin mode first
    const testAdminMode = localStorage.getItem('testAdminMode') === 'true';
    if (testAdminMode) {
      // Mock admin user for testing
      const mockUser = {
        uid: 'test-admin-id',
        email: 'admin@isaitech.com',
        displayName: 'Test Admin',
        isAnonymous: false,
        metadata: {},
        providerData: [],
        refreshToken: '',
        emailVerified: true,
        phoneNumber: null,
        isSignInWithEmailLink: false,
        getIdToken: async () => 'test-token',
        getIdTokenResult: async () => ({ token: 'test-token', claims: {}, signInProvider: null, signInTime: new Date().toISOString(), issuedAtTime: new Date().toISOString(), expirationTime: new Date().toISOString() }),
        reload: async () => {},
        toJSON: () => ({}),
        delete: async () => {},
        getDisplayName: () => 'Test Admin',
        getEmail: () => 'admin@isaitech.com',
        getPhoneNumber: () => null,
        getPhotoURL: () => null,
        getProviderId: () => 'firebase',
        getUid: () => 'test-admin-id',
      } as any as FirebaseUser;
      
      setUser(mockUser);
      setProfile({
        id: 'test-admin-id',
        email: 'admin@isaitech.com',
        displayName: 'Test Admin',
        roles: ['admin'],
        createdAt: new Date(),
      });
      setRoles(['admin']);
      setLoading(false);
      return;
    }

    let active = true;

    const unsubscribe = authStateListener((currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        if (active) {
          setProfile(null);
          setRoles([]);
          setLoading(false);
        }
        return;
      }

      if (active) {
        setLoading(true);
      }

      (async () => {
        try {
          const existingProfile = await getUserProfile(currentUser.uid);
          if (existingProfile) {
            if (active) {
              setProfile(existingProfile);
              setRoles(existingProfile.roles);
            }
          } else {
            const displayName = currentUser.displayName || currentUser.email?.split('@')[0] || '';
            await createOrUpdateUserProfile(currentUser.uid, currentUser.email ?? '', displayName, ['student']);
            const newProfile = await getUserProfile(currentUser.uid);
            if (active) {
              setProfile(newProfile);
              setRoles(newProfile?.roles ?? ['student']);
            }
          }
        } catch (error) {
          console.error('Failed to load user profile', error);
          if (active) {
            setProfile(null);
            setRoles([]);
          }
        } finally {
          if (active) {
            setLoading(false);
          }
        }
      })();
    });

    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  return {
    user,
    profile,
    roles,
    loading,
    isAdmin: roles.includes('admin') || isAdminUser(user),
  };
}
