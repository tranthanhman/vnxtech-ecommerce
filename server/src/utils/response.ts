export const successResponse = ({
  message,
  data,
  statusCode = 200,
}: {
  message: string;
  data: any;
  statusCode: number;
}) => {
  return {
    success: true,
    message,
    data,
    statusCode,
  };
};

export const errorResponse = ({
  message,
  errors,
  statusCode = 500,
}: {
  message: string;
  errors: any;
  statusCode: number;
}) => {
  return {
    success: false,
    message,
    errors,
    statusCode,
  };
};
