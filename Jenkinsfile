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
        dockerfile true
    }
    stages {
        stage('Build') {
            steps {
                sh 'gulp build'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
            post {
                always {
                    junit 'target/surefire-reports/*.xml'
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
}
