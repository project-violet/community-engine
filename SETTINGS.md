# community-engine settings

## 메모리가 많이 필요하다면?

Swap을 쓰자

```
mkdir -p /var/swap
dd if=/dev/zero of=/var/swap/swapfile bs=1M count=1000
mkswap -f /var/swap/swapfile
swapon /var/swap/swapfile
swapon -s

swapoff /var/swap/swapfile
```

## ElasticSearch 설치

Single Node

```
sudo yum install docker
sudo service docker start
docker pull docker.elastic.co/elasticsearch/elasticsearch:7.9.1
docker run -d -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" --name elasticsearch7 \
  docker.elastic.co/elasticsearch/elasticsearch:7.9.1
docker pull docker.elastic.co/kibana/kibana:7.9.1
docker run -d --link elasticsearch7:elasticsearch -p 5601:5601 --name kibana7 docker.elastic.co/kibana/kibana:7.9.1
docker pull lmenezes/cerebro
docker run -d -p 9000:9000 --link elasticsearch7:localhost --name cerebro \
  -e "CEREBRO_PORT=9000" -e "ELASTICSEARCH_HOST=http://localhost:9200" lmenezes/cerebro
```

Multiple Host

https://xyzcoder.github.io/2020/07/22/how-to-deploy-an-elastic-search-cluster-consisting-of-multiple-hosts-using-es-docker-image.html

## Redis 설치

```
sudo yum install docker
sudo service docker start
docker pull redis:alpine
docker network create redis-net
docker netowrk inspect redis-net
docker run --name redisapp -p 6379:6379 --network redis-net -v my/data -d redis:alpine redis-server --appendonly yes
```

redis-cli 접속

```
docker run -it --network redis-net --rm redis:alpine redis-cli -h redisapp
or
docker run -it --network redis-net --rm redis:alpine ash
redis-cli -h redis-net
```
