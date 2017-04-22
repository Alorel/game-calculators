require.config({
                 baseUrl: '/js',
                 shim   : {
                   bootstrap: ['jquery'],
                   'alo-cfg': {
                     exports: 'AloCfg'
                   }
                 },
                 paths  : {
                   jquery   : 'https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min',
                   bootstrap: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min',
                   'alo-cfg': 'alo-cfg.min'
                 }
               });