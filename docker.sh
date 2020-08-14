APPNAME="node-api-boot"
PORT=8000

remove() {
    docker rm $APPNAME
}

build() {
    docker build -t $APPNAME .
}

stop() {
    docker stop $APPNAME
}

run() {
    docker run -it -d \
    -p $PORT:$PORT \
    -v $KUBECONFIG:/root/.kube \
    -v $AWSCONFIG:/root/.aws \
    --name="$APPNAME" $APPNAME
}

logs() {
    docker logs -f $APPNAME
}

start() {
    build
    stop
    remove
    run
}

$*
