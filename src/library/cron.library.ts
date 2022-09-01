import cron from 'node-cron';
import { CHECK_SESSIONS_IN } from '../config/auth.config';
import { prisma } from './prisma.library';
import pubsub, { SESSION_EXPIRED } from './pubsub.library';

export const sessionTask = cron.schedule(CHECK_SESSIONS_IN, validateAdminSession);

async function validateAdminSession(now: Date) {
	const sessions = await prisma.session.findMany({
		where: { endsAt: { lte: now }, isPublished: false },
	});

	return Promise.all(
		sessions.map((session) =>
			pubsub
				.publish(SESSION_EXPIRED, {
					session: {
						success: false,
						message: 'Your session is expired...',
						debugMessage: session.token,
					},
				})
				.then(() =>
					prisma.session.update({
						where: { id: session.id },
						data: { isPublished: true },
					}),
				)
				.catch(console.error),
		),
	);
}
