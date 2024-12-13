## 案例相关信息

网站：https://voidzero.dev/， Even You 的创业公司

效果图：
![](https://upic.itcox.cn/uPic/vA5Et5.jpg)

可以看到他的背景有种黑里透白的感觉，而且文字也都采用了 linear-gradient，尽显高级感。

## CSS 相关代码

### 背景部分

```css
background: linear-gradient(145deg, #0d0d0d, #1a1a1a 40%, #262626, #0a0a0a);
position: relative;
font-size: 16px;
```

### 文字部分

> 这部分是将背景当做文字颜色来实现的。默认宽度时 720px，当用户屏幕宽度小于此宽度时，以 375px 为设计稿大小，max-width 减去 100px，就是文字显示的实际宽度。

```css
background: linear-gradient(134deg, #c8c8c8, #fff 25%, #fff 75%, #777);
background-clip: text;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
width: 720px;
max-width: calc(100% - 100px);
```
