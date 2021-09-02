# Pre Requesties

-   3 - Ubuntu Servers (Master - 1, Workers - 2)

## Step-01: Install Docker in all the 3 servers

-   sudo apt-get update
-   sudo apt-get remove docker docker-engine docker.io
-   sudo apt install docker.io
-   sudo usermod -aG docker $USER
-   sudo systemctl start docker
-   sudo systemctl enable docker
-   docker --version
-   After installtion Reboot all 3 instances

## Step-02: Open below ports in AWS Security Groups.

-   TCP port 2377 for cluster management communications
-   TCP and UDP port 7946 for communication among nodes
-   UDP port 4789 for overlay network traffic.
    -   If you are planning on creating an overlay network with encryption (--opt encrypted), you will also need to ensure ip protocol 50 (ESP) traffic is allowed.

## Step-03: Execute below command to initiate docker swarm manager in one system.

-   Initialize docker swarm cluster.
    -   docker swarm init
-   Get worker token
    -   docker swarm join-token worker
-   Get manager token to add another node as secondary manager
    -   docker swarm join-token manager

## Step-04: Add workers machines to cluster.

-   Execute join token(worker token from manager) in all worker machines.

## Step-05: Display docker cluster nodes in manager machine.

-   docker node ls

## Step-06: Deploy Sample Docker Application in docker swarm cluster.

-   docker service create --name webserver --replicas 2 -p 80:80 httpd
