pipeline {

	agent any
	stages {
		
		

		stage("build frontend"){

			steps {
				sh "unset NODE_ENV"
				//sh "npm cache clear -force"
				sh "cd packages/web"
				//sh "sudo npm install -g npm@latest && sudo npm cache clear --force"
				sh "cd packages/web && sudo npm install --force --unsafe-perm=true --allow-root && npm fund && npm run build"
			} 

		
			}
		
		stage("build backend"){
		
			steps {
				//sh "unset NODE_ENV"
				//sh "sudo rm -rf "
				sh "cd packages/api && sudo npm install --force"
			
			}
		}
		
		stage("deploy") {
		
			steps {
				sh "sudo cp -fr ${WORKSPACE}/packages/api/* /home/devineer/backend"
				//sh "sudo npm cache clean --force && sudo cp -f ${WORKSPACE}/packages/api/package-lock.json /home/devineer/backend"
				sh "sudo cp -fr ${WORKSPACE}/packages/web/* /home/devineer/frontend"
				sh "sudo chown devineer /home/devineer/frontend"
				sh "sudo rm -rf /home/devineer/backend/node_modules/ && sudo rm -f /home/devineer/backend/package-lock.json"
				sh "sudo chown devineer /home/devineer/backend"
				sh "sudo npm install --force --prefix /home/devineer/backend"
				
				//sh "sudo ls /home/devineer/backend"
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
