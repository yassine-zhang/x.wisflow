## 私有仓库-registry

在日常使用 Docker 构建、推送、拉取镜像的时候为了隐私以及安全性考虑我们通常会在服务器上部署 registry 镜像容器，它拥有 dockerhub 的基础仓库服务功能。

## 基础部署

### 运行 registry 容器

```bash
$ docker run -d -p 9000:5000 --restart always --name registry registry:2

```

它向外暴露端口 5000，我们可以将其映射到任何一个未占用的主机端口 9000 上。

### 使用雷池 WAF 反向代理域名

![](https://upic.itcox.cn/uPic/SeLklL.jpg)

为了避免推送镜像报 unknown blob 错误问题，需要在雷池 Nginx 自定义配置中添加一行指令：`proxy_redirect http:// https://;`
![](https://upic.itcox.cn/uPic/CnFwQ0.jpg)
注意：此配置在以后无论怎么升级 WAF 都不受影响，不会被重新覆盖。

若您还不懂如何配置 WAF 请参考第 zero 期文档外链，雷池 WAF 是基于智能语义分析的下一代 Web 应用防火墙不让黑客越雷池一步。

## 推送、拉取镜像

我们要在客户端推送镜像到私有仓库，或从私有库拉取镜像之前需要在客户端进行如下配置：(我的私有仓库域名：docker-registry.itcox.cn，端口 80)

```json
// /etc/docker/daemon.json
{
  "insecure-registries": ["http://docker-registry.itcox.cn"]
}
```

当我们在上面 Docker 守护进程配置文件中配置完成之后，需要重启 docker 服务

```bash
$ sudo service docker restart
```

下面我们开始推送镜像，需要注意：镜像名字格式为`<your-registry-domain:port>/<image-name>:<version>`，

> 文章篇幅过长，将不在本文中粘贴输出日志

```bash
# 1. 从当前文件夹查找dockerfile文件，构建并推送 docker-registry.itcox.cn/wisdom-flowapi:latest 镜像
$ docker buildx build --push --platform linux/amd64 -t docker-registry.itcox.cn/wisdom-flowapi:latest .
****
# 2. 修改本地镜像标签，再推送
#   2.(1) 给现有镜像添加新标签
$ docker tag oven/bun:latest docker-registry.itcox.cn/bun:latest

#   2.(2) 删除旧标签
$ docker rmi oven/bun:latest
#   2.(3) 推送带有新标签的镜像
$ docker push docker-registry.itcox.cn/bun:latest
```

拉取镜像：

```bash
$ docker pull docker-registry.itcox.cn/bun:latest
```

## 启用 HTTPS 协议

当我们为私有仓库配置好 ssl 证书之后，即可使用 https 协议访问，届时将不再需要配置守护进程`insecure-registries`

这里推荐一个免费申请证书的网站，点几下就可以申请成功了，我申请了通配符证书`*.itcox.cn`

> 🔥httpsok 一行命令，轻松搞定 SSL 证书自动续签。
>
> https://httpsok.com/?p=4n8v
>
> 支持：nginx、通配符证书、七牛云、腾讯云、阿里云、CDN、OSS、LB（负载均衡）

还是打开雷池面板，先将申请的 ssl 证书上传到雷池上来，再配置一下原来 docker-registry.itcox.cn 的站点 ssl 证书。
![](https://upic.itcox.cn/uPic/bN9fLX.jpg)
![](https://upic.itcox.cn/uPic/BBtORW.jpg)

## 配置 htpasswd

虽然我们配置了 https 协议，但是目前仍然存在一个问题，就是任何人都可以推送拉取咱们得仓库镜像，这样很不安全，registry 预留给了我们配置 htpasswd 的入口，配置文件在容器内`/etc/docker/registry/config.yml`

运行 xmartlabs/htpasswd 容器生成 htpasswd 文件

```bash
$ docker run --rm -ti xmartlabs/htpasswd <username> <password> > htpasswd
```

更改配置文件：

```yml
# config.yml
version: 0.1
log:
  fields:
    service: registry
storage:
  cache:
    blobdescriptor: inmemory
  filesystem:
    rootdirectory: /var/lib/registry
http:
  addr: :5000
  headers:
    X-Content-Type-Options: [nosniff]
health:
  storagedriver:
    enabled: true
    interval: 10s
    threshold: 3
# 新增配置
auth:
  htpasswd:
    realm: basic-realm
    path: /etc/docker/registry/htpasswd
```

重启 registry 容器：

```bash
$ docker restart registry
```

## docker login

现在配置好 htpasswd，我们重新拉取镜像，会发现证书验证不通过：

```bash
$ docker pull docker-registry.itcox.cn/bun:latest
# 输出示例:no basic auth credentials
Using default tag: latest
Error response from daemon: Head "https://docker.ken.io/v2/kentalk/helloworld/manifests/latest": no basic auth credentials
```

我们只有登录之后才能正常拉取推送镜像：

```bash
$ docker login docker-registry.itcox.cn
Username: yassine
Password:
WARNING! Your password will be stored unencrypted in /root/.docker/config.json.
Configure a credential helper to remove this warning. See
https://docs.docker.com/engine/reference/commandline/login/#credentials-store

Login Succeeded

# 重新拉取镜像
$ docker pull docker-registry.itcox.cn/bun:latest
latest: Pulling from bun
5d8903d6126c: Pull complete
951f2fa632d6: Pull complete
df2a73242bc6: Pull complete
985f32342bb7: Pull complete
1dec324680ec: Pull complete
Digest: sha256:eccbbd997da8c23495987cbc586c2471023db083afda1a9f8cf4a2f58a265426
Status: Downloaded newer image for docker-registry.itcox.cn/bun:latest
docker-registry.itcox.cn/bun:latest
```
