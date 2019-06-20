# h5-cropper

## 案例演示
[https://sayll.github.io/h5-cropper/index.html](https://sayll.github.io/h5-cropper/index.html)
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
