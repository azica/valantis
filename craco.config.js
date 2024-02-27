const CracoAlias = require('craco-alias')

module.exports = {
    mode: 'development',
    output: {
        path: __dirname,
    },
    plugins: [
        {
            plugin: CracoAlias,
            options: {
                source: 'tsconfig',
                baseUrl: './src',
                tsConfigPath: './tsconfig.paths.json',
            },
        },
    ],
}
