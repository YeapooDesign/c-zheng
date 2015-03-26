<!DOCTYPE html>
<html lang="en">
<head>
    <?php include_once("layout/meta.php"); ?>
    <title>春运高速拥堵补贴</title>
    <link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body class="Browser">
    
   <?php include_once("layout/nav.php"); ?>
    
    <!-- 已注册 弹出框 -->
    <div class="wrap" id="J_join_cons">
        <div class="flip_box  tckzoomIn">
            <div class="box_cons">
                <div class="icon_con"></div>
                <div class="tit">已经注册</div>
                <div class="bottom_btn" id="J_join_btnoff">关闭</div>
            </div>
        </div>
    </div>    

    <article class="article">
        <div class="qm_subsidy">
           <div class="top_banner">
                <img src="images/qm_banner.jpg" alt="">
            </div>
            <ul class="tit_con">
                <li class="item width_line">
                    <div class="title">规则：</div>
                    <p>1、4月1日零点至4月7日24点；</p>
                    <p>2、国内高速路段上（休息区、加油站除）；</p>
                    <p>3、点火状态下；</p>
                    <p>4、连续2小时，累积行驶距离小于等于20公里。</p>
                </li>
                <li class="item width_line">
                    <div class="title">如果满足如上条件，则：</div>
                    <p>1、车挣补贴10升95#汽油/次，每天最多1次</p>
                    <p>&nbsp&nbsp&nbsp&nbsp&nbsp累积最高2次</p>
                </li>
                <li class="item">
                    <div class="title2">备注：</div>
                    <p>1、本次活动不收费，但需要注册参与。仅限注册成功后的行程，注册前的行程不计入。</p>
                    <p>2、补贴汽油按照4月10日的官方价格折算为挣点，4月13日前发放。</p>
                    <p>3、以服务器接收到的数据为准。</p>
                </li>
            </ul>
            <div class="btn_box mt15">
                <div class="btn bottom_btn"  id="J_join_btn">点击参加</div>
            </div>
        </div>
    </article>
    <script type="text/javascript" src="js/zepto.js"></script>
    <script type="text/javascript" src="js/extend.js"></script>
    <script type="text/javascript" src="js/common.js"></script>
</body>
</html>