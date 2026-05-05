export const successResponse = <T>(data: T, message: string = "Success") => {
  return {
    success: true,
    message,
    data,
  };
};

export const errorResponse = (message: string = "Something went wrong") => {
  return {
    success: false,
    message,
  };
};