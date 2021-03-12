import { cache } from './cache';
import { Application } from './models';
import * as testHelpers from './helpers/testHelpers';

describe('cache', () => {
    test('application', async () => {
        const user = await testHelpers.createUser();
        const application = await testHelpers.createApplication({
            userId: user.id,
        });
        await cache.application.set(application);
        await expect(
            cache.all.get(`application:${application.id}`),
        ).resolves.toEqual(expect.objectContaining({ id: application.id }));
        const cachedApplication = await cache.application.get(application.id);
        if (!cachedApplication) {
            throw new Error('application has not been cached');
        }
        cachedApplication.name = 'updated';
        await cachedApplication.save();

        await expect(Application.findByPk(application.id)).resolves.toEqual(
            expect.objectContaining({ name: 'updated' }),
        );
    });
});
