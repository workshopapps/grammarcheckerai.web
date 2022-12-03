pipeline {

	agent any
	stages {
		
		

		stage("build frontendnbackend"){

			steps {
				sh "unset NODE_ENV"
				sh "cd packages/web"
				sh "sudo npm install -g npm@latest && sudo npm cache clear --force"
				sh "cd packages/web && sudo npm install --force --unsafe-perm=true --allow-root && npm fund && npm run build"
				sh "cd packages/api && sudo npm install --force"
			} 

		
			}
		stage("deploy") {
		
			steps {
				sh "sudo cp -fr ${WORKSPACE}/packages/api/* /home/enyioman/backend"
				sh "sudo cp -fr ${WORKSPACE}/packages/web/* /home/enyioman/frontend"
				sh "sudo chown enyioman /home/enyioman/frontend"
				sh "sudo chown enyioman /home/enyioman/backend"
				// sh "sudo pm2 delete all"
				sh "pm2 start npm /home/enyioman/frontend -- --port 3333"
				sh "sudo npm install && sudo pm2 start /home/enyioman/backend/server.js -- --port 5555"
			}
			
	}


	}



}
