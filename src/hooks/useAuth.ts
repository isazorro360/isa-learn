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
          const existingProfile = await getUserProfile(currentUser.id);
          if (existingProfile) {
            if (active) {
              setProfile(existingProfile);
              setRoles(existingProfile.roles);
            }
          } else {
            const displayName =
              (currentUser.user_metadata?.displayName as string | undefined) ||
              currentUser.email?.split('@')[0] ||
              '';
            await createOrUpdateUserProfile(currentUser.id, currentUser.email ?? '', displayName, ['student']);
            const newProfile = await getUserProfile(currentUser.id);
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
