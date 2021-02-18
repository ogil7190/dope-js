const path = require( 'path' );

// module alias
exports.alias = {
    'views': path.resolve( __dirname, 'src/js/views' ),
    'constants': path.resolve( __dirname, 'src/js/constants' ),
    'core' : path.resolve( __dirname, 'src/js/core' )
};
