import { TransactionCategory } from '@prisma/client';

import { prisma } from '@infra/database/prisma';

import { cacheConfig } from '@main/config/env';
import { makeRedisCacheProvider } from '@main/factories/providers';

type SaveCategory = Pick<
  TransactionCategory,
  'title' | 'slug' | 'description' | 'type'
>;

export async function seedTransactionCategories() {
  try {
    await prisma.$connect();

    const categories: SaveCategory[] = [
      {
        title: 'Alimentação',
        slug: 'feed',
        description: 'Alimentação, restaurantes e fast-food',
        type: 'OUTCOME',
      },
      {
        title: 'Transporte',
        slug: 'transportation',
        description: 'Combustível, transporte e locomoção (como Uber e 99)',
        type: 'OUTCOME',
      },
      {
        title: 'Obras & Construção',
        slug: 'buildings',
        description: 'Contas relacionadas à obras, reformas e contrução',
        type: 'OUTCOME',
      },
      {
        title: 'Poupança',
        slug: 'savings',
        description: 'Reserva financeira',
        type: 'OUTCOME',
      },
      {
        title: 'Ferramentas & Materiais de trabalho',
        slug: 'tools',
        description: 'Ferramentas, licenças e materiais de trabalho',
        type: 'OUTCOME',
      },
      {
        title: 'Contas & Impostos',
        slug: 'taxes',
        description:
          'Contas de luz, água, internet e os mais diversos tipos de impostos',
        type: 'OUTCOME',
      },
      {
        title: 'Mercado',
        slug: 'market',
        description: 'Compras de supermercado',
        type: 'OUTCOME',
      },
      {
        title: 'Beleza & Cuidado pessoal',
        slug: 'make',
        description:
          'Itens de beleza, maquiagem, skin care e cuidados pessoais',
        type: 'OUTCOME',
      },
      {
        title: 'Pet',
        slug: 'pet',
        description: 'Despesas com nossos amados animais de estimação',
        type: 'OUTCOME',
      },
      {
        title: 'Saúde',
        slug: 'health',
        description: 'Saúde mental, física e medicamentos',
        type: 'OUTCOME',
      },
      {
        title: 'Serviços',
        slug: 'subscription',
        description:
          'Créditos para celular, serviços de streamming e assinatura num geral (como Spotify e Netflix)',
        type: 'OUTCOME',
      },
      {
        title: 'Moradia & Estadia',
        slug: 'home',
        description: 'Aluguel, estadia, moradia e condomínio',
        type: 'OUTCOME',
      },
      {
        title: 'Vestuario',
        slug: 'cloth',
        description: 'Roupas e calçados',
        type: 'OUTCOME',
      },
    ];

    await prisma.$transaction(
      categories.map(category => {
        return prisma.transactionCategory.upsert({
          create: category,
          update: category,
          where: {
            slug: category.slug,
          },
        });
      })
    );

    const updatedCategories = await prisma.transactionCategory.findMany({
      orderBy: { title: 'asc' },
    });

    const cacheProvider = makeRedisCacheProvider();

    cacheProvider.store({
      key: cacheConfig.TRANSACTION_CATEGORY_CACHE.KEY,
      expirationTimeInSeconds:
        cacheConfig.TRANSACTION_CATEGORY_CACHE.EXPIRATION_IN_SECONDS,
      payload: updatedCategories,
    });

    console.log('👍 Transaction categories seed done and cache updated.');
  } catch (error) {
    console.log('👎 Fail to create transaction categories.');

    console.log(error);
  } finally {
    await prisma.$disconnect();

    process.exit();
  }
}

seedTransactionCategories();
