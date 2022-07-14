import { prisma } from '@infra/database/prisma';

import { cacheConfig } from '@main/config/env';
import { makeRedisCacheProvider } from '@main/factories/providers';

export async function seedTransactionCategories() {
  try {
    await prisma.$connect();

    const categories = [
      {
        title: 'Alimentação',
        slug: 'feed',
        description: 'Alimentação, restaurantes e fast-food',
      },
      {
        title: 'Transporte',
        slug: 'transportation',
        description: 'Combustível, transporte e locomoção (como Uber e 99)',
      },
      {
        title: 'Obras & Construção',
        slug: 'buildings',
        description: 'Contas relacionadas à obras, reformas e contrução',
      },
      {
        title: 'Poupança',
        slug: 'savings',
        description: 'Reserva financeira',
      },
      {
        title: 'Ferramentas & Materiais de trabalho',
        slug: 'tools',
        description: 'Ferramentas, licenças e materiais de trabalho',
      },
      {
        title: 'Contas & Impostos',
        slug: 'taxes',
        description:
          'Contas de luz, água, internet e os mais diversos tipos de impostos',
      },
      {
        title: 'Mercado',
        slug: 'market',
        description: 'Compras de supermercado',
      },
      {
        title: 'Beleza & Cuidado pessoal',
        slug: 'make',
        description:
          'Itens de beleza, maquiagem, skin care e cuidados pessoais',
      },
      {
        title: 'Pet',
        slug: 'pet',
        description: 'Despesas com nossos amados animais de estimação',
      },
      {
        title: 'Saúde',
        slug: 'health',
        description: 'Saúde mental, física e medicamentos',
      },
      {
        title: 'Serviços',
        slug: 'subscription',
        description:
          'Créditos para celular, serviços de streamming e assinatura num geral (como Spotify e Netflix)',
      },
      {
        title: 'Moradia & Estadia',
        slug: 'home',
        description: 'Aluguel, estadia, moradia e condomínio',
      },
      {
        title: 'Vestuario',
        slug: 'cloth',
        description: 'Roupas e calçados',
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
