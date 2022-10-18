#!/bin/bash


if [[ ${1} == "up" ]]; then

    if [ -f `which uname` ]; then
        if [ `uname -p` == "arm" ]; then
            # Apple Silicon
            APPLE_SILICON=1
        fi
    fi

    if [ ${APPLE_SILICON:-0} -eq 0 ]; then
			docker pull docker.uncharted.software/auth/httpd-openidc:dev-1.0.1
			docker pull docker.uncharted.software/auth/keycloak:dev-1.0.0
    else
        echo "not pulling latest images as Apple Silicon httpd-openidc has not been pushed to the repo"
    fi

		docker pull docker.uncharted.software/auth/terarium-theme:0.0.1
    kubectl apply -f gateway-postgres-service.yaml -f gateway-postgres-deployment.yaml -f gateway-keycloak-realm.yaml -f gateway-keycloak-service.yaml -f gateway-keycloak-deployment.yaml -f gateway-httpd-config.yaml -f gateway-httpd-htdocs.yaml -f gateway-httpd-service.yaml -f gateway-httpd-deployment.yaml

    exit 0
fi

if [[ ${1} == "down" ]]; then
    kubectl delete -f gateway-postgres-service.yaml -f gateway-postgres-deployment.yaml -f gateway-keycloak-realm.yaml -f gateway-keycloak-service.yaml -f gateway-keycloak-deployment.yaml -f gateway-httpd-config.yaml -f gateway-httpd-htdocs.yaml -f gateway-httpd-service.yaml -f gateway-httpd-deployment.yaml

    exit 0
fi

if [[ ${1} == "status" ]]; then
    kubectl get po,svc,configMap

    exit 0
fi

echo "Usage:"
echo "    ${0} up        launches the Gateway and Authentication services"
echo "    ${0} down      tears down the Gateway and Authentication services"
echo "    ${0} status    displays the status of the Gateway and Authentication services"
