export const isAuthorisedEmail = (email: string): boolean => {
  const emailRegex = import.meta.env.VITE_AUTHORISED_EMAIL_REGEX;
  return !!emailRegex && !!email && new RegExp(emailRegex).test(email);
};
