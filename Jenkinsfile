pipeline {
    environment {
        registryFrontend = 'tobiisreal/team-grit-frontend'
        registryBackend = 'tobiisreal/team-grit-backend'
        registryCredential = 'dockerhubcredentials'
        dockerImageFrontend = ''
        dockerImageBackend = ''
        ANSIBLE_PRIVATE_KEY = credentials('gritty-private-key')
    }
    agent any
    tools { nodejs 'node' }
    stages {
            stage('Installing dependencies') {
            steps {
                script {
                        sh 'cd packages/api && npm install --verbose'
                        //sh 'cd ..'
                        sh 'cd packages/web && npm install --verbose'
                }
            }
            }
        stage('Building Docker Image') {
                steps {
                    script {
                        /* remove all container */
                        always {
                            sh 'docker stop $(docker ps -a -q)'
                            sh 'docker rm $(docker ps -q)'
                        }
                        dir('packages/web') {
                        dockerImageFrontend = docker.build registryFrontend + ':latest'
                        }
                        dir('packages/api') {
                        dockerImageBackend = docker.build registryBackend + ':latest'
                        }
                    }
                }
        }
            stage('Deploying Docker Image to Dockerhub') {
                steps {
                    script {
                        docker.withRegistry('https://registry.hub.docker.com', registryCredential) {
                        dockerImageFrontend.push()
                        dockerImageBackend.push()
                        }
                    }
                }
            }
    }
        stage('Deploying using ansible') {
                steps {
                sh 'ansible-playbook --private-key=$ANSIBLE_PRIVATE_KEY ./ansible/deploy-app.yml -i ./ansible/inventory.txt -vvv'
                }
        }
        stage('Email notification') {
                steps {
                sh 'mail bcc: '', body: 'check build', cc: 'joshkid610@gmail.com, philndubuoke@gmail.com', from: '', replyTo: '', subject: 'Build failure', to: 'isreali34@gmail.com'
                }
    }
}