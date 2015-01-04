var fs = require('fs');
var path = require('path');
var fis = require('fis-kernel');

fis.cli = {};
fis.cli.name = "fis-plus";

var remote_addr = 'http://hanchengliang01.fe.baidu.com/fispd/www.tar';

function getRoot(root){
    if(fis.util.exists(root)){
        if(!fis.util.isDir(root)){
            fis.log.error('invalid document root');
        }
    } else {
        fis.util.mkdir(root);
    }
    return fis.util.realpath(root);
}
var serverRoot = (function(){
    var key = 'FIS_SERVER_DOCUMENT_ROOT';
    if(process.env && process.env[key]){
        var path = process.env[key];
        if(fis.util.exists(path) && !fis.util.isDir(path)){
            fis.log.error('invalid environment variable [' + key + '] of document root [' + path + ']');
        }
        return path;
    } else {
        return fis.project.getTempPath('www');
    }
})();

exports.run = function (args) {
	var remote = args || remote_addr;
	fis.util.download(remote, function(err) {
		if(err){
			fis.log.error( 'unable to download component [www.tar] from ['+remote+'], error [' + err + ']');
	    } else {
	        process.stdout.write('install [www]\n');
	    }
	}, getRoot(serverRoot));
};