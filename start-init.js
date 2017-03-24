var exec = require('child_process').exec;

exec('gulp serve').stdout.pipe(process.stdout);

