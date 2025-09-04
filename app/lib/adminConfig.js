export const ADMIN_EMAILS = process.env.ADMIN_EMAILS?.split(",") || [];
export const ADMIN_PASSWORDS = process.env.ADMIN_PASSWORDS?.split(",") || [];

export function isAdmin(email, password) {
  const index = ADMIN_EMAILS.indexOf(email);
  return index !== -1 && ADMIN_PASSWORDS[index] === password;
}
