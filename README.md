node-tistoryAPI
===============

A Node.js library for interacting with the Tistory RESTful API.

[Tistory API documentation](http://www.tistory.com/guide/api/index)  
[Manage applications](http://www.tistory.com/guide/api/manage/list)

### Dependencies
This library uses the [request](https://github.com/request/request) package

```
npm install request
```

### Obtaining an access_token
There is a TistoryOAuth2 helper included for authorizing your app on behalf of the user and then requesting an access_token.

```javascript
var Tistory = require('./node-tistoryAPI/lib')

var config = {
    "client": {
        "client_id": "something_something_client_id",
        "client_secret": "client_something_secret",
        "callback": "http://mycallback:42777"
    },
    "cookies": {
        "TSSESSION" : "valid_tsession_cookie"
    }
}
var at = new Tistory.TistoryOAuth2(config);

at.start(function (access_token){ 
    //callback
    console.log('My access token is:', access_token);
});
```

Tistory API
============
Below are some examples on how to use the API
```javascript
var Tistory = require('./node-tistoryAPI/lib')

var access_token = 'abc123';
var t = new Tistory.TistoryAPI(access_token);

// Make a /post/ list request
var params = {
    'targetUrl': 'toodur2',
    'page': '1',
    'count': '50'
};
t.post.list(params, callback);

// Make a /post/ read request
var params = {
    'targetUrl': 'thestudio.kr',
    'postId': '1537',
};
t.post.read(params, callback);

//your callback function
function callback (err, res, body){
    console.log(body);
}

```
##Methods
These are the methods currently supported:
###t.post.write(params, callback) [](http://www.tistory.com/guide/api/manage/list)
|params|description|required|
|---------|-----|-----|-----|
|targetUrl|Blog Url |Yes|
|title|Blog-Entry title |Yes|
|content | Blog-Entry content|optional|
|visibility| Blog-Entry visability setting|optional|
|published|UNIX_TIMESTAMP() 예약발송|optional|
|tag|Tags|optional|
|output| response format (xml or json) |optional|
[Official documentation](http://www.tistory.com/guide/api/post.php#post-write)
###t.post.modify(params, callback)
|params|description|required|
|---------|-----|-----|
|targetUrl| Blog Url |Yes|
|postId| Blog-Entry ID-number | Yes |
|title| Blog-Entry title |Yes|
|content | Blog-Entry content|optional|
|visibility| Blog-Entry visability setting|optional|
|published|UNIX_TIMESTAMP() 예약발송|optional|
|tag|Tags|optional|
|output| response format  (xml or json)|optional|
[Official documentation](http://www.tistory.com/guide/api/post.php#post-modify)
###t.post.list(params, callback)
|params|description|required|
|---------|-----|-----|
|targetUrl|Blog Url |Yes|
|page||optional|
|count|entries per page|optional|
|output| response format  (xml or json)|optional|
[Official documentation](http://www.tistory.com/guide/api/post.php#post-list)
###t.post.read(params, callback)
|params|description|required|
|---------|-----|-----|
|targetUrl|Blog Url |Yes|
|postId| Blog-Entry ID-number | Yes |
|output| response format  (xml or json)|optional|
[Official documentation](http://www.tistory.com/guide/api/post.php#post-read)

##Notes
For a Python 3 alternative,  check out [kastden/tistory](https://github.com/kastden/tistory)

