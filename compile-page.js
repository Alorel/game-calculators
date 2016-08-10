var fs = require('fs');

fs.readFile("inc/head.html", "utf8", function (e, head) {
    if (e) {
        throw e;
    } else {
        fs.readFile("inc/foot.html", "utf8", function (e, foot) {
            if (e) {
                throw e;
            } else {
                fs.readdir("tabs", function (e, files) {
                    if (e) {
                        throw e;
                    } else {
                        //noinspection JSAnnotator
                        for (let i = 0; i < files.length; i++) {
                            //noinspection JSAnnotator
                            let fname = files[i];
                            fs.readFile("tabs/" + fname, "utf8", function (e, page) {
                                if (e) {
                                    throw e;
                                } else {
                                    //noinspection JSAnnotator
                                    let realHead = head,
                                        match;
                                    if (match = page.match(/\{title:([^}]+)}/m)) {
                                        realHead = realHead
                                            .replace(/<title>([^<]+)<\/title>/gm, '<title>' + match[1] + '</title>')
                                            .replace(/id="title">([^<]*)<\/div>/, 'id="title">' + match[1] + '</div>')
                                        ;
                                    }
                                    fs.writeFile(fname, realHead + page + foot, function (e) {
                                        if (e) {
                                            throw e;
                                        }
                                    });
                                }
                            });
                        }
                    }
                });
            }
        });
    }
});