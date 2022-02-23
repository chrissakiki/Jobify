// custom throw new error class with status code
class CustomAPIError extends Error {
  constructor(message) {
    super(message);
  }
}

export default CustomAPIError;
