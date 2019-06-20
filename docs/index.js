const img = document.getElementById('image')

document.getElementById('button').onclick = function () {
  var cropper = new window.H5Cropper(img.src, function (base64) {
    img.src = base64
  })
}