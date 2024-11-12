namespace Api {
  namespace Base {
    type DefaultResponse = {
      code: number;
      message: string;
    };
  }

  namespace Public {
    type GetCaptchaResponse = {
      code: number;
      captcha: string;
    };

    type GetCodeCaptchaResponse = Api.Base.DefaultResponse;
  }
}
