<!DOCTYPE html>
<html lang="en">
<head>
    <?php include_once("layout/meta.php"); ?>
    <title>返押金申请及领取</title>
    <link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body class="Browser">

    <?php include_once("layout/nav.php"); ?>

    <article class="article">
        <div class="withdrawing">
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
                <p>1、请准确填写购买车挣盒子时的订单号，以便到期返还押金；</p>
                <p>2、一个用户ID（一个盒子）只能对应一个订单号；</p>
                <p>3、如果您单词购买了多个盒子，请实际使用者分别提交订单号；</p>
                <p class="color-1">4、“确定”前，请再次核对订单号信息，如有错误将影响返现。</p>
            </span>
            <div class=" mt30">
                <div class="btn bottom_btn disabled">审核中</div>
            </div>
        </div>
    </article>
    <script type="text/javascript" src="js/zepto.js"></script>
    <script type="text/javascript" src="js/extend.js"></script>
    <script type="text/javascript" src="js/common.js"></script>
</body>
</html>