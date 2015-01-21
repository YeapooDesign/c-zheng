<!DOCTYPE html>
<html lang="en">
<head>
    <?php include_once("layout/meta.php"); ?>
    <title>震动报警</title>
    <link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body class="Browser">
    
    <?php include_once("layout/nav.php"); ?>

    <article class="article">
        <div class="warning mt15 ">车辆震动报警<div class="Switch " id="warning"></div></div>
        <div class="Collision">
            <div class="title">突发碰撞报警</div>
            <div class="collision_box">
                <div class="collbox" id="collbox">
                    <ul>
                        <li><span>1级</span></li>
                        <li><span>2级</span></li>
                        <li><span>3级</span></li>
                        <li class="active"><span>4级</span></li>
                        <li><span>5级</span></li>
                    </ul>
                </div>
            </div>
            <p>报警灵敏度可自行设置 ,灵敏度越高 ,对震动越敏感 ,请谨慎设置 .</p>
        </div>
        <div class="Collision "><!--暂时不做-->
            <div class="title">持续报警</div>
            <div class="collision_box ">
                <div class="collbox" id="collbox2">
                    <ul>
                        <li><span>1级</span></li>
                        <li><span>2级</span></li>
                        <li class="active"><span>3级</span></li>
                        <li><span>4级</span></li>
                        <li><span>5级</span></li>
                    </ul>
                </div>
            </div>
            <p>报警灵敏度可自行设置 ,灵敏度越高 ,对震动越敏感 ,请谨慎设置 .</p>
        </div>

    </article>
    <script type="text/javascript" src="js/zepto.js"></script>
    <script type="text/javascript" src="js/extend.js"></script>
    <script type="text/javascript" src="js/common.js"></script>
</body>
</html>