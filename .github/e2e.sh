#!/usr/bin/env bash
set -e

function finish() {
  echo "Stopping $container"
  docker stop "$container"
  #echo "Stopping $test_container"
  #docker stop "$test_container"
}

trap finish EXIT

container=$(docker run -d "liberoadmin/article-hosting:${IMAGE_TAG}")

timeout --foreground 10 bash << EOT
  while true; do
    current=\$(docker inspect "${container}" | jq -r '.[0].State.Health.Status')
    echo "${container} is in state: \${current}"
    if [ "\$current" == "healthy" ]; then
        break
    fi
    sleep 1
  done
EOT

curr_dir=$(pwd)

#test_container=$(docker run -d -v $curr_dir/e2e/reports:/app/reports -v $curr_dir/e2e/screenshots:/app/screenshots article-hosting-test-framework:latest) 
docker run -d -v $curr_dir/e2e/reports:/app/reports -v $curr_dir/e2e/screenshots:/app/screenshots article-hosting-test-framework:latest