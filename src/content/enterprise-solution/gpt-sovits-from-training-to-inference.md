# 1. 前言

GPT-SoVITS 是一种基于 AI 技术的工具，主要应用于 语音转换（Voice Conversion, VC） 场景。具体来说，它结合了 GPT 的文本处理能力和 SoVITS（Soft Voice Identity Transfer System） 的语音转换技术，用于高质量的语音合成和特定声音风格的转换。

您可以先看[GPT-SoVITS 仓库及算力平台分享](#GPT-SoVITS仓库及算力平台分享)部分以开始训练并推理使用。

# 2. 注册创建实例

<p style="color: orange" >建议：请不要用腾讯浏览器打开</p>
注册步骤不再演示。

在社区镜像中找到“GPT-SoVITS@kiss 丿冷鸟鸟”，打开之后选择实例配置如下所示，创建实例之后即可正常运行。
![](https://upic.itcox.cn/uPic/s7jZZ7.jpg)

# 3. 准备数据集

请认真准备数据集！以免后面出现各种报错，和炼出不理想的模型！好的数据集是炼出好的模型的基础！

## 3.1 上传音频

控制台点击 JupyterLab，进入操作页面。
首先双击打开 GPT-SoVITS(使用）.ipynb 这个文件。然后打开 workdir/GPT-SoVITS/input 文件夹上传原音频
![](https://upic.itcox.cn/uPic/tzkJGr.jpg)

## 3.2 打开 WebUI

选中前两个代码行之后点击上方运行，首先会将 GPT-SoVITS 工作目录移动到数据盘，以免训练时系统盘不够，之后运行 WebUI 的项目，向外暴露一个公网链接，提供给我们点击。
![](https://upic.itcox.cn/uPic/W8df73.jpg)

运行之后出现如下日志示例：
![](https://upic.itcox.cn/uPic/NQ2hW8.jpg)

## 3.3 UVR5 提取人声

_UVR5 提取人声可以将 伴奏&混响&回声 去除，保留主人声。_
有报错？报错原因一般是音频太短了，导致音频缓冲区爆了。也有一些是因为显卡性能不够的。

### 3.3.1 方法 1：使用自带的 UVR5 处理音频

点击开启 UVR5-WebUI，回到终端，点最下面那个链接就会自动跳转 UVR5 的页面。
![](https://upic.itcox.cn/uPic/TTWdAP.jpg)

![](https://upic.itcox.cn/uPic/awlaK7.jpg)

如果你前面按教程把文件放进了 input 那么就不需要再去修改路径了，直接选择模型转换。

官网推荐的最干净的配置是先 MDX-Net 再 DeEcho-Aggressive。

> 意思是输入音频文件位置保持不变，导出文件格式选择 WAV，依次选择 MDX-Net 再 DeEcho-Aggressive 模型进行转换。处理完的音频（vocal）的是人声，(instrument)是伴奏，记得把 instrument 删掉。结束后记得到 WebUI 关闭 UVR5 节省显存。

### 3.3.2 方法 2： 在本地电脑使用 UVR5 客户端（没有 bug，可能性能需求会更高点）

安装包下载地址：https://github.com/Anjok07/ultimatevocalremovergui/releases
Mac 端使用教程：[【【音频分离提取】免费开源 MAC 版 UVR5 使用教程分享】)](https://www.bilibili.com/video/BV1an4y1X7qf/?share_source=copy_web&vd_source=648919bf22d99600499a3af3c4fd0aea)

Mac 用户安装风险解决（无法打开“Ultimate Vocal Remover”，因为 Apple 无法检查其是否包含恶意软件。）
![](https://upic.itcox.cn/uPic/yaqgCK.jpg)

### 3.3.3 方法 3：去杂音在线网站推荐

每日免费一次，效果还可：https://myedit.online/cn/audio-editor/remove-background-noise-from-audio
效果很顶，价格很高：https://www.lalal.ai/zh-hans/voice-cleaner/

## 3.4 切分

<p style="color: orange" >在切割音频前建议把所有音频拖进音频软件（如au、剪映）调整音量，将音量调整至-9dB到-6dB，过高的删除</p>

![](https://upic.itcox.cn/uPic/aKN8iz.jpg)

> 切分完后文件在 GPT-SoVITS\output\slicer_opt。打开切分文件夹，排序方式选大小，将时长超过 显存数 秒的音频手动切分至 显存数 秒以下。比如显卡是 4090 显存是 24g，那么就要将超过 24 秒的音频手动切分至 24s 以下，音频时长太长的会爆显存。如果语音切割后还是一个文件，那是因为音频太密集了。可以调低 min_interval，实在不行用 au 手动切分。

## 3.5 打标

### 3.5.1 标注

![](https://upic.itcox.cn/uPic/K0H8E6.jpg)
![](https://upic.itcox.cn/uPic/EMXyW4.jpg)

### 3.5.2：校对（这步比较费时间，可以跳过）

默认 list 标注文件的路径可以不用改，勾选开启打标 WebUI
![](https://upic.itcox.cn/uPic/yUiKt2.jpg)

_进入 WebU 几处详细介绍参考：_

- 打开后就是 SubFix，从左往右从上到下依次意思是：跳转页码、保存修改、合并音频、删除音频、上一页、下一页、分割音频、保存文件、反向选择。每一页修改完都要点一下保存修改（Submit Text）；
- 如果没保存就翻页那么会重置文本，在完成退出前要点保存文件（Save File），做任何其他操作前最好先点一下保存修改（Submit Text）；
- 合并音频和分割音频不建议使用，精度非常差，一堆 bug；
- 删除音频先要点击要删除的音频右边的 yes，再点删除音频（Delete Audio）；
- 删除完后文件夹中的音频不会删除但标注已经删除了，不会加入训练集的；

![](https://upic.itcox.cn/uPic/zbixs0.jpg)

# 4 训练

## 4.1 输出 logs

<p style="color: orange" >填实验名也就是模型名称，不能有中文！默认路径都不用改。直接点一键三连等结束就好了。</p>
如果有报错会在终端呈现，如果是英语或日语的话logs里的3-bert文件夹是空的，是正常的不用管。

![](https://upic.itcox.cn/uPic/qkNLzT.jpg)

## 4.2 微调训练

_注意点：_

1. 设置 batch*size，建议 batch_size 设置为显存的一半，高了会爆显存。\_bs 并不是越高越快！*
2. 设置轮数，SoVITS 模型轮数可以设置的高一点，反正训练的很快。GPT 模型轮数千万不能高于 20（一般情况下）建议设置 10。然后先点开启 SoVITS 训练，
3. 训练完后再点开启 GPT 训练，不可以一起训练（除非你有两张卡）！如果中途中断了，直接再点开始训练就好了，会从最近的保存点开始训练。
4. 爆显存了就调低 bs。或者存在过长的音频，需要回到 2~4 步重新制作数据集。
5. 训练完成会显示训练完成，并且控制台显示的轮数停在设置的（总轮数-1）的轮数上。

![](https://upic.itcox.cn/uPic/VWx7rY.jpg)

_0213 版本更新：_

1. 在 0213 版本之后添加了 dpo 训练。dpo 大幅提升了模型的效果，几乎不会吞字和复读，能够推理的字数也翻了几倍，但同时训练时显存占用多了 2 倍多，训练速度慢了 4 倍，12g 以下显卡无法训练。
2. 数据集质量要求也高了很多。如果数据集有杂音，有混响，音质差，不校对标注，那么会有负面效果。
3. 如果你的显卡大于 12g，且数据集质量较好，且愿意等待漫长的训练时间，那么可以开启 dpo 训练。否则请不要开启。

![](https://upic.itcox.cn/uPic/zwBGKx.jpg)

# 5. 推理

## 5.1 开启推理界面

先刷新模型路径，下拉选择模型推理，e 代表轮数，s 代表步数。不是轮数越高越好。选择好模型点开启 TTS 推理，还是点终端中最下面的链接。

请严格区分轮数 (Epoch) 和步数 (Step)：1 个 Epoch 代表训练集中的所有样本都参与了一次学习，1 Step 代表进行了一步学习，由于 batch size 的存在，每步学习可以含有数条样本，因此，Epoch 和 Step 的换算如下：

$Epoch = \frac{Step}{(数据集条数{\div} batch\_size)}$

![](https://upic.itcox.cn/uPic/zka0Db.jpg)

## 5.2 开始推理

回到终端点最下面的链接
![](https://upic.itcox.cn/uPic/2IaCEG.jpg)

最上面可以切换模型，在刚练完挑模型的时候很重要
![](https://upic.itcox.cn/uPic/imaAaI.jpg)

1. <p style="color: orange" >上传一段参考音频，建议是数据集中的音频。最好5秒。参考音频很重要！会学习语速和语气，请认真选择。</p>
2. 接着就是输入要合成的文本了，注意语种要对应。目前可以中英混合，语种选择中文，日英混合，语种选择日文。
3. 切分建议无脑选 50 字一切，低于 50 字的不会切。如果 50 字一切报错的话就是显存太小了可以按句号切。如果不切，显存越大能合成的越多，实测 4090 大约 1000 字，但已经胡言乱语了，所以哪怕你是 4090 也建议切分生成。
4. 合成的过长很容易胡言乱语。如果出现吞字，重复，参考音频混入的情况，这是正常现象。不是模型炼差了，不用为模型担心。改善的方法有使用较低轮数的 GPT 模型、合成文本再短点、换参考音频。官方也在努力修复这个问题。

# 6. 下载模型到本地

先把#打开 webui 这个代码暂停
![](https://upic.itcox.cn/uPic/uOQJpu.jpg)

然后运行打包模型这个代码，在 GPT-SoVITS 这个文件夹就会有模型的压缩包，右键下载到本地
![](https://upic.itcox.cn/uPic/QRY8cR.jpg)

# 7. 关机

千万要记得关机，不然余额马上会被扣光，回到控制台点删除实例就好了。
![](https://upic.itcox.cn/uPic/g3SQq8.jpg)

# 8.本地推理

将 GPT 模型（ckpt 后缀）放入 GPT_weights 文件夹，SoVITS 模型（pth 后缀）放入 SoVITS_weights 文件夹，刷新下模型就能选择模型推理了。

# 关于变声部分

目前官方还没做完，每个人打开都是【施工中，请静候佳音】。不是缺文件了，就是还没做好。敬请期待吧

# GPT-SoVITS 仓库及算力平台分享

> 在本篇文章中，我们使用 [算力互联](https://www.casdao.com/) 平台创建实例来训练数据。
> Github 仓库：https://github.com/RVC-Boss/GPT-SoVITS
>
> <p style="color: orange" > 限时活动：注册即可享受20元抵扣50元算力体验金，活动时间：2024年7月1日0点至2024年9月30日24点</p>

# 常见问题：

1. 如果我在训练途中想追加一些数据集该怎么办呢？

   > 需要重新预处理并重新开始训练

2. 推理的时候等的时间好久，几分钟的音频几十分钟还没转换完是正常的吗？
   > 如果控制台一直没反应那就是 gradio 抽风了，根本没在跑，白等了。建议重启并且把文本变短点。只要控制台在动就是在跑，太长的文本要跑好几分钟，慢慢等吧。

其他问题： [报错合集](https://www.yuque.com/baicaigongchang1145haoyuangong/ib3g1e/pgah3gvetrdy8ryt?singleDoc#)里有部分报错的解决方法，也可以去 github 看看有没有人提问，或者发起提问。复制报错信息去问 ChatGPT 也是一种好方法。
