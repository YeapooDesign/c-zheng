<!DOCTYPE html>
<html lang="en">
<head>
    <?php include_once("layout/meta.php"); ?>
    <title>挣点明细</title>
    <link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body>
    <article class="article" id="wrapper">
        <div class="income" id="scroller">
            <ul id="thelist">
                <li class="State1">
                    <p class="ft15">里程超过一万公里奖励 <span>-136</span></p>
                    <p class="time">得奖日期 2014-11-05  12:05 </p>
                </li>
                <li class="State2 ">
                    <p class="ft15">兑换到集分宝奖励 <span>-136</span></p>
                    <p class="time">得奖日期 2014-11-05  12:05 </p>
                </li>
                <li class="State3">
                    <p class="ft15">小挣奖励 <span class="Canada">+3654</span></p>
                    <p class="time">得奖日期 2014-11-05  12:05 </p>
                </li>
                <li class="State4">
                    <p class="ft15">停驶超过24小时奖励 <span>-136</span></p>
                    <p class="time">得奖日期 2014-11-05  12:05 </p>
                </li>
                <li class="State5">
                    <p class="ft15">首次行程奖励 <span>-136</span></p>
                    <p class="time">得奖日期 2014-11-05  12:05 </p>
                </li>
                <li class="State6">
                    <p class="ft15">驾驶超过90分奖励 <span>-136</span></p>
                    <p class="time">得奖日期 2014-11-05  12:05 </p>
                </li>
                <li class="State7">
                    <p class="ft15">邀请奖励 <span>-136</span></p>
                    <p class="time">得奖日期 2014-11-05  12:05 </p>
                </li>
                <li class="State7">
                    <p class="ft15">邀请奖励 <span>-136</span></p>
                    <p class="time">得奖日期 2014-11-05  12:05 </p>
                </li>
            </ul>
            <div id="pullUp">
                <span class="pullUpIcon"></span><span class="pullUpLabel">Pull up to refresh...</span>
            </div>
        </div>
    </article>
    <script type="text/javascript" src="js/zepto.js"></script>
    <script type="text/javascript" src="js/iscroll.js"></script>
    <script type="text/javascript" src="js/common.js"></script>
    <script type="text/javascript">
    var myScroll,
        pullUpEl, pullUpOffset,
        generatedCount = 0;
    function pullUpAction () {
        setTimeout(function () {    // <-- Simulate network congestion, remove setTimeout from production!
            var el, li, i;
            el = document.getElementById('thelist');
            for (i=0; i<3; i++) {
                li = document.createElement('li');
                li.innerText = 'Generated row ' + (++generatedCount);
                el.appendChild(li, el.childNodes[0]);
            }
            myScroll.refresh();     // Remember to refresh when contents are loaded (ie: on ajax completion)
        }, 1000);   // <-- Simulate network congestion, remove setTimeout from production!
    }
    function loaded() {
        pullUpEl = document.getElementById('pullUp');
        pullUpOffset = pullUpEl.offsetHeight;
        //console.log('pullUpOffset:'+pullUpOffset);
        myScroll = new iScroll('wrapper', {
            useTransition: true,
            onRefresh: function () {
               if (pullUpEl.className.match('loading')) {
                    pullUpEl.className = '';
                    pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Pull up to load more...';
                }
            },
            onScrollMove: function () {
                //console.log('y:'+this.y);
                if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
                    pullUpEl.className = 'flip';
                    pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Release to refresh...';
                    this.maxScrollY = this.maxScrollY;
                } else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
                    pullUpEl.className = '';
                    pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Pull up to load more...';
                    this.maxScrollY = pullUpOffset;
                }
            },
            onScrollEnd: function () {
               if (pullUpEl.className.match('flip')) {
                    pullUpEl.className = 'loading';
                    pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Loading...';
                    pullUpAction(); // Execute custom function (ajax call?)
                }
            }
    });
    }
    document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
    document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 200); }, false);
</script>
</body>
</html>