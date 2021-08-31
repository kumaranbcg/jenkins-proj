## JDK Installation Commands
     - ## JDK Installation Commands

          -   sudo apt search openjdk
          -   sudo apt install default-jdk-headless
          -   java --version
-   sudo apt search openjdk
-   sudo apt install default-jdk-headless
-   java --version

## Jenkins Installation Commands

-   wget -q -O - https://pkg.jenkins.io/debian-stable/jenkins.io.key | sudo apt-key add -
-   sudo sh -c 'echo deb https://pkg.jenkins.io/debian-stable binary/ > \
     /etc/apt/sources.list.d/jenkins.list'
-   sudo apt-get update
-   sudo apt-get install jenkins

## Start Jenkins

-   sudo systemctl daemon-reload
-   sudo systemctl start jenkins
-   sudo systemctl status jenkins

## Docker Installation Commands

-   sudo apt-get update
-   sudo apt-get remove docker docker-engine docker.io
-   sudo apt install docker.io
-   sudo systemctl start docker
-   sudo systemctl enable docker
-   docker --version

## AWS CLI Installation Commands

-   curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
-   sudo apt install unzip
-   unzip awscliv2.zip
-   sudo ./aws/install

## Add Permission to user to access Jenkins and Docker

-   sudo groupadd docker
-   sudo usermod -aG docker $USER
-   sudo usermod -aG docker jenkins
-   sudo service jenkins restart
-   sudo chmod a+rwx /var/lib/jenkins/secrets/
-   cd /var/lib/jenkins/secrets/
-   sudo chmod a+rwx ./initialAdminPassword
-   sudo apt-get install jq
