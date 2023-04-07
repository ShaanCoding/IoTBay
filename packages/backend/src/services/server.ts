
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import fastify from 'fastify'

// Create a fastify instance with the TypeBox type provider for the models
export default fastify().withTypeProvider<TypeBoxTypeProvider>();