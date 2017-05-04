import angular from 'rollup-plugin-angular';
import typescript from 'rollup-plugin-typescript';

export default {
    entry: './index.js',
    dest: 'bossy.umd.js',
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
    moduleName: 'ng.bossyui',
    plugins: [
        angular(),
        typescript({ typescript: require('typescript')})
    ]
}
