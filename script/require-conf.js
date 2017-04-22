require.config({
                 baseUrl: '/js',
                 shim   : {
                   bootstrap               : ['jquery'],
                   'jquery.tablesorter.min': ['jquery']
                 },
                 paths  : {
                   jquery   : 'https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min',
                   bootstrap: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min',
                   adsense  : 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle'
                 }
               });