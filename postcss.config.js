module.exports = {
    plugins: [
        // prefix vendor CSS properties
        require( 'autoprefixer' ),

        require( 'cssnano' ) ,
    ].filter( Boolean )
};