const {execSync} = require('node:child_process')
const path = require('node:path')

console.log('Installing Speedcontrol dependencies...')
execSync('pnpm i -P --ignore-scripts --ignore-workspace', {
  cwd: path.join(__dirname, 'bundles/nodecg-speedcontrol')
}, (error, stdout) => {
  console.log(stdout)

  if (error) {
    console.log(error)
  }
})


console.log('Installing foobar plugin dependencies...')
execSync('pnpm i --ignore-scripts --ignore-workspace', {
  cwd: path.join(__dirname, 'bundles/nodecg-foobar2000-controller')
}, (error, stdout) => {
  console.log(stdout)

  if (error) {
    console.log(error)
  }
})

console.log('Building foobar plugin...')
execSync('pnpm build', {
  cwd: path.join(__dirname, 'bundles/nodecg-foobar2000-controller')
}, (error, stdout) => {
  console.log(stdout)

  if (error) {
    console.log(error)
  }
})
