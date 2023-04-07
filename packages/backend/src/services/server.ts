
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import fastify from 'fastify'
export default fastify().withTypeProvider<TypeBoxTypeProvider>();