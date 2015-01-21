<!DOCTYPE html>
<html lang="en">
<head>
    <?php include_once("layout/meta.php"); ?>
    <title>震动报警2</title>
    <link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body class="Browser">
    
    <?php include_once("layout/nav.php"); ?>

    <article class="article">
        <div class="warning mt15 ">低电压报警<div class="Switch " id="warning"></div></div>
        <div class="voltage_tit mt15 clear">
            <div class="tit bb">当前电压<span>13.8V</span></div>
            <div class="tit">历史最低<b>（2014-12-04）</b><span>11.8V</span></div>
        </div>
        <div class="voltage_watch mt15">
            <div class="title">报警电压设置</div>
            <div class="watch">
                <div class="s_figure">11V</div>
                <div class="o_figure">13V</div>
                <div class="s_mark">
                    <div class="value">12.8V</div>
                </div>
            </div>
            <div class="note">滑动设置报警电压值</div>
        </div>
    </article>
    <script type="text/javascript" src="js/zepto.js"></script>
    <script type="text/javascript" src="js/extend.js"></script>
    <script type="text/javascript" src="js/common.js"></script>
</body>
</html>