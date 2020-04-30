const fs = require('fs')
const path = require('path')

const rmSync = src => {
  if (fs.existsSync(src)) {
    if (fs.statSync(src).isDirectory()) {
      const files = fs.readdirSync(src);
      files.forEach(file => {
        rmSync(path.resolve(src,file))
      })
      let successFlag = false
      while(!successFlag) {
        try {
          fs.rmdirSync(src)
          successFlag = true
        } catch (err) {}
      }
    } else {
      fs.unlinkSync(src);
    }
  }
}

const cpSync = (src, dest) => {
  if (fs.existsSync(src)) {
    if (fs.statSync(src).isDirectory()) {
      fs.mkdirSync(dest)
      const files = fs.readdirSync(src)
      files.forEach(file => {
        cpSync(path.resolve(src,file),path.resolve(dest,file))
      })
    } else {
      fs.copyFileSync(src,dest)
    }
  }
}

module.exports = {
  rmSync,
  cpSync
}

