#!/usr/bin/env node
var Post = require('./post');

//  API Documentation:
//  http://www.tistory.com/guide/api/index

exports.Tistory = function (access_token, format) {
    if (!format) {
        format = 'xml'
    }
    this.baseurl = 'https://www.tistory.com/apis';
    this.access_token = access_token;
    this.format = format;
    
    //TODO: add the rest of the api
    this.post = new Post(this);
    //this.blog = new Blog();
    //this.category = new Category();   
}
