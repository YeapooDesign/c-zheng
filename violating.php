<!DOCTYPE html>
<html lang="en">
<head>
    <?php include_once("layout/meta.php"); ?>
    <title>违章查询</title>
    <link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body class="Browser">
    
    <?php include_once("layout/nav.php"); ?>

    <article class="article">
        <div class="violating">
            <ul>
                <li>
                    <span>所在城市</span>
                    <div class="t1">
                        <select>
                            <option>厦门</option>
                            <option>南平</option>
                            <option>福州</option>
                        </select>
                        <span>省</span>
                    </div>
                    <div class="t2">
                        <select>
                            <option>厦门s睡了多久</option>
                            <option>南平</option>
                            <option>福州</option>
                        </select>
                        <span>市</span>
                    </div>
                </li>
                <li>
                    <span>车牌号码</span>
                    <div class="num">
                        <select>
                            <option>沪</option>
                            <option>鲁</option>
                            <option>闽</option>
                        </select>
                    </div>
                    <div class="num_box"><input type="text" placeholder="沪1944798"> </div>
                </li>
                <li>
                    <span>发动机号</span>
                    <div class="box"><input type="text" placeholder="1244345"></div>
                </li>
                <li>
                    <span>车架号</span>
                    <div class="box"><input type="text" placeholder="1244345"></div>
                </li>
            </ul>
        </div>
        <a href="#" class="button2">提 交</a>
        <div class="Prompt">车牌号、发动机号、车架号提交后不能再次修改。</div>




    </article>
    <script type="text/javascript" src="js/zepto.js"></script>
    <script type="text/javascript" src="js/extend.js"></script>
    <script type="text/javascript" src="js/common.js"></script>
</body>
</html>