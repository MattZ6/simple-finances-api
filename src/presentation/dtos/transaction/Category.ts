import { TransactionCategory } from '@domain/entities/TransactionCategory';

export namespace TransactionCategoryMapper {
  type ListItem = Pick<
    TransactionCategory,
    'id' | 'title' | 'description' | 'slug'
  >;

  export function toListItemDTO(data: TransactionCategory): ListItem {
    return {
      id: data.id,
      title: data.title,
      slug: data.slug,
      description: data.description,
    };
  }

  export function toListItemsDTO(data: TransactionCategory[]) {
    return data.map(toListItemDTO);
  }
}
