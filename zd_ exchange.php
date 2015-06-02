<!DOCTYPE html>
<html lang="en">
<head>
    <?php include_once("layout/meta.php"); ?>
    <title>挣点兑换</title>
    <link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body class="Browser">
    
   <?php include_once("layout/nav.php"); ?>

    <article class="article">
        <div class="withdrawing">
            <div class="title">从车挣中提取挣点到支付宝</div>
            <ul class="width_ul ">
                <li>
                    <span>支付宝</span>
                    <input type="text" placeholder="9999999@qq.com">
                </li>
            </ul>
            <div class="zd_info">
                <p class="t-l">剩余：<b>909</b> 挣点 </p>
                <p class="t-r">一个挣点 = 一个集分宝</p>
            </div>
            <div class="radio-cnt mt20 b-br">
                <div class="ui-radio-ii">
                    <label class="ui-radio">
                        <input class="r-input" type="radio" name="radio"><span class="r-input-text">提取到集分宝</span>
                    </label>
                </div>
                <div class="t-input">
                    <input class="" type="text" placeholder="请输入提现挣点数">
                </div>
            </div>
             <div class="radio-cnt">
                <div class="ui-radio-ii">
                    <label class="ui-radio">
                        <input class="r-input" type="radio" name="radio"><span class="r-input-text">提现金到支付宝</span>
                    </label>
                </div>
                <div class="t-input">
                    <input class="" type="text" placeholder="请输入大于100元的整数金额">
                </div>
            </div>
            <span class="binding_tit mt15">
                <p class="color-2 mb10">友情提示：</p>
                <p class="mb5">1、剩余挣点大于10000时，可提现金到支付宝，T+1个工作日到账；</p>
                <p>2、挣点或现金兑换T+1个工作日到账，到账时间为工作日当天下午18点之后；</p>
            </span>
            <div class="bottom_btn mt30">下一步</div>
        </div>
    </article>
    <script type="text/javascript" src="js/zepto.js"></script>
    <script type="text/javascript" src="js/extend.js"></script>
    <script type="text/javascript" src="js/common.js"></script>
</body>
</html>