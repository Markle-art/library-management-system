import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create or retrieve the four genres.
  const genreNames = [
    'Technology',
    'Science Fiction',
    'Fantasy',
    'History',
  ];

  const genres: Record<string, number> = {};

  for (const name of genreNames) {
    const genre = await prisma.genre.upsert({
      where: { name },
      update: {},
      create: { name },
    });

    genres[name] = genre.id;
  }

  // Insert 16 books across the four genres.
  const books = [
    {
      title: 'Clean Code',
      author: 'Robert C. Martin',
      isbn: '9780132350884',
      publishedYear: 2008,
      genre: 'Technology',
    },
    {
      title: 'The Pragmatic Programmer',
      author: 'David Thomas and Andrew Hunt',
      isbn: '9780135957059',
      publishedYear: 2019,
      genre: 'Technology',
    },
    {
      title: 'Introduction to Algorithms',
      author: 'Thomas H. Cormen',
      isbn: '9780262046305',
      publishedYear: 2022,
      genre: 'Technology',
    },
    {
      title: 'Design Patterns',
      author: 'Erich Gamma',
      isbn: '9780201633610',
      publishedYear: 1994,
      genre: 'Technology',
    },
    {
      title: 'Dune',
      author: 'Frank Herbert',
      isbn: '9780441172719',
      publishedYear: 1965,
      genre: 'Science Fiction',
    },
    {
      title: 'Foundation',
      author: 'Isaac Asimov',
      isbn: '9780553293357',
      publishedYear: 1951,
      genre: 'Science Fiction',
    },
    {
      title: 'Neuromancer',
      author: 'William Gibson',
      isbn: '9780441569595',
      publishedYear: 1984,
      genre: 'Science Fiction',
    },
    {
      title: 'The Martian',
      author: 'Andy Weir',
      isbn: '9780553418026',
      publishedYear: 2014,
      genre: 'Science Fiction',
    },
    {
      title: 'The Hobbit',
      author: 'J.R.R. Tolkien',
      isbn: '9780547928227',
      publishedYear: 1937,
      genre: 'Fantasy',
    },
    {
      title: 'A Game of Thrones',
      author: 'George R.R. Martin',
      isbn: '9780553103540',
      publishedYear: 1996,
      genre: 'Fantasy',
    },
    {
      title: 'The Name of the Wind',
      author: 'Patrick Rothfuss',
      isbn: '9780756404741',
      publishedYear: 2007,
      genre: 'Fantasy',
    },
    {
      title: 'The Fellowship of the Ring',
      author: 'J.R.R. Tolkien',
      isbn: '9780547928210',
      publishedYear: 1954,
      genre: 'Fantasy',
    },
    {
      title: 'Sapiens',
      author: 'Yuval Noah Harari',
      isbn: '9780062316097',
      publishedYear: 2011,
      genre: 'History',
    },
    {
      title: 'Guns, Germs, and Steel',
      author: 'Jared Diamond',
      isbn: '9780393354324',
      publishedYear: 1997,
      genre: 'History',
    },
    {
      title: 'The Silk Roads',
      author: 'Peter Frankopan',
      isbn: '9781101912379',
      publishedYear: 2015,
      genre: 'History',
    },
    {
      title: 'A Short History of Nearly Everything',
      author: 'Bill Bryson',
      isbn: '9780767908184',
      publishedYear: 2003,
      genre: 'History',
    },
  ];

  for (const book of books) {
    const { genre, ...bookData } = book;

    await prisma.book.upsert({
      where: { isbn: book.isbn },
      update: {
        ...bookData,
        genreId: genres[genre],
      },
      create: {
        ...bookData,
        genreId: genres[genre],
      },
    });
  }

  console.log(`Seed completed: ${genreNames.length} genres and ${books.length} books.`);
}

main()
  .catch((error) => {
    console.error('Seeding failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });