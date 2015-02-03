<!DOCTYPE html>
<html lang="en">
<head>
    <?php include_once("layout/meta.php"); ?>
    <title>震动报警2</title>
    <link rel="stylesheet" type="text/css" href="css/style.css">
    <script type="text/javascript" src="js/zepto.js"></script>
    <script type="text/javascript" src="js/progress/touch.js"></script>
    <script type="text/javascript" src="js/progress/gmu.js"></script>
    <script type="text/javascript" src="js/progress/event.js"></script>
    <script type="text/javascript" src="js/progress/widget.js"></script>
    <script type="text/javascript" src="js/progress/progressbar.js"></script>
    <script type="text/javascript" src="js/progress/float.js"></script>
    <!--组件依赖js end-->
    <style type="text/css">
        #progressbar-1 {
            width:100%;
            margin:0px auto;
        }
    </style>
</head>
<body class="Browser">
    
    <?php include_once("layout/nav.php"); ?>

    <article class="article">
        <div class="warning mt15 ">低电压报警<div class="Switch " id="warning"></div></div>
        <div class="voltage_tit mt15 clear">
            <div class="tit bb">当前电压<span>13.8V</span></div>
            <div class="tit">历史最低<b>（2014-12-04）</b><span>11.8V</span></div>
        </div>
        <div class="voltage_watch mt15">
            <div class="title">报警电压设置</div>

            <!-- GMU 步进组件 -->
            <div class="watch">
                <div class="s_figure">10V</div>
                <div class="o_figure">15V</div>
                <div id="progressbar-1"></div>
                <div class="value">报警电压值：<span ><input type="text" disabled value="0.00" id="cur_val-1">V</span></div>
            </div>
            <!-- end -->
           
           <!--  设置最大最小值
           <div class="btn-group">
                 <div class="bottom_btn" id="set_val-1">最小值</div>
                 <div class="bottom_btn" id="set_val-2">最大值</div>
            </div> 
            -->
            <div class="note">*滑动设置报警电压值</div>
        </div>
        
</body>
<script type="text/javascript" src="js/zepto.js"></script>
 <script>
        function toVol(val){
            var rs = 10 + val.mul(0.05);
            return rs.toFixed(2);
        }

        function reverseVol(val){
            return (val -10).div(0.005);
        }

        function setVal(val){
            $('#progressbar-1').progressbar('value', reverseVol(val));
        }
        
        //创建横向组件
        $('#progressbar-1').progressbar({
            valueChange: function() {
                $('#cur_val-1').val(toVol(this.value()));
            },
        });

        $('#set_val-2').click(function() {
            $('#progressbar-1').progressbar('value', 100);
        });
        $('#set_val-1').click(function() {
            $('#progressbar-1').progressbar('value', 0);
        });

    </script>
</html>