const fs   = require('fs')
const jimp = require('jimp')
const log  = require('./log')

module.exports = function runJob() {

  return new Promise(async (resolve, reject) => {

    const randomNumber = () => Math.floor(Math.random() * 1995) * 15
    const destFileName = `${__dirname}/../imgs/dest/${randomNumber()}-img.jpg`

    //copy图片到临时目录
    log(`Copying ${destFileName}`)
    fs.copyFileSync(`${__dirname}/../imgs/landscape.jpg`, destFileName)

    //处理图片
    log(`Flipping ${destFileName}`)
    const image = await jimp.read(destFileName)
    image.flip(true, false)

    //删除在临时目录中被处理完的图片
    log(`Deleting ${destFileName}`)
    fs.unlink(destFileName, (err) => {
      return err ? reject(err) : resolve('success')
    })

  })

}
