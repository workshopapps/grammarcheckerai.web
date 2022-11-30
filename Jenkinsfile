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
				sh "sudo su - devineer && pwd && sudo pm2 delete all"
				sh "sudo su - devineer && sudo pm2 serve /home/devineer/frontend 3333"
				sh "sudo su - devineer && npm install && sudo pm2 start /home/devineer/backend/server.js -- --port 5555"
			
			}
			
	}


	}



}
