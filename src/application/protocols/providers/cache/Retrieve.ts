interface IRetrieveCacheProvider {
  retrieve<O = unknown>(
    data: IRetrieveCacheProvider.Input
  ): Promise<IRetrieveCacheProvider.Output<O>>;
}

namespace IRetrieveCacheProvider {
  export type Input = {
    key: string;
  };

  export type Output<O> = null | O;
}

export { IRetrieveCacheProvider };
