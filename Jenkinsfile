pipeline {
    agent any

    stages {
        stage('Verify Branch') {
            steps {
                echo "$GIT_BRANCH"
            }
        }
        stage('Docker Build'){
            steps{
                sh 'docker images -a'
                sh"""
                docker build -t narasimharao12/newsbird .
                docker images -a
                """
            }
        }
        stage('Push Container'){
            steps {
                echo "WorkSpace is $WORKSPACE"
                dir("$WORKSPACE"){
                    script{
                           withCredentials([string(credentialsId: 'dockerhubpwd', variable: 'dockerhubpwd')]) {
                            sh 'docker login -u narasimharao12 -p ${dockerhubpwd}'
                           }
                           sh 'docker push narasimharao12/newsbird' 
                        }
                    }
                }
            }
        stage('Pushing to k8s'){
            steps{
                kubernetesDeploy(configs: "deploymentservie.yml", kubeconfigId: "kubernetes")
            }
        }
        }
}
