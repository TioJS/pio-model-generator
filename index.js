const fs = require('fs')
const path = require('path')

const { rmSync, cpSync } = require('./utils')
const { pioPath,textures } = require('./config')
const modelTemplate = require('./source/model.json')

const modelsPath = path.resolve(pioPath, 'models')
const sourcePath = path.resolve(__dirname,'source')

rmSync(modelsPath)
fs.mkdirSync(modelsPath)

const createPromise = texture => new Promise(resolve => {
  const basePath = path.resolve(modelsPath,`pio-${texture}`)
  fs.mkdirSync(basePath)
  fs.mkdirSync(path.resolve(basePath,'textures'))

  const cpList = ['motions',`textures/${texture}.png`,'model.moc']
  cpList.forEach(cpPath => {
    cpSync(path.resolve(sourcePath,cpPath),path.resolve(basePath,cpPath))
  })

  modelTemplate.textures = [`textures/${texture}.png`]
  fs.writeFile(path.resolve(basePath, `model.json`), JSON.stringify(modelTemplate), (err) => {
    if (err) throw err;
    resolve(texture)
  })
})

Promise.all(textures.map(createPromise)).then(textures => {
  const modelListPath = path.resolve(pioPath,'models.js')
  rmSync(modelListPath)
  fs.writeFile(modelListPath, `var pio_models = ${JSON.stringify(textures)};`,err => {
    if(err) throw err;
    console.log('输出成功')
  })
})