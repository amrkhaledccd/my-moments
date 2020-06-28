#!/bin/sh
print_separator()
{
   echo "=================================================================="
   echo "          deploying $1"
   echo "=================================================================="
}

deploy_mongo()
{
   print_separator mongodb
   cd ./charts/mongodb-7.4.4
   helm install -f values.yaml -f ../../env/dev/helm/mongo.yaml moments-mongodb .
   cd ../..
}

deploy_kafka()
{
   print_separator kafka
   cd ./charts/kafka-6.1.6
   helm install -f values.yaml -f ../../env/dev/helm/kafka.yaml moments-kafka .
   cd ../..
}

deploy_neo4j()
{
   print_separator neo4j
   cd ./charts/neo4j-1.2.2
   helm install -f values.yaml -f ../../env/dev/helm/neo4j.yaml moments-neo4j .
   cd ../..
}

deploy_cassandra()
{ 
   print_separator cassandra
   cd ./charts/cassandra
   helm install -f values.yaml -f ../../env/dev/helm/cassandra.yaml moments-cassandra .
   cd ../..
}


deploy_configs()
{
  print_separator "swapy configs & secrets"
  cd ./charts/moments-configs
  helm install  -f ../../env/dev/helm/moments-configs.yaml moments-config .
  cd ../..
}


for param in $@
do
   case $param in 
	    mongodb)
		    deploy_mongo
		   ;;
	    kafka)
		    deploy_kafka
		   ;;
	    neo4j)
		    deploy_neo4j	
		   ;;
            cassandra)
		    deploy_cassandra
		   ;;
	    
		  moments_configs)
		    deploy_configs
		    ;;
 	    all)
		   deploy_mongo
		   deploy_kafka
		   deploy_neo4j
		   deploy_cassandra
		   deploy_configs
		   ;;
	   *)
		   echo "invalid param"
		   ;;
  esac
done
