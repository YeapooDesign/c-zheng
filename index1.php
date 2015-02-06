<!DOCTYPE html>
<html lang="en">
<head>
    <?php include_once("layout/meta.php"); ?>
    <title>首页</title>
    <link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body class="Browser">
    
    <?php include_once("layout/nav.php"); ?>

    <article class="article">
        <div class="index_head">
        	<div class="title">剩余挣点</div>
        	<a href="score.html" class="Exchange" id="Exchange">53&nbsp81</a>
        </div>
    	<div class="Score width_line">
    		<a href="#" class="mt10">
                <ul>
                    <li>行驶 32 公里 ，耗油 2.39 升 </li>
                    <li><p>07:54 - 08:36</p></li>
                </ul>
                <span>80分</span>
            </a>
    	</div>
         <ul class="width_ul">
                <li class="s_arrows">
                    <span>参与春运告诉拥堵险</span>
                </li>
            </ul>
    	<div class="banner">
            <div class="left" id="previous"></div>
            <div class="right" id="next"></div>
           <ul id="banner">
                <li><a href="#"><img src="images/banner.jpg" alt=""></a></li>
                <li><a href="#"><img src="images/banner2.jpg" alt=""></a></li>
                <li><a href="#"><img src="images/banner3.jpg" alt=""></a></li>
                <li><a href="swings.html"><img src="images/banner4.jpg" alt=""></a></li>
            </ul>
            <div class="round">
                <ul id="round">
                    <li class="active"></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
        </div>
    </article>
    <script type="text/javascript" src="js/zepto.js"></script>
    <script type="text/javascript" src="js/extend.js"></script>
    <script type="text/javascript" src="js/common.js"></script>
</body>
</html>