delete-admission:
	kubectl delete -A ValidatingWebhookConfiguration ingress-nginx-admission

run:
	skaffold dev --no-prune=false --cache-artifacts=false

forward:
	kubectl port-forward service/

start-kube:
	minikube start
