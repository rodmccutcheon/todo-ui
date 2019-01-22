// npm install phantomjs-prebuilt@2.1.15
// npm install
// npm install typings@1.4.0
// export PATH="$PATH:$WORKSPACE/node_modules/.bin"
// export NODE_ENV="staging"
// typings install
// npm test
// gulp build

pipeline {
    agent {
        docker {
            image 'maven:3-alpine'
            args '-v $HOME/.m2:/root/.m2'
        }
    }
//    triggers {
//        cron('H H(13-16) * * *')
//    }
    stages {
        stage('Build') {
            steps {
                sh 'mvn -B -DskipTests clean package'
            }
        }
        stage('Test') {
            steps {
                sh 'mvn test'
            }
            post {
                always {
                    junit 'todo-web/target/surefire-reports/*.xml'
                }
            }
        }
        stage('Inspect') {
            steps {
                withSonarQubeEnv('My SonarQube Server') {
                    sh 'sonar:sonar'
                }
            }
        }
        stage('Deploy') {
            steps {
                echo 'TODO: deploy step'
            }
        }
    }
    post {
        success {
            slackSend channel: '#ops',
                    color: 'good',
                    message: 'The pipeline ${currentBuild.fullDisplayName} completed successfully.'

        }
        failure {
            slackSend channel: '#ops',
                    color: 'bad',
                    message: 'The pipeline ${currentBuild.fullDisplayName} failed.'

        }
    }
}