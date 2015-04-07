<!DOCTYPE html>
<html lang="en">
<head>
    <?php include_once("layout/meta.php"); ?>
    <title>停驶退保</title>
    <link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body class="Browser">
    
   <?php include_once("layout/nav.php"); ?>

    <article class="article">
        <div class="info_center">
            <ul class="width_ul mt15">
                <li class="width_line">
                    <span>保险公司：</span>
                    <div class="select-box">
                        <select class="yq-s-right">
                          <option>请选择保险公司</option>
                          <option>平安保险</option>
                          <option>平安平安平安平安平安平安</option>
                          <option>三星</option>
                          <option>225</option>
                        </select>
                        <div class="select-label">请选择保险公司</div>
                    </div>
                </li>
                <li class="width_line">
                    <span>保单号：</span>
                    <input type="text" placeholder="254698778985545">
                </li>
                <li class="width_line">
                    <span>车牌号：</span>
                    <input type="text" placeholder="京A5687">
                </li>
                <li class="width_line">
                    <span>商业保险金额：</span>
                    <input type="text" placeholder="1000.00元">
                </li>
                <li class="width_line">
                    <span>保单生效日期：</span>
                    <input type="text" placeholder="2015年4月1日">
                </li>
                <li class="">
                    <span>购车日期：</span>
                    <input type="text" placeholder="2014年6月25日">
                </li>
            </ul>
        </div>
        <span class="binding_tit">注：* 请确认您是否为“停驶退保”客户。</span>
        <span class="binding_tit2">* 请拍整个保单给客服。</span>
        <div class="bottom_btn">确认</div>
    </article>
    <script type="text/javascript" src="js/zepto.js"></script>
    <script type="text/javascript" src="js/extend.js"></script>
    <script type="text/javascript" src="js/common.js"></script>
</body>
    <script>
          $(".yq-s-right").change(function(event) {
                $(this).next('.select-label').html($(this).val())
            });
    </script>
</html>