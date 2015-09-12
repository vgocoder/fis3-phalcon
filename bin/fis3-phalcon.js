#!/usr/bin/env node
// vi fis3-phalcon/bin/fis3-phalcon.js
var Liftoff = require('liftoff');
var argv = require('minimist')(process.argv.slice(2));
var path = require('path');
var cli = new Liftoff({
  name: 'fis3-phalcon', // 命令名字
  processTitle: 'fis3-phalcon',
  moduleName: 'fis3-phalcon',
  configName: 'fis-conf',

  // only js supported!
  extensions: {
    '.js': null
  }
});

cli.launch({
  cwd: argv.r || argv.root,
  configPath: argv.f || argv.file`
}, function(env) {
  var fis;
  if (!env.modulePath) {
    fis = require('../');
  } else {
    fis = require(env.modulePath);
  }
  fis.set('system.localNPMFolder', path.join(env.cwd, 'node_modules/fis3-phalcon'));
  fis.set('system.globalNPMFolder', path.dirname(__dirname));
  fis.cli.run(argv, env);
});
