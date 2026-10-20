export interface AuthUser {
  id: string;
  roles?: string[];
  permissions?: string[];
  [key: string]: unknown;
}

export type CanFunction = (
  user: AuthUser | null,
  action: string,
  resource: string,
  resolver?: (user: AuthUser, action: string, resource: string) => boolean
) => boolean;

export type HasRoleFunction = (user: AuthUser | null, role: string) => boolean;

export type HasAnyRoleFunction = (user: AuthUser | null, roles: string[]) => boolean;
