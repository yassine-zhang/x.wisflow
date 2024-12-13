## 1. 安装 Nginx

```bash
# 在宿主机创建用于挂载的目录文件
# 创建www目录
mkdir -p /server/nginx/html
# 创建日志目录
mkdir -p /server/nginx/logs
# 创建配置目录
mkdir -p /server/nginx/conf
# 创建cert目录
mkdir -p /server/nginx/cert

# 运行Nginx容器并映射容器目录，若你本地没有nginx镜像则会先拉取。
$ docker run -d -p 80:80 -p 443:443 --name nginx-1 \
  -v /server/nginx/html:/usr/share/nginx/html \
  -v /server/nginx/conf/nginx.conf:/etc/nginx/nginx.conf \
  -v /server/nginx/logs:/var/log/nginx \
  -v /server/nginx/cert:/etc/nginx/cert \
  --restart=always \
  nginx:latest
```

## 2. 申请 ssl 证书

可以在阿里云，腾讯云等大厂云平台申请免费 20 张的单域名证书，但就在 23 年 11 月份，所有厂商 SSL 证书有效期缩短至 90 天，如果你有 3 个域名，本来一年只需要申请 3 次，现在就要申请 12 次，这真的很麻烦。

不过我们仍然不需要担心，我也找到了一个单用户可以免费申请 5 张通配符域名的网站，付费也很划算，99/年 开通高级版可以申请 100 张 30 天的通配符证书。

什么是通配符证书？如果我们申请了一张\*.example.com 的证书，那么我们可以将其用在任何二级域名上，就像：blogs.example.com、video.example.com、oss.example.com，etc.

网站名称: httpsok，如果觉得有帮助，还请您不吝填入我的邀请码，点击下方链接前去注册。

> 🔥httpsok 一行命令，轻松搞定 SSL 证书自动续签。
>
> https://httpsok.com/?p=4n8v
>
> 支持：nginx、通配符证书、七牛云、腾讯云、阿里云、CDN、OSS、LB（负载均衡）

申请完成之后将 pem 证书文件和 key 私钥传到`/server/nginx/cert`文件夹下即可。

## 3. 配置反向代理

打开配置文件：

```bash
$ vim /server/nginx/config/nginx.config
```

添加如下配置：

```nginx
server {
    listen 443 ssl;  # 监听 443 端口，并启用 SSL 加密
    server_name 这里输入购买的域名;
    ssl_certificate 这里输入证书文件路径;
    ssl_certificate_key 这里输入私钥文件路径;
    ssl_session_cache shared:le_nginx_SSL:1m;  # 配置 SSL 会话缓存
    ssl_session_timeout 1440m;  # SSL 会话超时时间设为 1440 分钟
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3;  # 启用的 TLS 协议版本
    ssl_prefer_server_ciphers on;  # 优先使用服务器端的加密套件
    ssl_ciphers TLS13-AES-256-GCM-SHA384:TLS13-CHACHA20-POLY1305-SHA256:TLS13-AES-128-GCM-SHA256:TLS13-AES-128-CCM-8-SHA256:TLS13-AES-128-CCM-SHA256:EECDH+CHACHA20:EECDH+CHACHA20-draft:EECDH+ECDSA+AES128:EECDH+aRSA+AES128:RSA+AES128:EECDH+ECDSA+AES256:EECDH+aRSA+AES256:RSA+AES256:EECDH+ECDSA+3DES:EECDH+aRSA+3DES:RSA+3DES:!MD5;  # 支持的加密套件，按优先级顺序排列
    location / {
        proxy_pass 这里输入要代理的api服务站点，带上协议，例如：https://api.example.com/;
        proxy_ssl_server_name on;  # 启用 SNI，用于指定的主机名
        proxy_set_header Host 这里输入api服务站点域名，例如api.example.com;
        proxy_set_header Connection '';  # 清空 Connection 头
        proxy_http_version 1.1;
        chunked_transfer_encoding off;  # 关闭分块传输编码
        proxy_buffering off;  # 关闭代理缓冲
        proxy_cache off;  # 关闭代理缓存
        proxy_set_header X-Forwarded-For $remote_addr;  # 转发客户端的 IP 地址
        proxy_set_header X-Forwarded-Proto $scheme;  # 转发客户端的协议（HTTP 或 HTTPS）
    }
}
```

## 4. 请求测试

```bash
$ curl https://example.com
{"result":"ok"}%
```
