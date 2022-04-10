const fs = require('fs');
const fse = require('fs-extra');

// find the project
let [,, srcDirName] = process.argv;
if (!srcDirName) {
    const dirs = fs.readdirSync('./data');
    if (dirs.length > 1) {
        console.log('Please specify the project name');
        process.exit(1);
    }
    srcDirName = dirs[0];
}
const srcPath = `./data/${srcDirName}`;
const resultPath = './docs';

// copy base files
[
    'css',
    'images',
    'js',
    '404.html',
    'robots.txt',
    'sitemap.xml'
].forEach(file => {
    fse.copySync(`${srcPath}/${file}`, `${resultPath}/${file}`, {
        overwrite: true
    });
});


const htaccess = fs.readFileSync(`${srcPath}/htaccess`, 'utf8');

// copy index.html
const [, indexFile] = /DirectoryIndex (.*)\n/mg.exec(htaccess);
fs.copyFileSync(`${srcPath}/${indexFile}`, `${resultPath}/index.html`);

// copy other pages
const regexp = /RewriteRule \^([0-9a-z].*)\/\$ (page.*?) /g;

const asd = htaccess
    .split('\n')
    .map(line => {
        var data = regexp.exec(line);
        if (!data) {
            return null;
        }
        const [, dirName, fileName] = data;
        return {
            fileName: `${srcPath}/${fileName}`,
            dirName: `${resultPath}/${dirName}`
        }
    })
    .filter(line => Boolean(line))
    .forEach(({dirName, fileName}) => {
        if (!fs.existsSync(dirName)) {
            fs.mkdirSync(dirName, {recursive: true});
        }
        fs.copyFileSync(fileName, `${dirName}/index.html`);
        console.log(`${fileName} -> ${dirName}/index.html`);
    });