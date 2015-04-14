<!DOCTYPE html>
<html lang="en">
<head>
    <?php include_once("layout/meta.php"); ?>
    <title>停驶退保</title>
    <link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body class="Browser">
    
   <!-- <?php include_once("layout/nav.php"); ?> -->

    <article class="article">
        <div class="fo_activity">
            <div class="top_banner">
                <img src="images/51_banner.jpg" alt="">
            </div>
            <ul class="width_ul">
                <li class="s_arrows width_line2 fo_activity_first">
                    <i class="fo_si"></i>
                    <span>自驾车意外身故10万元</span>
                </li>
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
                <li class="sel_input clearfix">
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
            </ul>
            <div class="binding_tit">
                <label>
                    <input type="checkbox" value="option1">同意<em>《保险条款》</em>
                </label>
            </div>
            <div class="btn_box mt15">
                <div class="btn bottom_btn">立即领取车挣平安符</div>
            </div>
            <span class="binding_tit">
                <p>重要告知：</p>
                <p>1、 保险期间为7天；</p>
                <p>2、 被保险人年龄为18-65周岁保险方为有效；</p>
                <p>3、 每一个被保险人限投保一份，多投保无效；</p>
                <p>4、 被保险人驾驶的车辆须为7座（含）以下非营运客车</p>
            </span>
        </div>
    </article>
    <script type="text/javascript" src="js/zepto.js"></script>
    <script type="text/javascript" src="js/extend.js"></script>
    <script type="text/javascript" src="js/common.js"></script>
</body>
</html>