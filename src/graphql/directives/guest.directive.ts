import { mapSchema, getDirective, MapperKind } from '@graphql-tools/utils';
import { defaultFieldResolver, GraphQLSchema } from 'graphql';
import { guestController } from '../../controllers/middleware/auth.controller';
import { ContextObject } from '../../types/wrapper.types';

function GuestDirective(schema: GraphQLSchema, directiveName: string) {
	return mapSchema(schema, {
		[MapperKind.OBJECT_FIELD]: function (field) {
			const directive = getDirective(schema, field, directiveName)?.[0];
			if (!directive) return field;

			const { resolve = defaultFieldResolver } = field;

			field.resolve = async (...args) => {
				const context: ContextObject = args[2];

				guestController(context.req);

				return resolve.apply(this, args);
			};

			return field;
		},
	});
}

export default GuestDirective;
