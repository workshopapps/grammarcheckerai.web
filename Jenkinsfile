pipeline {

	agent any
	stages {
		
		

		stage("build frontend"){

			steps {
				sh "cd packages/web"
				sh "cd packages/web && unset NODE_ENV && npm i --force && npm fund && npm run build"
			} 

		
			}
		stage("deploy") {
		
			steps {
				sh "sudo cp -r packages/api/ /home/devineer/backend"
				sh "sudo cp -r ${WORKSPACE}/packages/web/dist/	/home/devineer/frontend"
				sh "sudo chsh -s /bin/bash jenkins"
				sh "su - devineer -c 'echo $USER'"
				sh "sudo pm2 delete all"
				sh "sudo pm2 serve /home/devineer/frontend 3333"
				sh "sudo npm install && sudo pm2 start /home/devineer/backend/server.js -- --port 5555"
			}
			
	}


	}



}
