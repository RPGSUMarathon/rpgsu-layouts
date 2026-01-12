const {exec} = require('node:child_process')
const path = require('node:path')

console.log('Installing Speedcontrol dependencies...')
exec('pnpm i -P', {
  cwd: path.join(__dirname, 'bundles/nodecg-speedcontrol')
}, (error, stdout) => {
  console.log(stdout)

  if (error) {
    console.log(error)
  }
})


console.log('Installing foobar plugin dependencies...')
exec('pnpm i', {
  cwd: path.join(__dirname, 'bundles/nodecg-foobar2000-controller')
}, (error, stdout) => {
  console.log(stdout)

  if (error) {
    console.log(error)
  }
})

console.log('Building foobar plugin...')
exec('pnpm build', {
  cwd: path.join(__dirname, 'bundles/nodecg-foobar2000-controller')
}, (error, stdout) => {
  console.log(stdout)

  if (error) {
    console.log(error)
  }
})
