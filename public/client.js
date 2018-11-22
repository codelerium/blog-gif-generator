window.GIF = function(selector, width, height, frames) {
    this.width = width || 800;
    this.height = height || 600;
    this.canvas = document.querySelector(selector);
    this.frames = frames;
    this.index = 0;

    this.sendImage = function (fileName, cb) {
        this.canvas.toBlob((blob) => {
            this.index++;
            var data = new FormData();
            var name = fileName + '-' + this.index.toString().padStart(4, "0") + '.png'
            data.append(name, blob);

            if (this.frames === this.index) {
                cb({ done: true });
                return;
            }

            fetch('http://localhost:3030/data', {
                method: 'POST',
                body: data,
            }).then((res) => {
                return res.json();
            }).then((res) => {
                cb && cb(res);
            });
        });
    }
}