interface ITypeError {
  type: string;
  data?: string;
}

class EvTypeError extends Error implements ITypeError {
  data: string;
  type: string;

  constructor({ type, data = `Error Type: ${type}` }: ITypeError) {
    super(data);
    this.type = type;
    this.data = data;
  }
}

export { EvTypeError };
