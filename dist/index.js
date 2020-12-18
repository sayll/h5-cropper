"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
require("cropperjs/dist/cropper.css");
var CropperJS = require('cropperjs');
var key = 0;
function getUuid() {
    key += 1;
    return key;
}
var H5Cropper = /** @class */ (function () {
    function H5Cropper(image, callback, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        // 销毁裁剪器
        this.handleCancel = function () {
            _this.cropper.destroy();
            document.getElementById(_this.bntResetId).removeEventListener('click', _this.handleReset);
            document.getElementById(_this.bntOkId).removeEventListener('click', _this.handleOk);
            document.getElementById(_this.bntCancelId).removeEventListener('click', _this.handleCancel);
            document.body.removeChild(_this.root);
        };
        // 重置裁剪器
        this.handleReset = function () {
            _this.cropper.reset();
        };
        // 确定按钮，返回图片base64
        this.handleOk = function () {
            _this.callback && _this.callback(_this.cropper.getCroppedCanvas({ maxWidth: 720 }).toDataURL('image/jpeg', .9), _this);
            _this.handleCancel();
        };
        // 旋转图片
        this.handleRotate = function () {
            _this.cropper.rotate(90);
        };
        // 初始化裁剪器节点
        this.id = "m-cropper-" + getUuid();
        this.bntCancelId = this.id + '-cancel';
        this.bntResetId = this.id + '-reset';
        this.bntOkId = this.id + '-ok';
        this.bntRotateId = this.id + '-rotate';
        this.callback = callback;
        this.root = document.createElement('div');
        this.root.setAttribute('class', 'h5-cropper');
        this.root.setAttribute('style', 'opacity: 0; transition: all .4s;');
        this.root.innerHTML = "<div class='container' style=\"position: absolute;top: 0;left: 0;right: 0;bottom: 0;z-index: 1000;\">\n      <div class='content' style=\"position: absolute;top: 0;left: 0;right: 0;bottom: 5.3em;z-index: 1000; overflow: hidden;\">\n        <img id=\"" + this.id + "\" src=\"" + image + "\" alt=\"image\">\n      </div>\n      <div class='footer' style=\"\n        position: absolute;left: 0;right: 0;bottom: 0;font-size: 1.3em;\n        display: flex;justify-content: space-between;\n        padding: 1.5em 1em;background: #232323;\"\n      >\n        <a href=\"javascript:;\" id=" + this.bntRotateId + " style=\"position: absolute; top: -2em; color: #fff; text-decoration: none; z-index: 1000;\">\n          <svg version=\"1.1\" width=\"1.5em\" id=\"Capa_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\"\n            y=\"0px\"\n            viewBox=\"0 0 393.382 393.382\" style=\"enable-background:new 0 0 393.382 393.382;\" xml:space=\"preserve\">\n            <path style=\"fill:#fff;\" d=\"M192.411,371.663H48.103C21.379,371.663,0,350.284,0,323.561V179.252\n            c0-26.724,21.379-48.103,48.103-48.103h144.308c26.724,0,48.103,21.379,48.103,48.103v144.308\n            C240.514,350.284,219.135,371.663,192.411,371.663z M48.103,163.218c-8.552,0-16.034,7.483-16.034,16.034v144.308\n            c0,8.552,7.483,16.034,16.034,16.034h144.308c8.552,0,16.034-7.483,16.034-16.034V179.252c0-8.552-7.483-16.034-16.034-16.034\n            H48.103z\"/>\n            <path style=\"fill:#fff;\" d=\"M321.754,266.906c-3.207,0-5.345-1.069-8.552-2.138c-7.483-4.276-9.621-14.965-5.345-22.448\n            c31-48.103,23.517-111.171-17.103-151.791S188.135,42.427,138.964,73.426c-7.483,4.276-17.103,2.138-22.448-5.345\n            c-4.276-7.483-2.138-17.103,5.345-22.448c60.93-38.482,140.032-29.931,191.342,21.379c51.31,51.31,59.861,129.343,21.379,191.342\n            C331.374,263.699,327.099,266.906,321.754,266.906z\"/>\n            <path style=\"fill:#fff;\" d=\"M315.34,287.216c-6.414,0-12.827-4.276-14.965-9.621l-25.655-61.999\n            c-3.207-8.552,1.069-17.103,8.552-21.379c8.552-3.207,17.103,1.069,21.379,8.552l19.241,47.034l47.034-19.241\n            c8.552-3.207,17.103,1.069,21.379,8.552c3.207,8.552-1.069,17.103-8.552,21.379l-61.999,25.655\n            C319.616,287.216,317.478,287.216,315.34,287.216z\"/>\n            </svg>\n        </a>\n        <a href=\"javascript:;\" id=" + this.bntCancelId + " style=\"color: #fff; text-decoration: none;\">\u53D6\u6D88</a>\n        <a href=\"javascript:;\" id=" + this.bntResetId + " style=\"color: #fff; text-decoration: none;\">\u8FD8\u539F</a>\n        <a href=\"javascript:;\" id=" + this.bntOkId + " style=\"color: #fff; text-decoration: none;\">\u5B8C\u6210</a>\n      </div>\n    </div>";
        document.body.appendChild(this.root);
        // 初始化裁剪器
        this.init(document.getElementById(this.id), callback, options);
        document.getElementById(this.bntRotateId).addEventListener('click', this.handleRotate);
        document.getElementById(this.bntCancelId).addEventListener('click', this.handleCancel);
        document.getElementById(this.bntResetId).addEventListener('click', this.handleReset);
        document.getElementById(this.bntOkId).addEventListener('click', this.handleOk);
    }
    H5Cropper.prototype.init = function ($image, callback, options) {
        var _this = this;
        this.cropper = new CropperJS($image, __assign(__assign({ viewMode: 1, cropBoxResizable: true, minCropBoxWidth: 100, dragMode: 'move', highlight: false, 
            // aspectRatio: 5 / 7,
            center: false, zoomOnTouch: false }, options), { ready: function (event) {
                _this.root.setAttribute('style', 'opacity: 1; transition: all .4s;');
                options.read && options.read(event);
            } }));
    };
    return H5Cropper;
}());
window['H5Cropper'] = H5Cropper;
exports.default = H5Cropper;
//# sourceMappingURL=index.js.map