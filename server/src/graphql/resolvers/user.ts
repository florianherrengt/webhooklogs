import {
    Ctx,
    Query,
    Resolver,
    FieldResolver,
    Root,
    Mutation,
    Arg,
    UnauthorizedError,
} from 'type-graphql';
import { GraphqlContext } from '../../graphqlContext';
import { UpdateUserInput, User } from '../../models/User';
import { stripe } from '../../helpers/stripe';
import { config } from '../../config';
import { sequelize } from '../../models';

@Resolver(() => User)
export class UserResolver {
    @Query((returns) => User, { nullable: true })
    async me(@Ctx() context: GraphqlContext) {
        const user = await User.findByPk(context.user?.id);
        if (!user) {
            return null;
        }
        user.apiKey = Buffer.from(user.apiKey, 'utf-8').toString('base64');
        return user;
    }
    @FieldResolver(() => String)
    async stripeCustomerPortalLink(@Root() user: User): Promise<string> {
        const session = await stripe.billingPortal.sessions.create({
            customer: user.stripeCustomerId,
            return_url: `${config.app.protocol}://${config.app.domain}`,
        });
        return session.url;
    }
    @FieldResolver(() => Boolean)
    async hasPaymentMethod(@Root() user: User): Promise<boolean> {
        const paymentMethods = await stripe.paymentMethods.list({
            customer: user.stripeCustomerId,
            type: 'card',
        });

        return !!paymentMethods.data.length;
    }
    @FieldResolver(() => Boolean)
    async isSubscriptionValid(@Root() user: User): Promise<boolean> {
        const subscriptions = await stripe.subscriptions.list({
            customer: user.stripeCustomerId,
        });

        const isSubscribed =
            (!!subscriptions.data.length &&
                subscriptions.data[0].status === 'active') ||
            subscriptions.data[0].status === 'trialing';

        return isSubscribed;
    }
    @Mutation(() => User)
    async updateAccountSettings(
        @Arg('input') input: UpdateUserInput,
        @Ctx() context: GraphqlContext,
    ) {
        if (!context.user?.id) {
            return new UnauthorizedError();
        }
        const user = await User.findByPk(context.user.id);
        if (!user) {
            return new Error(`User with id ${context.user.id} not found`);
        }
        const transaction = await sequelize.transaction();
        try {
            await User.update(input, {
                where: { id: context.user.id },
                transaction,
            });
            await stripe.customers.update(user.stripeCustomerId, {
                name: input.username || user.username,
                email: input.email || user.email,
            });
            await transaction.commit();
        } catch (error) {
            console.error(error);
            await transaction.rollback();
        }
        return this.me(context);
    }
}
