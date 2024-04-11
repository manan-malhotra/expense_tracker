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
        stage('Build') {
            steps {
                git branch: 'main', url: 'https://github.com/manan-malhotra/expense_tracker.git'
            }
        }
        // stage('Install'){
        //     steps{
        //         dir('server'){
        //             sh 'npm install'
        //         }
        //     }
        // }
        // stage('Test'){
        //     steps{
        //         dir('server'){
        //             sh 'npm test'
        //         }
        //     }
        // }
        // stage('Install client'){
        //     steps{
        //         dir('client'){
        //             sh 'npm install'
        //         }
        //     }
        // }
        // stage('Test client'){
        //     steps{
        //         dir('client'){
        //             sh 'npm test'
        //         }
        //     }
        // }
        // stage('git checkout'){
        //     steps{
        //         sh 'git checkout main'
        //         sh 'git pull origin test'
        //         sh 'git push origin main'
        //     }
        // }
        stage('Adding env') {
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
        stage('client deploy') {
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
        stage('server deploy') {
            steps {
                //  sh '/opt/homebrew/bin/ansible-playbook serverDeploy.yml -i inventory.yml'
                ansiblePlaybook([
                    playbook: 'serverDeploy.yml',
                    installation: 'ansible',
                    colorized: true,
                    inventory: 'inventory.yml',
                    disableHostKeyChecking: true,
                    extraVars: [
                            REMOTE_USER: "${REMOTE_USER}",
                            REMOTE_PASSWORD: "${REMOTE_PASSWORD}",
                            DOCKER_HUB_USER: "${DOCKER_HUB_USER}"
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