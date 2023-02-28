module.exports = {
	apps: [
		{
			name: "server",
			script: "./build/app.js",
      node_args: "-r dotenv/config",
			instances: 2,
			autorestart: true,
			watch: true,
			stop_exit_codes: [0],
			exp_backoff_restart_delay: 100,
			max_memory_restart: "4G",
			ignore_watch: [
				"node_modules", 
				".git", 
				"ecosystem.config.js", 
				"build",
				"*.log",
				".env",
        "*.lock"
			],
			exec_mode: "cluster",
			wait_ready: true,
			max_restarts: 4,
			listen_timeout: 10000,
		},
	],
};
