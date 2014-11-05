#!/usr/bin/env node
var request = require('request'),
    util = require('util'),
    qs = require('querystring');

/*  Tistory /post/ features
 * 
 *  Tistory /post/ documentation:
 *  http://www.tistory.com/guide/api/post.php
 */

function Post(TistoryObj) {
    this.access_token = TistoryObj.access_token;
    this.format = TistoryObj.format;
    this.baseurl = TistoryObj.baseurl;
}

Post.prototype.write = function (params, callback) {
    params['access_token'] = this.access_token;
    params['output'] = this.format;
    
    // URL: https://www.tistory.com/apis/post/write
    var url = util.format('%s/post/write', this.baseurl);
    console.log(url);
    
    request.post(url, {form: params}, function(err, res, body) {
        callback(err,res,body)
    });
}

Post.prototype.modify = function(params, callback) {
    params['access_token'] = this.access_token;
    params['output'] = this.format;
    
    // URL: https://www.tistory.com/apis/post/modify
    var url = util.format('%s/post/modify', this.baseurl);
    
    request.post(url, {form: params}, function(err, res, body) {
        callback(err,res,body)
    });
}

Post.prototype.list = function(params, callback) {
    params['access_token'] = this.access_token;
    params['output'] = this.format;
    
    // URL: https://www.tistory.com/apis/post/list
    var url = util.format('%s/post/list?%s', this.baseurl, qs.stringify(params));
    console.log(url);
    
    request.get(url, function(err, res, body) {
        callback(err, res, body);
    });
    
}

Post.prototype.read = function (params, callback) {
    params['access_token'] = this.access_token;
    params['output'] = this.format;
    
    console.log(params);
    
    // URL: https://www.tistory.com/apis/post/read
    var url = util.format('%s/post/read?%s', this.baseurl, qs.stringify(params));
    console.log(url);
    
    request.get(url, function(err, res, body) {
        callback(err, res, body);
    });
}

// TODO: GET ATTACH TO WORK
Post.prototype.attach = function(params, callback) {
    callback('Attach is not supported by this library yet');
    /*
    params['access_token'] = this.access_token;
    params['output'] = this.format;
    
    var url = util.format('%s/post/attach', this.baseurl);
    
    request.post(url, {form: params}, function(err, res, body) {
        callback(err,res,body)
    }); */
}


module.exports = Post;