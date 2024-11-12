import { get } from "./base/requests";

export async function getCaptcha() {
  return await get<Api.Public.GetCaptchaResponse>("/public/getCaptcha");
}

interface CodeCaptchaParams {
  address: string;
  uname?: string;
}
export async function getCodeCaptcha(params: CodeCaptchaParams) {
  return await get<Api.Public.GetCodeCaptchaResponse>(
    "/public/getCodeCaptcha",
    "json",
    params,
  );
}
