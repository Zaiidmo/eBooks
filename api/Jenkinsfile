pipeline {
    agent {
        label 'slave'
    }

    environment {
        DEPLOY_SERVER = 'ubuntu@3.124.192.157'
        BOOKS_SERVICE_DIR = '/home/ubuntu/eBooks-API'
        GIT_REPO = 'git@github.com:Zaiidmo/eBooks-API.git'
        WORKSPACE = "${JENKINS_HOME}/workspace/books-service-pipeline"
        NODE_OPTIONS = '--max_old_space_size=4096'  
    }

    tools {
        nodejs 'Node-20.9.0'
    }

    stages {
        stage('Cleanup Workspace') {
            steps {
                cleanWs()
            }
        }

        stage('Checkout') {
            steps {
                git branch: 'master',
                    url: "${GIT_REPO}"
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                    npm cache clean --force
                    npm install -g @nestjs/cli
                    npm install
                '''
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy to Books-Service') {
            steps {
                sshagent(['jenkins-slave-key']) {
                    script {
                        sh """
                            ssh -o StrictHostKeyChecking=no ${DEPLOY_SERVER} "
                                cd ${BOOKS_SERVICE_DIR} && \
                                GIT_SSH_COMMAND='ssh -i ~/.ssh/jenkins_github_key -o StrictHostKeyChecking=no' git pull origin master && \
                                npm install && \
                                npm run build && \
                                pm2 delete all && \
                                pm2 start dist/src/main.js --name eBooks-API
                            "
                        """
                    }
                }   
            }
    }
    }

    post {
        always {
            echo 'Pipeline finished'
            cleanWs()
        }
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}