<!DOCTYPE html>
<html lang="en">
<head>
    <?php include_once("layout/meta.php"); ?>
    <title>刮刮乐</title>
    <link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body class="blows_happy newyear">
    <article class="article">
        <div class="blows_top">
            <div class="blows_box">
                <div class="newyear_top"><img src="images/newyear_top.png" alt=""></div>
                <div class="title"><img src="images/blows2.png" alt=""></div>
                <div class="blows" id="gglBox">
                    <canvas width='218' height='110' class="surface" id="myCanvas"></canvas>
                </div>
                <div class="blows_bottom"></div>
            </div>
            <div class="img"><img src="images/newyear_bottom.png" alt=""></div>
        </div>
        <div class="newyear_bottom2"><img src="images/newyear_bottom2.png" alt=""></div>
        <a href="#" class="button">刮不了，请点击</a>
    </article>
    <script type="text/javascript" src="js/zepto.js"></script>
    <script type="text/javascript" src="js/ggk-1.1.js"></script>
    <script type="text/javascript">
    var ggk = new createGGK({
        text:'2345',
        backFont:'bold 40px 微软雅黑',
        complete:function(f){
        var win = $("#gglBox").attr("data-win-flag");
        if(win == "true"){//中奖

        }else {

        }
      }
    });
    //var ggk=new createGGK({text:'您已经中二等奖'});
    //ggk.clear();
</script>
</body>
</html>