import { backEndUrl } from "../Utils/Constants";

const baseRouteName = "/auth"

export const authRoutes = {
  login: `${backEndUrl}${baseRouteName}/login`,
  nativeRegistration: `${backEndUrl}${baseRouteName}/register`,
  nativeRegistrationCodeVerification: `${backEndUrl}${baseRouteName}/verification-code/registration`,
  logout: `${backEndUrl}${baseRouteName}/logout`,
  changePassword: `${backEndUrl}${baseRouteName}/password`,
  createVerificationCodeForSecurity: `${backEndUrl}${baseRouteName}/verification-code`,
  verifyCodeForSecurity: `${backEndUrl}${baseRouteName}/verification-code/security`,
  resendVerificationCode: `${backEndUrl}${baseRouteName}/resend-verification-code`,
};
