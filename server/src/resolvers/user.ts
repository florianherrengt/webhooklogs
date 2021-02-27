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
import { GraphqlContext } from '../graphqlContext';
import { UpdateUserInput, User } from '../models/User';
import { Stripe } from 'stripe';
import { stripe } from '../helpers/stripe';
import { config } from '../config';

@Resolver(() => User)
export class UserResolver {
    @Query((returns) => User, { nullable: true })
    me(@Ctx() context: GraphqlContext) {
        return User.findByPk(context.user?.id);
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
        await User.update(input, { where: { id: context.user.id } });
        return this.me(context);
    }
}
