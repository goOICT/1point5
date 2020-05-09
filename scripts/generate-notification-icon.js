const fs = require('fs');
(function () {
    const dir = './platforms/android/app/src/main/res/drawable';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    fs.createReadStream('./public/notification.png')
        .pipe(fs.createWriteStream(dir + '/notification.png'));
    console.log('done');
})();
