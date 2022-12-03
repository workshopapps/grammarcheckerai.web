pipeline {

	agent any
	stages {
		
		

		stage("build frontend"){

			steps {
				sh "unset NODE_ENV"
				sh "cd packages/web"
				sh "sudo npm install -g npm@latest && sudo npm cache clear --force"
				sh "cd packages/web && sudo npm install --force --unsafe-perm=true --allow-root && npm fund && npm run build"
				sh "cd packages/api && npm install --force"
			} 

		
			}
		stage("deploy") {
		
			steps {
				sh "sudo cp -fr ${WORKSPACE}/packages/api/* /home/devineer/backend"
				sh "sudo cp -fr ${WORKSPACE}/packages/web/* /home/devineer/frontend"
				sh "sudo chown devineer /home/devineer/frontend"
				//sh "sudo pm2 delete all"
				//sh "pm2 start npm /home/devineer/frontend 3333"
				//sh "sudo npm install && sudo pm2 start /home/devineer/backend/server.js -- --port 5555"
			}
			
	}


	}



}
