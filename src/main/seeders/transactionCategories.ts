import { prisma } from '@infra/database/prisma';

export async function seedTransactionCategories() {
  try {
    await prisma.$connect();

    const categories = [
      {
        title: 'Alimentação',
        slug: 'feed',
        description: 'Contas relacionadas à alimentação',
      },
      {
        title: 'Transporte',
        slug: 'transportation',
        description: 'Contas relacionadas à transporte e locomoção',
      },
      {
        title: 'Obras & Construção',
        slug: 'buildings',
        description: 'Contas relacionadas à obras e contrução',
      },
      {
        title: 'Poupança',
        slug: 'savings',
        description: 'Contas relacionadas à reserva financeira',
      },
      {
        title: 'Ferramentas & Materiais de trabalho',
        slug: 'tools',
        description:
          'Contas relacionadas à ferramentas, licenças e materiais de trabalho',
      },
      {
        title: 'Impostos',
        slug: 'taxes',
        description: 'Contas relacionadas aos mais diversos tipos de impostos',
      },
    ];

    await prisma.$transaction(
      categories.map(category => {
        return prisma.transactionCategory.upsert({
          create: category,
          update: category,
          where: {
            title: category.title,
          },
        });
      })
    );

    console.log('👍 Transaction categories seed done.');
  } catch (error) {
    console.log('👎 Fail to create transaction categories.');

    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
}

seedTransactionCategories();
