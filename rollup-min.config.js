import uglify from "rollup-plugin-uglify";
import angular from 'rollup-plugin-angular';

export default {
    entry: './index.js',
    dest: 'bossy.umd.min.js',
    format: 'umd',
    external: [
        '@angular/core',
        '@angular/common',
        '@angular/forms',
        '@angular/platform-browser'
    ],
    globals: {
        '@angular/core': 'ng.core',
        '@angular/common': 'ng.common',
        '@angular/forms': 'ng.forms',
        '@angular/platform-browser': 'ng.platform-browser'
    },
    moduleName: 'ng.bossy',
    plugins: [
        angular(),
        uglify()
    ]
}