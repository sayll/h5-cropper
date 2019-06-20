# h5-cropper
移动端图片裁剪器，基于 `cropperjs` 制作的简单裁剪器

## 案例演示
HTML部分：
```html
<!DOCTYPE html>
<html lang="cn">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" />
  <title>裁剪案例</title>
</head>
<script src="./h5-cropper.js"></script>
<body style="font-size: 14px">
  <img id="image" src="http://placekitten.com/g/720/400" width="100%" alt="">
  <div>
    <button style="width: 100%; font-size: 18px;" id="button">开始裁剪</button>
  </div>
</body>
<script src="./index.js"></script>
</html>
```

JS部分：
```javascript
const img = document.getElementById('image')

document.getElementById('button').onclick = function () {
  var cropper = new window.H5Cropper(img.src, function (base64) {
    img.src = base64
  })
}
```

演示案例：[https://sayll.github.io/h5-cropper/index.html](https://sayll.github.io/h5-cropper/index.html)
> 手机模式查看，效果更佳。

## 使用方式

### 直接下载使用
通过下载,直接引用`dist/index.js`,通过全局的`window`对象访问。
```javascript
const cropper = new window.H5Cropper('http://placekitten.com/g/300/200', function (base64) {
  // to do something
  console.log(base64)
})
```

### npm 下载使用
下载方式：
```
npm i -S h5-cropper
```

使用方式：
```javascript
import H5Cropper from 'h5-cropper'
const cropper = new H5Cropper('http://placekitten.com/g/300/200', function (base64) {
  // to do something
  console.log(base64)
})
```

## 接口定义
调用方式：
```typescript
new H5Cropper(url: string, callback?: (data64: string) => any, options?: CropperjsOptions)
```

|参数|描述|
|----|----|
|url|图片地址或base64|
|callback|裁剪完成后的回调函数，接收最终的图片base64|
|options|一些高级配置，详细请查看插件[Cropperjs](https://github.com/fengyuanchen/cropperjs#options)|
