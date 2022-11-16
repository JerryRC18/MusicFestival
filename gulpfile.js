const { src, dest, watch, parallel } = require("gulp");

//CSS
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");

//imagenes
const cache = require("gulp-cache");
const imagenmin = require("gulp-imagemin");
const webp = require("gulp-webp");
const avif = require("gulp-avif");


function css(done){
    src("src/scss/**/*.scss")//Identificar el archivo de SASS
        .pipe( plumber() )
        .pipe( sass() )//Compilarlo
        .pipe( dest("build/css") )//Almacenar en el disco duro


    done(); //Callback que avisa a gulp cuando llegamos al final
}

function versionWebp( done){
    
    const opciones = {
        quality: 60
    };

    src('src/img/**/*.{png,jpg}')
        .pipe( webp(opciones) )
        .pipe( dest('build/img'))

    done();
}

function versionAvif( done){
    
    const opciones = {
        quality: 60
    };

    src('src/img/**/*.{png,jpg}')
        .pipe( avif(opciones) )
        .pipe( dest('build/img'))

    done();
}

function imagenes( done){
    
    const opciones = {
        optimizationLevel: 3
    }
    
    src('src/img/**/*.{png,jpg}')
        .pipe( cache( imagenmin(opciones) ) )
        .pipe( dest('build/img'))
    done();
}

function javaScript(done){
    src('src/js/**/*.js')
        .pipe(dest('build/js'))

    done();
}

function dev(done){
    watch("src/scss/**/*.scss", css)
    watch("src/js/**/*.js", javaScript)

    done();
}

exports.css = css;
exports.js = javaScript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel (imagenes, versionWebp, versionAvif, javaScript, dev);
