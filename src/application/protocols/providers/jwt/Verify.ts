interface IVerifyJWTProvider {
  verify<T = unknown>(
    data: IVerifyJWTProvider.Input
  ): Promise<IVerifyJWTProvider.Output<T>>;
}

namespace IVerifyJWTProvider {
  export type Input = {
    value: string;
  };

  export type Output<P = unknown> = {
    subject: string;
    payload: P;
  };
}

export { IVerifyJWTProvider };
