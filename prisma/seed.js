import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker/locale/pt_BR';

// Instanciando o Prisma Client
const prisma = new PrismaClient();

// Número de registros que queremos criar
const NUM_PETS = 50;

// Função auxiliar para gerar um objeto de Pet
function createFakePet() {
  const especieOptions = ['Cachorro', 'Gato', 'Pássaro', 'Hamster', 'Peixe', 'Coelho', 'Tartaruga'];
  const especie = faker.helpers.arrayElement(especieOptions);
  
  let nome;
  if (especie === 'Cachorro' || especie === 'Gato') {
    // Gera nomes de pessoas que soam bem para pets
    nome = faker.person.firstName();
  } else {
    // Para outras espécies, gera uma palavra e capitaliza
    nome = faker.word.noun({ length: { min: 4, max: 10 } });
    nome = nome.charAt(0).toUpperCase() + nome.slice(1);
  }

  return {
    nome: nome,
    especie: especie,
    // Idade entre 1 e 15 anos
    idade: faker.number.int({ min: 1, max: 15 }),
    // Nome e Sobrenome do Dono
    dono: faker.person.fullName(),
  };
}

async function main() {
  console.log('Iniciando o seeding de dados...');
  
  // 1. CORREÇÃO AQUI: De 'prisma.animal' para 'prisma.pet'
  // Limpa a tabela antes de inserir (opcional)
  await prisma.pet.deleteMany(); 
  console.log('Tabela Pet limpa.');

  // Cria um array com 50 objetos de pet
  const petsData = Array.from({ length: NUM_PETS }, createFakePet);

  // 2. CORREÇÃO AQUI: De 'prisma.animal' para 'prisma.pet'
  // Insere os 50 dados no banco usando createMany
  try {
    const result = await prisma.pet.createMany({
      data: petsData,
      skipDuplicates: true, // Garante que o script não falhe se algo único for gerado duas vezes
    });

    console.log(`✅ Seeding concluído. ${result.count} pets foram criados na tabela 'pets'.`);
  } catch (error) {
    console.error('❌ Erro durante o seeding:', error);
  }
}

// Executa a função principal
main();