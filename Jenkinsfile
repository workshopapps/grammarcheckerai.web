pipeline {

	agent any
	stages {
		
		

		stage("build frontend and backend"){

			steps {
				sh "unset NODE_ENV"
				//sh "npm cache clear -force"
				sh "cd packages/web"
				//sh "sudo npm install -g npm@latest && sudo npm cache clear --force"
				sh "cd packages/web && sudo npm install --force --unsafe-perm=true --allow-root && npm fund && npm run build"
				sh "cd packages/api && sudo npm install --force --unsafe-perm=true --allow-root"
			} 

		
			}
		stage("deploy") {
		
			steps {
				sh "sudo cp -fr ${WORKSPACE}/packages/api/* /home/devineer/backend"
				sh "sudo cp -fr ${WORKSPACE}/packages/web/* /home/devineer/frontend"
				sh "sudo chown devineer /home/devineer/frontend"
				sh "sudo chown devineer /home/devineer/backend"
				//sh "sudo pm2 delete all"
				//sh "pm2 start npm /home/devineer/frontend 3333"
				//sh "sudo npm install && pm2 start /home/devineer/backend/server.js -- --port 5555"
			}
			
		}

// 		stage("Performance test"){

// 			steps{
// 				echo 'Installing k6'
//                 // sh 'sudo chmod +x setup_k6.sh'
//                 // sh 'sudo ./setup_k6.sh'
//                 echo 'Running K6 performance tests...'
// 				sh 'ls -a'
// 				sh "pwd"
//                 sh 'k6 run Performance_Test_Discriptof.js'
// 			}
// 		}


	}



}
