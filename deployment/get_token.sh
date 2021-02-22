kubectl -n kube-system describe secret $(kubectl -n kube-system get secret | grep default-token | cut -d " " -f1)

