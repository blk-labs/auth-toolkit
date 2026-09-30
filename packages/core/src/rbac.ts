import type {  CanFunction, HasRoleFunction, HasAnyRoleFunction } from "./types/index.js";

export const can: CanFunction = (user, action, resource, resolver) => {
  if (!user) return false;

  if (resolver) {
    return resolver(user, action, resource);
  }

  const permissions = user.permissions ?? [];
  const requiredPermission = `${action}:${resource}`;
  const wildcardPermission = `${action}:*`;

  return permissions.includes(requiredPermission) || permissions.includes(wildcardPermission);
};

export const hasRole: HasRoleFunction = (user, role) => {
  if (!user || !user.roles) return false;
  return user.roles.includes(role);
};

export const hasAnyRole: HasAnyRoleFunction = (user, roles) => {
  if (!user || !user.roles) return false;
  return roles.some((role) => user.roles!.includes(role));
};