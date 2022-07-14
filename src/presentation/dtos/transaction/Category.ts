import { TransactionCategory } from '@domain/entities/TransactionCategory';

export namespace TransactionCategoryMapper {
  type ListItem = Pick<
    TransactionCategory,
    'id' | 'title' | 'description' | 'type' | 'slug'
  >;

  export function toListItemDTO(data: TransactionCategory): ListItem {
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      type: data.type,
      slug: data.slug,
    };
  }

  export function toListItemsDTO(data: TransactionCategory[]) {
    return data.map(toListItemDTO);
  }
}
