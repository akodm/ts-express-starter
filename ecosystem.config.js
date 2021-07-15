module.exports = {
	apps: [
		{
			name: "SERVER",
			script: "./build/app.js",
			instances: 4,
			autorestart: true,
			watch: true,
			// max_memory_restart: '1G',
			ignore_watch: [
				"node_modules", 
				".git", 
				"ecosystem.config.js", 
				"./src/public", 
				"*.log",
			],
			exec_mode: "cluster",
			wait_ready: true,
			// max_restarts: 4,
			listen_timeout: 10000,
			env: {
				NODE_ENV: "development",
			},
			env_production: {
				NODE_ENV: "production",
			},
		},
	],
};
