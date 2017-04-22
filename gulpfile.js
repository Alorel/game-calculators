const gulp    = require('gulp');
const Promise = require('bluebird');
const fs      = Promise.promisifyAll(require('fs'));
const pug     = require('pug');
const path    = require('path');
const watch   = require('gulp-watch');
const Cargo   = require('async.cargo');
const ugly    = require('gulp-uglify');

const CONF = {
  build_dir: './dist/',
  uglify   : {
    src: ['./assets/**/*.js', './assets/**/*.json']
  },
  pug      : {
    nav_pages: {
      Felspire: [
        {
          name: 'Healing potion %',
          href: '/felspire-healing-pct.html',
          desc: 'Health % when to drink health potions for optimum effect'
        },
        {
          name: 'Lapis Chart',
          href: '/felspire-lapis-chart.html',
          desc: 'Lapis/shards required for specific levels'
        },
        {
          name: 'Perk Calculator',
          href: '/felspire-perk-calculator.html'
        },
        {
          name: 'Pet feed calculator',
          href: '/felspire-pet-feed.html',
          desc: 'Pet feed requirements and costs'
        }
      ],
      Runique : [
        {
          name: 'Mode Conversion',
          href: 'runique-mode-conversion.html',
          desc: "The amount of exp you'll have after changing game modes"
        }
      ]
    }
  }
};

try {
  fs.mkdirSync(CONF.build_dir);
} catch (ignored) {

}

const renderPugs = async () => {
  let basenames = [];
  return fs.readdirAsync('./pugs', 'utf8')
           .map(i => `./pugs/${i}`)
           .filter(async path => (await fs.statAsync(path)).isFile())
           .map(src => {
             const dirname  = path.dirname(src);
             const basename = path.basename(src, path.extname(src));
             basenames.push(basename);
             return {
               src,
               dest: path.normalize(path.join(dirname, '..', CONF.build_dir, `${basename}.html`)),
               basename
             };
           })
           .map(spec => {
             spec.pug = pug.renderFile(spec.src, Object.assign({basenames, basename: spec.basename}, CONF.pug));
             return spec;
           })
           .then(specs => {
             let promises = [];
             for (let spec of specs) {
               promises.push(fs.writeFileAsync(spec.dest, spec.pug, 'utf8'));
             }
             return promises;
           });
};

gulp.task('pug', renderPugs);

gulp.task('uglify', () => {
  return gulp.src(CONF.uglify.src)
             .pipe(ugly())
             .pipe(gulp.dest(CONF.build_dir));
});

const watchers = {
  pug   : () => {
    const cargo = Cargo((tasks, callback) => {
      setImmediate(console.log, 'Rendering some pugs');
      renderPugs().then(() => callback()).catch(callback);
    });
    return watch(['./pugs/**/*.pug'], {}, (a, b, c) => {
      cargo.push(1);
    });
  },
  uglify: () => watch(CONF.uglify.src)
  .pipe(ugly())
  .pipe(gulp.dest(CONF.build_dir))
};

gulp.task('watch:pug', watchers.pug);
gulp.task('watch:ugly', watchers.uglify);
gulp.task('watch', ['watch:pug', 'watch:ugly']);

gulp.task('default', ['pug', 'uglify']);