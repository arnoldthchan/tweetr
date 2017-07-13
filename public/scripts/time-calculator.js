function calculateSince(milliseconds)
{
    var createTime = new Date(milliseconds);
    var currentTime = new Date();
    var minAgo = Math.round((currentTime - createTime) / 60000);
    if(minAgo === 0) {
        var secAgo = Math.round((currentTime - createTime) / 1000);
        if(secAgo < 10) {
          var timeAgo = 'less than 10 seconds ago';
        }
        else if(secAgo < 20) {
          var timeAgo = 'less than 20 seconds ago';
        }
        else {
          var timeAgo = 'less than half a minute ago';
        }
    }
    else if(minAgo === 1) {
        var secAgo = Math.round((currentTime - createTime) / 1000);
        if(secAgo === 30)
          var timeAgo = 'half a minute ago';
        else if(secAgo < 60)
          var timeAgo = 'less than a minute ago';
        else
          var timeAgo = '1 minute ago';
    }
    else if(minAgo < 45){
        var timeAgo = `${minAgo} minutes ago`;
    }
    else if(minAgo > 44 && minAgo < 60){
        var timeAgo = 'about 1 hour ago';
    }
    else if(minAgo < 1440){
        var hoursAgo = Math.round(minAgo / 60);
    if(hoursAgo === 1){
      var timeAgo = 'about 1 hour ago';
    }
    else
      var timeAgo = `about ${hoursAgo} hours ago`;
    }else if(minAgo > 1439 && minAgo < 2880){
        var timeAgo = '1 day ago';
    }
    else {
        var daysAgo = Math.round(minAgo / 1440);
        var timeAgo = `${daysAgo}+ days ago`;
    }
    return timeAgo;
};