interface IStoreCacheProvider {
  store(data: IStoreCacheProvider.Input): Promise<IStoreCacheProvider.Output>;
}

namespace IStoreCacheProvider {
  export type Input = {
    key: string;
    expirationTimeInSeconds: number;
    payload: any;
  };

  export type Output = void;
}

export { IStoreCacheProvider };
