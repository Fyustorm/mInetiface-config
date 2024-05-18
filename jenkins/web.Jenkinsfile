/* groovylint-disable CompileStatic */
pipeline {
   agent none
   stages {
      stage('Docker Build') {
            agent any
            steps {
               docker.withRegistry('http://192.168.1.16:10288/repository/docker-nexus-repo/') {
                  def dockerImage = docker.build('fyustorm/minetiface', './dockerfiles/nginx.Dockerfile')
                  dockerImage.push()
               }
            }
      }
   }
}
