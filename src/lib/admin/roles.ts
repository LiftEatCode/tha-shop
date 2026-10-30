import { defaultAc, userAc } from "better-auth/plugins/admin/access";

// User creation and listing only; do not expose impersonation or deletion.
export const adminRoles = {
  admin: defaultAc.newRole({ user: ["create", "list", "get", "set-role"] }),
  editor: userAc,
};
