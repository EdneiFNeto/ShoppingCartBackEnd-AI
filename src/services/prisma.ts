import { PrismaClient } from '@prisma/client';

// Ensure local development (running `npm run dev`) can connect to a DB
// mapped to localhost by Docker Compose. When the app runs inside Docker
// the DATABASE_URL should use the service host `postgres` and the
// environment variable `IN_DOCKER` can be set to keep the original URL.
const originalDatabaseUrl = process.env.DATABASE_URL || '';
let databaseUrl = originalDatabaseUrl;

const isProduction = process.env.NODE_ENV === 'production';
const inDocker = !!process.env.IN_DOCKER;

if (!isProduction && !inDocker && databaseUrl.includes('@postgres:')) {
	databaseUrl = databaseUrl.replace('@postgres:', '@localhost:');
}

const prisma = new PrismaClient({
	datasources: {
		db: { url: databaseUrl },
	},
});

export default prisma;

