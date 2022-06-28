import { GraphQLResolveInfo } from 'graphql';

export declare type IFieldResolver<TSource, TContext, TArgs = Record<string, any>> = (source: TSource, args: TArgs, context: TContext, info: GraphQLResolveInfo & {
 mergeInfo: MergeInfo;
}) => any;