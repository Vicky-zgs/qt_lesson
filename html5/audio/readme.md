# 将音频可视化知识点
- requestAnimationFrame() 
  做动画用这个api
- audio 的属性 visibility: hidden;  不可见但是dom结构还在
- AudioContext接口表示由音频模块连接而成的音频处理图，每个模块对应一个        AudioNode(官方文档)
- createAnalyser()方法创建一个analyserNode,可用来获取音频时间和频率数据,    以及实现数据可视化