'use strict';

class Avatar extends HTMLImageElement {
    loadJSON(path, callback) {
    	var httpRequest = new XMLHttpRequest();
    	httpRequest.onreadystatechange = function() {
    		if (httpRequest.readyState === 4) {
    			if (httpRequest.status === 200) {
    				var data = JSON.parse(httpRequest.responseText);
    				if (callback) callback(data);
    			}
    		}
    	};
    	httpRequest.open('GET', path, true);
    	httpRequest.send();
    }
}

class GitHubAvatar extends Avatar {
    createdCallback() {
        var self = this,
            size = this.getAttribute('size') || 48,
            username = this.getAttribute('username');

        if (username) {
            var url = 'https://api.github.com/users/' + username;
        } else {
            throw new Error('Username attribute is required.');
        }

        self.loadJSON(url, function(data) {
            var image = data.avatar_url + '&s=' + size;
            self.setAttribute('src', image);
		});
    }
}

document.registerElement('avatar-github', {
    prototype: GitHubAvatar.prototype,
    extends: 'img'
});



class FacebookAvatar extends Avatar {
  createdCallback(){
    var self = this,
        size = this.getAttribute('size') || 48,
        username = this.getAttribute('username');

        if(username){
            var url = 'https://graph.facebook.com/' + username + '/picture?' + 'width=' + size + '&height=' + size;
            self.setAttribute('src',url);
        } else {
          throw new Error('Username attribute is required.');
        }
  }
}

document.registerElement('avatar-facebook', {
    prototype: FacebookAvatar.prototype,
    extends: 'img'
});
