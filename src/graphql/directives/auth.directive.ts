import { mapSchema, getDirective, MapperKind } from '@graphql-tools/utils';
import { defaultFieldResolver, GraphQLSchema } from 'graphql';
import { authController } from '../../controllers/middleware/auth.controller';
import { UserTypes } from '../../types/common.types';
import { ContextObject } from '../../types/wrapper.types';
import { graphqlCatch } from '../../utils/errors.utils';
import { getUserType } from '../../utils/logics.utils';

function AuthDirective(schema: GraphQLSchema, directiveName: string) {
	return mapSchema(schema, {
		[MapperKind.OBJECT_FIELD]: function (field) {
			const directive = getDirective(schema, field, directiveName)?.[0];
			if (!directive) return field;

			const { resolve = defaultFieldResolver } = field;

			field.resolve = async (...args) => {
				try {
					const key = getUserType(directive as UserTypes);
					const context: ContextObject = args[2];
					await authController(key, context.req);
				} catch (e) {
					graphqlCatch(e);
				}

				return resolve.apply(this, args);
			};
			return field;
		},
	});
}

export default AuthDirective;
