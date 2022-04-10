const fs = require('fs');

const findAllFiles = (dir, files = []) => {
    fs
        .readdirSync(dir)
        .forEach(file => {
            const filePath = `${dir}/${file}`;
            if (fs.statSync(filePath).isDirectory()) {
                findAllFiles(filePath, files);
            } else {
                files.push(filePath);
            }
        });
    return files;
};

const list = findAllFiles('./docs')
    .filter(file => file.endsWith('.html'))
    .forEach(file => {
        const content = fs.readFileSync(file, 'utf8')
            .replaceAll("'css/", "'/css/")
            .replaceAll('"css/', '"/css/')
            .replaceAll("'images/", "'/images/")
            .replaceAll('"images/', '"/images/')
            .replaceAll("'js/", "'/js/")
            .replaceAll('"js/', '"/js/');

        fs.writeFileSync(file, content);
    });