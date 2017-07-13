function calculateSince(milliseconds){
    var createTime = new Date(milliseconds);
    var currentTime = new Date();
    var minAgo = Math.round((currentTime - createTime) / 60000);
    let timeAgo;

    if(minAgo === 0){
        var secAgo = Math.round((currentTime - createTime) / 1000);
        if(secAgo < 10){
          timeAgo = 'less than 10 seconds ago';
        } else if(secAgo < 20){
          timeAgo = 'less than 20 seconds ago';
        } else {
          timeAgo = 'less than half a minute ago';
        }
    }
    else if(minAgo === 1){
        var secAgo = Math.round((currentTime - createTime) / 1000);
        if(secAgo === 30){
          timeAgo = 'half a minute ago';
        } else if(secAgo < 60){
          timeAgo = 'less than a minute ago';
        } else {
          timeAgo = '1 minute ago';
        }
    } else if(minAgo < 45){
        timeAgo = `${minAgo} minutes ago`;
    } else if(minAgo > 44 && minAgo < 60){
        timeAgo = 'about 1 hour ago';
    } else if(minAgo < 1440){
        var hoursAgo = Math.round(minAgo / 60);
        if(hoursAgo === 1){
          timeAgo = 'about 1 hour ago';
        } else {
          timeAgo = `about ${hoursAgo} hours ago`;
        }
    } else if(minAgo > 1439 && minAgo < 2880){
        timeAgo = '1 day ago';
    } else {
        var daysAgo = Math.round(minAgo / 1440);
        timeAgo = `${daysAgo}+ days ago`;
    }
    return timeAgo;
};