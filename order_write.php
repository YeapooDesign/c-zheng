<!DOCTYPE html>
<html lang="en">
<head>
    <?php include_once("layout/meta.php"); ?>
    <title>填写订单号</title>
    <link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body class="Browser">

    <?php include_once("layout/nav.php"); ?>

    <article class="article">
        <div class="withdrawing">
            <!-- <div class="title">填写订单号</div> -->
            <ul class="width_ul mt20 fo_activity">
                <li class="width_line">
                    <span>用户ID：</span>
                    <input type="text" placeholder="21124256899">
                </li>
                <li>
                    <span>订单号：</span>
                    <input type="text" placeholder="56789">
                </li>
            </ul>
            <span class="binding_tit mt10">
                <p>备注：</p>
                <p>1、 分月返还用户填写对应平台的订单号；</p>
                <p>2、 一个用户ID只能对应一个订单号；</p>
                <p>3、 一个订单购买多个盒子，需要实际使用的用户填写；</p>
                <p>4、 已经成功返还过的用户不用填写。</p>
            </span>
            <div class=" mt30">
                <div class="bottom_btn">确定</div>
            </div>

        </div>
    </article>
    <script type="text/javascript" src="js/zepto.js"></script>
    <script type="text/javascript" src="js/extend.js"></script>
    <script type="text/javascript" src="js/common.js"></script>
</body>
</html>