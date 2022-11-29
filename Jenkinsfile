pipeline {

	agent any
	stages {
		
		

		stage("build frontend"){

			steps {
				sh "cd packages/web"
				sh "cd packages/web && npm i --force && npm fund && npm run build"
			} 

		
			}
		stage("deploy") {
		
			steps {
				sh "sudo cp -r packages/api/ /home/devineer/backend"
				sh "sudo cp -r ${WORKSPACE}/packages/web/dist/	/home/devineer/frontend"
				sh "pm2 kill"
				sh "cd /home/devineer/backend && npm install && pm2 start server.js -- --port 5555"
				sh "cd /home/devineer && pm2 serve frontend 3333"

	}
	}


	}



}
