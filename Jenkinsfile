pipeline {
    agent any
    environment {
        env = file('env')
        PATH = "/opt/homebrew/bin/:/usr/local/bin:$PATH"
        REMOTE_USER = credentials('REMOTE_USER')
        REMOTE_PASSWORD = credentials('REMOTE_PASSWORD')
        DOCKER_HUB_USER = credentials('DOCKER_HUB_USER')
        DOCKER_HUB_PASSWORD = credentials('DOCKER_HUB_PASSWORD')
        APIKEY = credentials('APIKEY')
        AUTHTOKEN = credentials('AUTHTOKEN')
    }

    stages {
        stage('Getting files from SCM') {
            steps {
                git branch: 'test', url: 'https://github.com/manan-malhotra/expense_tracker.git'
            }
        }
        stage('Installing Node modules on server') {
            steps {
                dir('server') {
                    sh 'npm install'
                }
            }
        }
        stage('Testing server') {
            steps {
                dir('server') {
                    sh 'npm test'
                }
            }
        }
        stage('Installing Node modules on client') {
            steps {
                dir('client') {
                    sh 'npm install'
                }
            }
        }
        stage('Testing client') {
            steps {
                dir('client') {
                    sh 'npm test'
                }
            }
        }
        stage('Pushing to main branch') {
            steps {
                sh 'git checkout main'
                sh 'git pull origin test'
                sh 'git push origin main'
            }
        }
        stage('Adding env variables') {
            steps {
                dir('server') {
                    withCredentials([file(credentialsId: 'env', variable: 'env')]) {
                        sh 'ls'
                        sh 'cat $env > .env'
                        sh 'ls -a'
                    }
                }
            }
        }
        stage('Deploying client via ansible') {
            steps {
                ansiblePlaybook([
                    playbook: 'clientDeploy.yml',
                    installation: 'ansible',
                    colorized: true,
                    inventory: 'inventory.yml',
                    disableHostKeyChecking: true,
                    extraVars: [
                        REMOTE_USER: "${REMOTE_USER}",
                        REMOTE_PASSWORD: "${REMOTE_PASSWORD}",
                        DOCKER_HUB_USER: "${DOCKER_HUB_USER}",
                        DOCKER_HUB_PASSWORD: "${DOCKER_HUB_PASSWORD}"
                    ]
                ])
            }
        }
        stage('Deploying server via ansible') {
            steps {
                ansiblePlaybook([
                    playbook: 'serverDeploy.yml',
                    installation: 'ansible',
                    colorized: true,
                    inventory: 'inventory.yml',
                    disableHostKeyChecking: true,
                    extraVars: [
                        REMOTE_USER: "${REMOTE_USER}",
                        REMOTE_PASSWORD: "${REMOTE_PASSWORD}",
                        DOCKER_HUB_USER: "${DOCKER_HUB_USER}",
                        DOCKER_HUB_PASSWORD: "${DOCKER_HUB_PASSWORD}",
                        APIKEY: "${APIKEY}",
                        AUTHTOKEN: "${AUTHTOKEN}"
                    ]
                ])
            }
        }
    }
    post {
        always {
            cleanWs()
        }
    }
}
