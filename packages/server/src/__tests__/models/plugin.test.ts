import Lab from '@hapi/lab';
import { expect } from '@hapi/code';
import Hapi from '@hapi/hapi';
import DatabaseCleaner from 'database-cleaner';

import plugin from '../../models/plugin';
import utils from '../../utils';
import factory from '../factory';

export const lab = Lab.script();

const databaseCleaner = new DatabaseCleaner('mongodb');
const { test, suite, after, before } = lab;
const { slugger } = utils;
const [fakeProfile] = factory.profile(1);
const [fakeTopTrack] = factory.topTrack(1);

const Server = async () => {
	const server = Hapi.Server();

	await server.register({
		plugin,
	});

	return server;
};

suite('Given models plugin', () => {
	suite('And registered plugin', () => {
		let server;

		before(async () => {
			server = await Server();
		});

		after(async () => {
			await databaseCleaner.clean(server.app.db.korin.link);
		});

		suite('And korin app', () => {
			test('server.app.db.korin has link', () => {
				expect(server.app.db.korin.link).to.exist();
			});

			['TopTrack', 'Profile'].forEach(model => {
				test(`server.app.db.korin has ${model}`, () => {
					expect(server.app.db.korin[model].modelName).to.equal(model);
				});
			});

			suite('And TopTrack model', () => {
				let topTrack;
				before(() => {
					topTrack = new server.app.db.korin.TopTrack(fakeTopTrack);
				});

				test('it can be saved', async () => {
					expect(topTrack.profileUrl).not.to.exist();

					const result = await topTrack.save();
					const expected = slugger.slugify(
						`${topTrack.artist} ${topTrack.title}`,
					);

					expect(result._id).to.exist();
					expect(result.profileUrl).to.equal(expected);
				});

				test('it can be found', async () => {
					const track = await server.app.db.korin.TopTrack.findOne({
						title: fakeTopTrack.title,
					});

					expect(track.artist).to.equal(fakeTopTrack.artist);
					expect(track._id).to.exist();
				});
			});

			suite('And Profile model', () => {
				before(({ context }) => {
					context.profile = new server.app.db.korin.Profile(fakeProfile);
				});

				test('it can be saved', async ({ context }) => {
					const result = await context.profile.save();

					expect(result._id).to.exist();
				});

				test('it can be found', async () => {
					const track = await server.app.db.korin.Profile.findOne({
						title: fakeProfile.title,
					});

					expect(track.artist).to.equal(fakeProfile.artist);
					expect(track._id).to.exist();
				});
			});
		});

		suite('And pipeline app', () => {
			test('server.app.db.pipeline has link', () => {
				expect(server.app.db.pipeline.link).to.exist();
			});

			['TopTracksRaw'].forEach(model => {
				test(`server.app.db.pipeline has ${model}`, () => {
					expect(server.app.db.pipeline[model].modelName).to.equal(model);
				});
			});
		});
	});
});
