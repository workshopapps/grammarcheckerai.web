pipeline {

	agent any
	stages {
		
		

		stage("build frontend"){

			steps {
				sh "cd packages/web"
				sh "sudo npm install -g npm@latest && sudo npm cache clear --force"
				sh "cd packages/web && npm i --force && npm fund && CI=false npm run build"
			} 

		
			}
		stage("deploy") {
		
			steps {
				sh "sudo cp -rf packages/api/ /home/devineer/backend"
				sh "sudo cp -fr ${WORKSPACE}/packages/web/* /home/devineer/frontend"
				//sh "sudo chsh -s /bin/bash jenkins"
				sh "sudo su - devineer && whoami"
				sh "sudo pm2 delete all"
				sh "sudo pm2 serve /home/devineer/frontend 3333"
				//sh "sudo npm install && sudo pm2 start /home/devineer/backend/server.js -- --port 5555"
			}
			
	}


	}



}
