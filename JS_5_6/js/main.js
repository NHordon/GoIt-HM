
var split_counter = 0;
var currentButton = "Start";
var beginTime = 0;
var currentTime = 0;

window.onload = function() {
    function start() {
        if (currentButton == 'Start') {
                upTime(new Date());
            var nowT = new Date();
                beginTime = nowT.getTime();
        } else {
            pauseTimer();
        };
            changeButton();
    };

    function reset() {
        (currentButton == 'Pause') ? changeButton() : "";
        currentTime = 0;
        split_counter = 0;
        clearTimeout(upTime.to);
        var elemsSplitTime = document.querySelectorAll('.split_time');

        for (var i = 0; i < elemsSplitTime.length; i++) {
            elemsSplitTime[i].parentNode.removeChild(elemsSplitTime[i]);
        };

        document.getElementById('hours').firstChild.nodeValue = 0;
        document.getElementById('minutes').firstChild.nodeValue = 0;
        document.getElementById('seconds').firstChild.nodeValue = 0;
        document.getElementById('milisec').firstChild.nodeValue = 0;
    };

    function changeButton(){
        currentButton = (currentButton == 'Start') ? 'Pause' : 'Start';
        document.getElementById('start').firstChild.nodeValue = currentButton;
    };

    function upTime(countFrom) {
        now = new Date();
        difference = (now-countFrom + currentTime);

        hours=Math.floor((difference%(60*60*1000*24))/(60*60*1000)*1);
        mins=Math.floor(((difference%(60*60*1000*24))%(60*60*1000))/(60*1000)*1);
        secs=Math.floor((((difference%(60*60*1000*24))%(60*60*1000))%(60*1000))/1000*1);
        milliseconds=Math.floor(difference % 1000);
        document.getElementById('hours').firstChild.nodeValue = hours;
        document.getElementById('minutes').firstChild.nodeValue = mins;
        document.getElementById('seconds').firstChild.nodeValue = secs;
        document.getElementById('milisec').firstChild.nodeValue = milliseconds;
        clearTimeout(upTime.to);
        upTime.to=setTimeout(function(){ upTime(countFrom); },4);
    };

    function pauseTimer(){
        var curData = new Date();
        currentTime = curData.getTime() - beginTime + currentTime;
        clearTimeout(upTime.to);
    };

    function blockSplit() {
        (currentButton == 'Pause') ? splitTime() : "";
    };

    function splitTime() {
        var milliseconds = document.getElementById('milisec').firstChild.nodeValue;
        var seconds = document.getElementById('seconds').firstChild.nodeValue;
        var minutes = document.getElementById('minutes').firstChild.nodeValue;
        var hours = document.getElementById('hours').firstChild.nodeValue;
        milliseconds = (milliseconds < 10 ? '00' + milliseconds : milliseconds);
        milliseconds = (milliseconds < 100 ? '0' + milliseconds : milliseconds);
        seconds = (seconds < 10 ? '0' + seconds : seconds);
        minutes = (minutes < 10 ? '0' + minutes : minutes);
        hours = (hours < 10 ? '0' + hours : hours);
        timeForSplit = hours + ":" + minutes + ":" + seconds + ":" + milliseconds;

        var insertSplit = document.createElement('p');
        var parent = document.querySelector('.split');
        insertSplit.classList.add('split_time');
        insertSplit.innerHTML = 'Split' + (++split_counter) + " : " + timeForSplit;
        parent.appendChild(insertSplit);
    };

    document.getElementById("start").addEventListener('click', start);
    document.getElementById("split").addEventListener('click', blockSplit);
    document.getElementById("reset").addEventListener('click', reset);

};

