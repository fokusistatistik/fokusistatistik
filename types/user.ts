/**
 * User Role Types for FOKUS İstatistik
 *
 * Standart: Default role for all new users (free tier)
 * Müşteri: Paid customers with active subscriptions
 * Admin: Administrative users with full access
 */

export type UserRole = 'Standart' | 'Müşteri' | 'Admin';

export interface ExtendedUser {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: UserRole;
}

export interface UserSession {
  user: ExtendedUser;
  expires: string;
}

/**
 * Helper function to check if user has a specific role
 */
export function hasRole(user: ExtendedUser | undefined, role: UserRole): boolean {
  if (!user || !user.role) return false;
  return user.role === role;
}

/**
 * Helper function to check if user is at least a certain role level
 * Role hierarchy: Standart < Müşteri < Admin
 */
export function hasMinimumRole(user: ExtendedUser | undefined, minRole: UserRole): boolean {
  if (!user || !user.role) return false;

  const roleHierarchy: Record<UserRole, number> = {
    'Standart': 1,
    'Müşteri': 2,
    'Admin': 3,
  };

  return roleHierarchy[user.role] >= roleHierarchy[minRole];
}

/**
 * Get default role for new users
 */
export function getDefaultRole(): UserRole {
  return 'Standart';
}
