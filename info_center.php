<!DOCTYPE html>
<html lang="en">
<head>
    <?php include_once("layout/meta.php"); ?>
    <title>信息中心</title>
    <link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body class="Browser">
    
   <?php include_once("layout/nav.php"); ?>

      <!-- 绑定手机 弹出框 -->
    <div class="wrap2" id="J_phone_cons">
        <div class="info_box tckzoomIn">
            <div class="box_cons">
                <div class="tit">绑定手机</div>
                  <ul class="width_ul">
                        <li>
                            <span>手机号：</span>
                            <input class="" type="text" placeholder="">
                        </li>
                         <li>
                            <span>验证码：</span>
                            <input class="phone_bound" type="text" placeholder="">
                            <div class="btn">点击获取</div>
                        </li>
                    </ul>
                <div class="bottom_btn">确认绑定</div>
                <div class="off_btn" id="J_phone_btnoff"><span></span></div>
            </div>
        </div>
    </div>  

    <article class="article">
        <div class="info_center">
            <ul class="width_ul mt15">
                <li class="width_line">
                    <span>用户ID：</span>
                    <input type="text" placeholder="1234">
                </li>
                <li class="width_line">
                    <span>分享码：</span>
                    <input type="text" placeholder="2134">
                </li>
                 <li>
                    <span>手机号：</span>
                    <input type="text" placeholder="未绑定手机">
                    <div class="btn" id="J_phone_btn">马上绑定</div>
                </li>
            </ul>
            <ul class="width_ul mt15">
                <li class="width_line">
                    <span>IMEI：</span>
                    <input type="text" placeholder="1232344">
                </li>
                <li class="width_line">
                    <span>CODE：</span>
                    <input type="text" placeholder="123123">
                </li>
                 <li class="width_line newpd">
                    <span>最后传输数据时间：</span>
                    <input type="text" placeholder="2015-12-05 12:00:26">
                </li>
                 <li>
                    <span>状态：</span>
                    <input type="text" placeholder="正常">
                </li>
            </ul>
              <ul class="width_ul mt15">
                <li class="width_line">
                    <span>点火通知</span>
                    <div class="Switch " id="warning"></div>
                </li>
                <li class="">
                    <span>行程通知</span>
                    <div class="Switch " id="warning2"></div>
                </li>
            </ul>
              <ul class="width_ul mt15">
                <li class="s_arrows">
                    <span>更改车型</span>
                </li>
            </ul>
        </div>
    </article>
    <script type="text/javascript" src="js/zepto.js"></script>
    <script type="text/javascript" src="js/extend.js"></script>
    <script type="text/javascript" src="js/common.js"></script>
</body>
</html>