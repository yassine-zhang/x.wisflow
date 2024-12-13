## 提交信息内容过杂

如下图所示，是我推送到 github 的信息，当提交的信息过于细碎时可以按照这个格式写。

> git commit -m "12.9 Summary..."
>
> git commit --amend # --amend 参数修改最近一次提交信息的内容

![](https://upic.itcox.cn/uPic/gGhNVP.jpg)

## Commit message 格式

为了方便使用，我们避免了过于复杂的规定，格式较为简单且不限制中英文：

```
 <type>(<scope>): <subject>
// 注意冒号 : 后有空格
// 如 feat(miniprogram): 增加了小程序模板消息相关功能
```

**scope 选填**表示 commit 的作用范围，如数据层、视图层，也可以是目录名称
**subject 必填**用于对 commit 进行简短的描述
**type 必填**表示提交类型，值有以下几种：

- feat - 新功能 feature
- fix - 修复 bug
- docs - 文档注释
- style - 代码格式(不影响代码运行的变动)
- refactor - 重构、优化(既不增加新功能，也不是修复 bug)
- perf - 性能优化
- test - 增加测试
- chore - 构建过程或辅助工具的变动
- revert - 回退
- build - 打包

## 参考文献

https://juejin.cn/post/6844903793033756680
