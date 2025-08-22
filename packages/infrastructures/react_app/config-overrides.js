const path = require('path');

module.exports = function override(config) {
    // Supprimer ModuleScopePlugin
    config.resolve.plugins = config.resolve.plugins.filter(
        plugin => plugin.constructor.name !== 'ModuleScopePlugin'
    );

    // Configuration du babel-loader
    config.module.rules.push({
        test: /\.(ts|tsx)$/,
        include: [
            path.resolve(__dirname, '../../domain'),
            path.resolve(__dirname, '../../adapters')
        ],
        use: [
            {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-typescript'],
                    plugins: [
                        ['@babel/plugin-proposal-decorators', { legacy: true }],
                        ['@babel/plugin-proposal-class-properties', { loose: true }]
                    ]
                }
            }
        ]
    });

    // Résolution des modules
    config.resolve = {
        ...config.resolve,
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        alias: {
            '@pokemon/domain': path.resolve(__dirname, '../../domain'),
            '@pokemon/web-adapters': path.resolve(__dirname, '../../adapters'),
        }
    };

    return config;
};