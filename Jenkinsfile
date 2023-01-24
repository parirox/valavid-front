pipeline {
    environment {
        develop_server = '5.9.198.231'
        production_server = "185.206.93.109"
        project_name = "valavid-front"
        version = "master"
		gitBranch = "origin/master"
	    DOCKER_BUILDKIT = "1"
	    COMPOSE_DOCKER_CLI_BUILD = 1
    } 
    agent any
    stages {
        stage('build') {
            steps {
                script{
                    gitBranch=env.GIT_BRANCH

                    if(gitBranch=="origin/develop"){
                        version="develop"
                    }

                    if(gitBranch=="origin/master"){
                        sh "echo pushed to master"
                    }
                }
            }
           	post {
    			failure {
        			script{
            			sh "FAILED"
        			}
    			}
   			}
        }

        stage('test'){
            steps{
                sh "echo Run some unit tests"
            }
        }
        stage('deploy'){
            steps{
                script{

                    if(gitBranch=="origin/develop"){

                        withCredentials([usernamePassword(credentialsId: 'develop_server', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                            sh 'sshpass -p $PASSWORD ssh $develop_server -o StrictHostKeyChecking=no "cd /root/projects/$project_name && git pull"'
                            sh 'sshpass -p $PASSWORD ssh $develop_server -o StrictHostKeyChecking=no "cd /root/projects/$project_name && DOCKER_BUILDKIT=1 COMPOSE_DOCKER_CLI_BUILD=1 docker-compose  up -d --build"'
                        }
                    }

                    if(gitBranch=="origin/master"){

                        withCredentials([usernamePassword(credentialsId: 'valavid_production_server', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                            sh 'sshpass -p $PASSWORD ssh $USERNAME@$production_server -o StrictHostKeyChecking=no "sudo su && cd /root/projects/valavid-frontend && git pull"'
                            sh 'sshpass -p $PASSWORD ssh $USERNAME@$production_server -o StrictHostKeyChecking=no "sudo su && cd /root/projects/valavid-frontend && DOCKER_BUILDKIT=1 COMPOSE_DOCKER_CLI_BUILD=1 docker-compose -f docker-compose.prod.yml up -d --build"'
                        }

                    }
                }
            }
        }
    }
}
//TestLine

