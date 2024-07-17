# wdon-app

## Config host resolve in linux

if run on linux, first setting resolve config

```sh
  sudo nano /etc/hosts
```

add to file

```text
  172.17.0.1      host.docker.internal
```

## Add default avatar and headImage

create folder `uploads/default` and add 2 images for avatar and headImage. Then change `src/utils/config/media.ts` in default to correct name.
