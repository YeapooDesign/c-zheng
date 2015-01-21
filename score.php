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
        <div class="score_box">
            <ul>
                <li>
                    <div class="Gauge_board">
                        <div class="title">2014-11-12 12:00:16</div>
                        <div class="gauge_box">
                            <div class="num">85</div>
                            <div class="Needle" style="-webkit-transform: rotate(158deg);"></div>
                        </div>
                        <div class="title">油门轰那么高，敢情油费不要钱么？</div>
                    </div>
                    <div class="Traveling">
                        <div class="trave_title">行程统计</div>
                        <div class="Traveling_box">
                            <ul>
                                <li>里程<div><b>4000</b>公里</div></li>
                                <li>耗时<div><b>69</b>分钟</div></li>
                                <li>平均速度<div><b>26</b>公里/时</div></li>
                                <li>油耗<div><b>1.2</b>升</div></li>
                                <li>油费<div><b>60</b>元</div></li>
                                <li>百公里油耗<div><b>6.8</b>升</div></li>
                            </ul>
                            <div class="clear"></div>
                        </div>
                        <div class="trave_title style">行程统计</div>
                        <div class="Traveling_box style_box">
                            <ul>
                                <li><span>急加速</span><div><b>3</b>次</div></li>
                                <li><span>急减速</span><div><b>2</b>次</div></li>
                                <li><span>急转弯</span><div><b>1</b>次</div></li>
                            </ul>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </article>
</body>
</html>