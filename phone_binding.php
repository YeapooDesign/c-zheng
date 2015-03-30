<!DOCTYPE html>
<html lang="en">
<head>
    <?php include_once("layout/meta.php"); ?>
    <title>手机号绑定</title>
    <link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body class="Browser">
    
   <?php include_once("layout/nav.php"); ?>

    <article class="article">
        <div class="info_center">
            <ul class="width_ul mt15">
                <li class="width_line">
                    <span>手机号：</span>
                    <input type="text" style="text-align:left;" placeholder="请输入手机号">
                </li>
                 <li>
                    <span>验证码：</span>
                    <input type="text" style="text-align:left;"placeholder="请输入验证码">
                    <div class="btn" id="J_phone_btn">获取验证码</div>
                </li>
            </ul>
        </div>
        <span class="binding_tit">注：绑定手机号，可支持APP与微信同时使用</span>
        <div class="bottom_btn">下一步，绑定手机</div>
    </article>
    <script type="text/javascript" src="js/zepto.js"></script>
    <script type="text/javascript" src="js/extend.js"></script>
    <script type="text/javascript" src="js/common.js"></script>
</body>
</html>