# Who am I?
I'm responsible for Swapy infrastructure and the management of the required dependencies.

# Setup local env on Minikube

## Prerequisite
<ul>
<li>Install JDK (latest version)</li>
<li>Install node and npm</li>
<li>Install Docker</li>
<li>Install Minikube</li>
<li>Install Helm3</li>
</ul>

## Deploy dependencies
Checkout swapy-management project then navigate to the project folder and run the belo command

    ./deploy.sh all

Deploy only mongodb 
    
    ./deploy.sh mongodb

Deploy only kafka
   
    ./deploy.sh kafka

Deploy only Swapy configuration

    ./deploy.sh swapy_configs

## Deploy services

To deploy a service, checkout service project, navigate to 

    {project_folder}/deployment/helm

then type the below command

    helm install {service_release_name} .

example deploying auth service

    helm install auth-service .
    
## Update an existing release
   
    helm update {release_name}

## List all helm releases

    helm ls

## Uninstall a release

    helm uninstall {release_name}

example uninstalling auth service

    helm uninstall auth-service