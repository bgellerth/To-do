export class Exception {
  constructor(
    public statusCode: number,
    public statusMessage: string,
    public data: string
  ) {}
}

/* prettier-ignore */
export const errors = {
    unknown: new Exception(400, "Unknown", "An unknown error occurred. Please try again later."),
    unauthorized: new Exception(401, "Unauthorized", "You are not authorized to access this resource."),
    forbidden: new Exception(403, "Forbidden", "You do not have access to this resource."),
    emailInUse: new Exception(422, "EmailInUse", "A user with this email already exists. Please use another email or login with your account."),
    phoneInUse: new Exception(422, "PhoneInUse", "A user with this phone already exists. Please use another phone or login with your account."),
    incorrectEmailOrPassword: new Exception(422, "IncorrectEmailOrPassword","Incorrect email or password. Please try again."),
    emailIsRequired: new Exception(422, "EmailIsRequired","Your email is required."),
    passwordIsRequired: new Exception(422, "PasswordIsRequired","A password is required."),
    invalidPassword: new Exception(422, "InvalidPassword","Your password must contain at least 6 characters."),
    incorrectPassword: new Exception(422, "IncorrectPassword","The password you have entered is incorrect. Please ensure you have entered a correct password or try resetting it."),
  
    notFound: (resource: string) => new Exception(404, "NotFound", `The requested ${resource} was not found.`),
    notAvailable: (message: string) => new Exception(404, 'NotAvailalbe', message),
    invalidParameter: (param: string) => new Exception(422, "InvalidParameter", `Missing or invalid parameter '${param}'.`),
    isRequiredParameter: (param: string) => new Exception(422, 'RequiredParameter', `${param} is required.`),
  
    internalServerError: new Exception(500, 'InternalServerError', 'Something went wrong.'),
  };
