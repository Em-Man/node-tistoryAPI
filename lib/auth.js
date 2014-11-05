#!/usr/bin/env node
var util = require('util'),
    fs = require('fs'),
    qs = require('querystring'),
    request = require('request');

/*  Tistory API OAuth2 authanzation helper
 *  Step 1: Requests an Authorization code
 *  Step 2: Requests an Access Token
 * 
 *  Tistory OAuth documentation:
 *  http://www.tistory.com/guide/api/oauth
 */

exports.TistoryOAuth2 = function (config) {
    this.baseurl = 'https://www.tistory.com/oauth/';
    this.client_id = config['client']['client_id'];
    this.client_secret = config['client']['client_secret'];
    this.callback = config['client']['callback'];
    this.cookies =  config['cookies'];
}

exports.TistoryOAuth2.prototype.start = function (user_callback) {
    this.user_callback = user_callback;
    authorize.call(this);
}

function authorize() {
    // URL: https://www.tistory.com/oauth/authorize
    var url = util.format('%sauthorize?', this.baseurl);
    var params = {'client_id': this.client_id,
                  'redirect_uri': this.callback,
                  'response_type': 'code'};
    
    request_response.call(this, url, params, auth_callback); //request 1
    
    function auth_callback(response) {
        //request 1 callback
        var hashRe = util.format("'%s\\?code=(\\w+)'", this.callback);
        var groups = response.match(new RegExp(hashRe));
        
        try {var authcode = groups[1];} catch(e) {
            console.log('No authcode recived. Check your config!');
            return;
        }
        
        get_token.call(this, authcode);
    }
}

function get_token(authcode) {
    // URL: https://www.tistory.com/oauth/access_token
    url = util.format('%saccess_token?', this.baseurl);
    params = {'client_id': this.client_id,
              'client_secret':  this.client_secret,
              'redirect_uri': this.callback,
              'code': authcode,
              'grant_type': 'authorization_code'};
    
    request_response.call(this, url, params, token_callback) //request 2
    
    function token_callback(response) {
        //request 2 callback
        var access_token = response.split('access_token=').pop();
        this.user_callback(access_token);
    }
}

function request_response(url, params, callback) {
    var that = this;
    url += qs.stringify(params);
    var jar = request.jar();
    var cookie = request.cookie(qs.stringify(this.cookies));
    jar.setCookie(cookie, url);
    
    var options = {
        method: 'GET',
        uri: url,
        jar: jar
    }
    
    request(options, r_callback);
    
    function r_callback (error, response, body) {
        callback.call(that, body);
    }
}