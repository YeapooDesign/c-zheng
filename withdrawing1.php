<!DOCTYPE html>
<html lang="en">
<head>
    <?php include_once("layout/meta.php"); ?>
    <title>提现到集分宝</title>
    <link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body class="Browser">
    
   <?php include_once("layout/nav.php"); ?>

    <article class="article">
        <div class="withdrawing">
            <div class="title">请填写基本信息</div>
            <ul class="width_ul">
                <li class="width_line">
                    <span>姓名</span>
                    <input type="text" placeholder="释放中">
                </li>
                <li>
                    <span>身份证</span>
                    <input type="text" placeholder="12798727987489573984">
                </li>
            </ul>
            <div class="btn_box mt15">
                <ul class="width_ul ">
                    <li>
                        <span>支付宝</span>
                        <input type="text" placeholder="12345345345">
                    </li>
                </ul>
                <div class="bottom_btn">下一步</div>
            </div>
        </div>
    </article>
    <script type="text/javascript" src="js/zepto.js"></script>
    <script type="text/javascript" src="js/extend.js"></script>
    <script type="text/javascript" src="js/common.js"></script>
</body>
</html>