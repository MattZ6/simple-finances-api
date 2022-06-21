interface IGenerateJWTProvider<P = unknown> {
  encrypt(
    data: IGenerateJWTProvider.Input<P>
  ): Promise<IGenerateJWTProvider.Output>;
}

namespace IGenerateJWTProvider {
  export type Input<P> = {
    subject: string;
    payload?: P;
  };

  export type Output = string;
}

export { IGenerateJWTProvider };
