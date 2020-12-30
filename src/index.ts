import 'cropperjs/dist/cropper.css'
const CropperJS = require('cropperjs')

let key = 0
function getUuid() {
  key += 1
  return key
}

class H5Cropper {
  constructor(image: string, callback?: Function, options: any = {}) {
    // 初始化裁剪器节点
    this.id = `m-cropper-${getUuid()}`
    this.bntCancelId = this.id + '-cancel'
    this.bntResetId = this.id + '-reset'
    this.bntOkId = this.id + '-ok'
    this.bntRotateId = this.id+'-rotate'
    this.callback = callback

    this.root = document.createElement('div')
    this.root.setAttribute('class', 'h5-cropper')
    this.root.setAttribute('style', 'opacity: 0; transition: all .4s;')
    this.root.innerHTML = `<div class='container' style="position: absolute;top: 0;left: 0;right: 0;bottom: 0;z-index: 1000;">
      <div class='content' style="position: absolute;top: 0;left: 0;right: 0;bottom: 5.3em;z-index: 1000; overflow: hidden;">
        <img id="${this.id}" src="${image}" alt="image">
      </div>
      <div class='footer' style="
        position: absolute;left: 0;right: 0;bottom: 0;font-size: 1.3em;
        display: flex;justify-content: space-between;
        padding: 1.5em 1em;background: #232323;"
      >
        <a href="javascript:;" id=${this.bntRotateId} style="position: absolute; top: -2em; color: #fff; text-decoration: none; z-index: 1000;">
          <svg version="1.1" width="1.5em" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
            y="0px"
            viewBox="0 0 393.382 393.382" style="enable-background:new 0 0 393.382 393.382;" xml:space="preserve">
            <path style="fill:#fff;" d="M192.411,371.663H48.103C21.379,371.663,0,350.284,0,323.561V179.252
            c0-26.724,21.379-48.103,48.103-48.103h144.308c26.724,0,48.103,21.379,48.103,48.103v144.308
            C240.514,350.284,219.135,371.663,192.411,371.663z M48.103,163.218c-8.552,0-16.034,7.483-16.034,16.034v144.308
            c0,8.552,7.483,16.034,16.034,16.034h144.308c8.552,0,16.034-7.483,16.034-16.034V179.252c0-8.552-7.483-16.034-16.034-16.034
            H48.103z"/>
            <path style="fill:#fff;" d="M321.754,266.906c-3.207,0-5.345-1.069-8.552-2.138c-7.483-4.276-9.621-14.965-5.345-22.448
            c31-48.103,23.517-111.171-17.103-151.791S188.135,42.427,138.964,73.426c-7.483,4.276-17.103,2.138-22.448-5.345
            c-4.276-7.483-2.138-17.103,5.345-22.448c60.93-38.482,140.032-29.931,191.342,21.379c51.31,51.31,59.861,129.343,21.379,191.342
            C331.374,263.699,327.099,266.906,321.754,266.906z"/>
            <path style="fill:#fff;" d="M315.34,287.216c-6.414,0-12.827-4.276-14.965-9.621l-25.655-61.999
            c-3.207-8.552,1.069-17.103,8.552-21.379c8.552-3.207,17.103,1.069,21.379,8.552l19.241,47.034l47.034-19.241
            c8.552-3.207,17.103,1.069,21.379,8.552c3.207,8.552-1.069,17.103-8.552,21.379l-61.999,25.655
            C319.616,287.216,317.478,287.216,315.34,287.216z"/>
            </svg>
        </a>
        <a href="javascript:;" id=${this.bntCancelId} style="color: #fff; text-decoration: none;">取消</a>
        <a href="javascript:;" id=${this.bntResetId} style="color: #fff; text-decoration: none;">还原</a>
        <a href="javascript:;" id=${this.bntOkId} style="color: #fff; text-decoration: none;">完成</a>
      </div>
    </div>`
    document.body.appendChild(this.root)

    // 初始化裁剪器
    this.init(document.getElementById(this.id), callback, options)
    document.getElementById(this.bntRotateId).addEventListener('click', this.handleRotate)
    document.getElementById(this.bntCancelId).addEventListener('click', this.handleCancel)
    document.getElementById(this.bntResetId).addEventListener('click', this.handleReset)
    document.getElementById(this.bntOkId).addEventListener('click', this.handleOk)
  }

  cropper: CropperJS
  root: HTMLDivElement // 创建的根节点
  id: string // 图片 img id
  bntCancelId: string // 取消操作按钮 id
  bntResetId: string // 还原操作按钮 id
  bntOkId: string // 确定操作按钮 id
  bntRotateId: string // 旋转操作按钮 id
  callback?:Function // 最终回调

  init($image, callback, options) {
    this.cropper = new CropperJS($image, {
      viewMode: 1,
      cropBoxResizable: true, // 可调整裁剪框
      minCropBoxWidth: 100,
      dragMode: 'move',
      highlight: false,
      // aspectRatio: 5 / 7,
      center: false,
      zoomOnTouch: false,
      ...options,
      ready: (event) => {
        this.root.setAttribute('style', 'opacity: 1; transition: all .4s;')
        options.read && options.read(event)
      }
    })
  }

  // 销毁裁剪器
  handleCancel = () => {
    this.cropper.destroy()
    document.getElementById(this.bntResetId).removeEventListener('click', this.handleReset)
    document.getElementById(this.bntOkId).removeEventListener('click', this.handleOk)
    document.getElementById(this.bntCancelId).removeEventListener('click', this.handleCancel)
    document.body.removeChild(this.root)
  }

  // 重置裁剪器
  handleReset = () => {
    this.cropper.reset()
  }

  // 确定按钮，返回图片base64
  handleOk = () => {
    this.callback && this.callback(this.cropper.getCroppedCanvas({}).toDataURL('image/jpeg', .9), this)
    this.handleCancel()
  }

  // 旋转图片
  handleRotate = () => {
    this.cropper.rotate(90)
  }
}

window['H5Cropper'] = H5Cropper

export default H5Cropper
