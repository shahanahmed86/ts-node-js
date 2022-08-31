/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const cp = require('child_process');

shouldInstallModules();

const inquirer = require('inquirer');
const arg = require('arg');

const rawArgs = arg(
	{
		'--yes': Boolean,
		'-Y': '--yes',
		'--force-reinstall': Boolean,
		'-F': '--force-reinstall',
	},
	{
		argv: process.argv.slice(2),
	},
);

let options = {
	forceReInstall: rawArgs['--force-reinstall'] || false,
	skipPrompts: rawArgs['--yes'] || false,
	args: rawArgs._[0],
};

const questions = [
	{
		type: 'input',
		name: 'BCRYPT_SALT',
		message: 'Please enter the salt value to encrypt password/values with',
		default: '10',
	},
	{
		type: 'input',
		name: 'BCRYPT_MAX_BYTES',
		message: 'Please enter the salt value for maximum encryption bytes for password/values with',
		default: '72',
	},
	{
		type: 'password',
		name: 'JWT_SECRET',
		message: 'Please enter the secret to create a Login token with',
		default: 'pussy-cat',
	},
	{
		type: 'number',
		name: 'JWT_EXPIRES',
		message: 'Please enter the milliseconds to expire the JWT token',
		default: '3600000',
	},
	{
		type: 'input',
		name: 'DB_HOST',
		message: 'Please enter the host of database',
		default: 'mysqldb',
	},
	{
		type: 'input',
		name: 'DB_USER',
		message: "Please enter the username of Database's host",
		default: 'prisma',
	},
	{
		type: 'password',
		name: 'DB_PASS',
		message: "Please enter the password of Database's host",
		default: 'prisma',
	},
	{
		type: 'input',
		name: 'DB_NAME',
		message: "Please enter the name of Database's host like mydb, test or etc",
		default: 'mydb',
	},
	{
		type: 'input',
		name: 'DB_PORT',
		message: "Please enter the port where Database's host",
		default: '3306',
	},
];

(async () => {
	try {
		options = await promptForMissingOptions(options);
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { forceReInstall, skipPrompts, args, project_name, repository_name, image_name, ...env } =
			options;

		if (forceReInstall) {
			if (fs.existsSync('node_modules')) fs.rmSync('node_modules', { recursive: true });
			if (fs.existsSync('.husky/_')) fs.rmSync('.husky/_', { recursive: true });
			if (fs.existsSync('docker-compose/secrets')) {
				fs.rmSync('docker-compose/secrets', { recursive: true });
			}
			if (fs.existsSync('.env')) fs.rmSync('.env');
		}

		shouldInstallModules();

		const isEnvExists = fs.existsSync('.env');

		const envs = fs.createWriteStream('.env', { flags: 'a' });
		if (!isEnvExists) {
			const envExample = fs.readFileSync('.env.example', 'utf8');
			await insertContent(envs, envExample);
		}

		let allVars = getJSON('.env');
		Object.keys(env).forEach(async (k) => {
			if (!(k in allVars)) await insertContent(envs, `\n${k}=${env[k]}`);
		});

		const databaseUrl = `mysql://root:${env.DB_PASS}@${env.DB_HOST}:${env.DB_PORT}/${env.DB_NAME}`;
		await insertContent(envs, `\nDATABASE_URL=${databaseUrl}`);

		allVars = getJSON('.env');
		if (!fs.existsSync('docker-compose/secrets')) fs.mkdirSync('docker-compose/secrets');
		Object.keys(allVars).forEach((k) => {
			if (!fs.existsSync(`docker-compose/secrets/${k}`)) {
				fs.appendFileSync(`docker-compose/secrets/${k}`, allVars[k]);
			}
		});

		coloredLogs('Setup Finished', undefined, true);
	} catch (error) {
		coloredLogs(error.message, true);

		process.exit(1);
	}
})();

function executeCommand(cmd, exit = false, stdio = 'inherit') {
	const result = cp.spawnSync(cmd, {
		cwd: process.cwd(),
		env: process.env,
		stdio,
		shell: true,
		encoding: 'utf8`',
	});

	if (result.status || exit) process.exit(result.status);
	else {
		if (stdio === 'pipe') return result.stdout.replace('\n', '');
		else return true;
	}
}

function coloredLogs(message, failed = false, shouldExit = false) {
	executeCommand(`echo "\n\\e[1;${failed ? 31 : 32}m ...${message}... \\e[0m"`, shouldExit);
}

function promptForMissingOptions(opts) {
	if (opts.skipPrompts) {
		return questions.reduce(
			(acc, cur) => Object.assign(opts, acc, { [cur.name]: cur.default }),
			{},
		);
	}

	return inquirer
		.prompt(questions)
		.then((ans) =>
			questions.reduce((acc, cur) => Object.assign(opts, acc, { [cur.name]: ans[cur.name] }), {}),
		);
}

function getJSON(filePath, separate = '=') {
	return fs
		.readFileSync(filePath, 'utf8')
		.split('\n')
		.reduce((acc, cur) => {
			const [key, value] = cur.trim().split(separate);
			if (key.trim()) acc = { ...acc, [key]: value };
			return acc;
		}, {});
}

function shouldInstallModules() {
	if (!fs.existsSync('node_modules')) executeCommand('npm ci');
}

function insertContent(envs, content) {
	return new Promise((resolve, reject) => {
		envs.write(content, (err) => {
			if (err) reject(err.message);
			resolve(true);
		});
	});
}
