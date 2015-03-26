<!DOCTYPE html>
<html lang="en" style="height: 100%;">
<head>
    <?php include_once("layout/meta.php"); ?>
    <title>刮刮乐-车挣环保日</title>
    <link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body class="blows_327" style="height: 100%;background: #81ba2f;">
    <article class="article" style="position: relative;height:100%;min-height:490px;">
        <div class="blows_top">
            <div class="sun"></div>
            <div class="gl"></div>
            <div class="gr"></div>
            <div class="logo"></div>
            <div class="tit"></div>
            <div class="blows_bj">
                <div class="blows" id="gglBox">
                    <canvas width='183' height='134' class="surface" id="myCanvas"></canvas>
                </div>
            </div>
             <a href="#" class="button">刮不了，请点击</a>
        </div>
        <div class="blows_down"></div>
        <div class="default_bottom"></div>
    </article>
    <script type="text/javascript" src="js/zepto.js"></script>
    <script type="text/javascript" src="js/ggk-default.js"></script>
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