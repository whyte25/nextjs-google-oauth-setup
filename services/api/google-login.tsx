import { GOOGLE_LOGIN } from "../endpoints";
import { instance } from "../instance";

export const googleLogin = (payload) => {
  return instance.post(GOOGLE_LOGIN, payload);
};
