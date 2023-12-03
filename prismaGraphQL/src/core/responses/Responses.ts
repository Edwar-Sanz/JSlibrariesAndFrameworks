
export interface ResInterface {
  success: boolean;
  result: any;
  message: string;
  statusCode: number;
}


export class Response {

  success( result: any, message: string ): ResInterface {
    return {
      success: true,
      result: result,
      message: message,
      statusCode: 200
    }
  }

  error(message: string, statusCode: number ): ResInterface {
    return {
      success: false,
      result: null,
      message: message,
      statusCode: statusCode
    }
  }
  
}
// export default Response;