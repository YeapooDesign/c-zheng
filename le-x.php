<!DOCTYPE html>
<html lang="en">
<head>
    <?php include_once("layout/meta.php"); ?>
    <title>车主乐行计划</title>
    <link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body class="Browser">
    
   <!-- <?php include_once("layout/nav.php"); ?> -->

    <!-- 扣除挣点 弹出框 -->
    <div class="wrap" id="J_kc">
        <div class="flip_box tckzoomIn lx_pop">
            <div class="box_cons pb30">
                <div class="lx_icon_con"></div>
                <div class="tit">参加此活动将扣除您1000挣点!</div>
                <div class="lx_bottom_btn">
                    <div class="btn btn1">取消</div>
                    <div class="btn btn2">关闭</div>
                </div>
            </div>
        </div>
    </div> 

    <article class="article">
        <div class="fo_activity">
            <div class="top_banner">
                <img src="images/le_x_banner.jpg" alt="">
            </div>
            <ul class="width_ul">
                <li class="width_line">
                    <span>姓名：</span>
                    <input type="text" placeholder="李某某">
                </li>
                <li class="width_line">
                    <span>身份证：</span>
                    <input type="text" placeholder="130927199XXXX51258">
                </li>
                 <li class="width_line">
                    <span>手机号：</span>
                    <input type="text" placeholder="13898989898">
                </li>
                <li class="sel_input width_line clearfix">
                    <span>爱车车牌：</span>
                    <div class="form-control clearfix">
                        <div class="form-control-r">
                            <input type="text" placeholder="CUH511">
                        </div>
                        <div class="form-control-l">
                            <div class="s-cons">
                                <select class="cnt">
                                  <option>沪</option>
                                  <option>京</option>
                                  <option>皖</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </li>
                <li class="">
                    <span>需抵扣挣点：</span>
                    <input type="text" placeholder="1000挣点">
                </li>
            </ul>
            <div class="binding_tit">
                <label>
                    <input type="checkbox" value="option1">阅读并同意<em>《车主乐行计划规则》</em>
                </label>
            </div>
            <a href="" class="le-x-text">查看e互助详情>></a>
            <div class="btn_box mt20">
                <div class="btn bottom_btn" id="J_lx_btn">立即参加</div>
            </div>
        </div>
    </article>
    <script type="text/javascript" src="js/zepto.js"></script>
    <script type="text/javascript" src="js/extend.js"></script>
    <script type="text/javascript" src="js/common.js"></script>
</body>
</html>