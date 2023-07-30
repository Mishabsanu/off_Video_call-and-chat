

/**
 * This class provides common utility functions
 */
export default class GetUtils {
  private defaultErrorMessage: string = "Oops something went wrong";

  /**
   * This methord is used to create error objects wich http status codes and status messages
   * @param code Http status code for error
   * @param error Error message
   * @param optionalData Additional data for more actions
   * @returns Objects with error details
   */
  createError(code: number = 500, error: string, optionalData?: object | null) {
    return {
      error: error ? error : "Oops thats an error",
      code: Number(code),
      ...optionalData,
    };
  }

  /**
   * To handle error in .Catch of a promise in simple way customizable error message and code
   * @param code https status code
   * @param errorMessage Error Message
   * @returns a fuction wich throws an expection with createError object with error message and code
   */
  throwCustomError(code: number, errorMessage?: string) {
    return (error: any) => {
      throw this.createError(code, errorMessage ?? error?.message ?? this.defaultErrorMessage, error);
    };
  }

  /**
   * To handle error in .Catch of a promise in simple way as internal server error
   * @param errorMessage Error message
   * @returns a fuction wich throws an expection with createError object with error message
   */
  throwInternalError(errorMessage?: string) {
    return (error: any) => {
      throw this.createError(500, errorMessage ?? error?.message ?? this.defaultErrorMessage, error);
    };
  }

  /**
   * This funtions handles and converts normal error to internal server error using throwInternalError.
   * First argumet is promise funcion and rest of arguments are passed to the promise function
   * @param promiseFunction Promise funtctios to be handled
   * @param args Argumients for the promise function
   * @returns Result of promise function
   */
  async handleInteralError(promiseFunction: any, ...args: any[]) {
    return await promiseFunction(...args).catch(this.throwInternalError());
  }

  /**
   * Creates a new random id string
   * @param options Options for creating random id
   * @returns promise with random id generated according to options
   */



}
