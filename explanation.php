<!DOCTYPE html>
<html lang="en">
<head>
    <?php include_once("layout/meta.php"); ?>
    <title>安装说明</title>
    <link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body>
    <article class="article">
        <div class="explanation">
            <h3 class="mt0">步骤一：关注车挣并绑定盒子</h3>
            <div class="explan_box">
                <p class="title" style="padding:25px 0 15px;">1、关注【车挣】公众号</p>
                <img src="images/explanation/1.jpg" alt="车挣盒子">
                <p class="title">2、点击“打开车挣”</p>
                <img src="images/explanation/2.jpg" alt="车挣盒子">
                <p class="title" style="padding-bottom:5px">3、输入IMEI和CODE </p>
                <p class="title2 font14" style="padding-bottom:15px;">请查看盒子底部标签</p>
                <img src="images/explanation/3.jpg" alt="车挣盒子">
                <p class="title">4、选择车型</p>
                <img src="images/explanation/4.jpg" alt="车挣盒子">
                <div class="sm">
                    车辆停靠说明：
                        <p>
                        * 请确保车辆停靠在开阔的环境下，尽量避免在地下车库等网络信号较差的环境。</p>
                        <p>* 请一定要确保车型选择正确，并点击下一步，完成安装。</p>
                </div>
            </div>
            <h3>步骤二：SIM安装</h3>
            <div class="explan_box">
                <img class="mt15" src="images/explanation/5.jpg" alt="车挣盒子">
                <p class="title font14">打开胶塞，安装SIM卡，请注意金属面朝下</p>
            </div>
            <h3>步骤三：连接数据线</h3>
            <div class="explan_box">
                <img class="mt15" src="images/explanation/6.jpg" alt="车挣盒子">
            </div>
                <p class="title font14">车挣盒子插入OBD口后，盒子指示灯将亮起并闪烁</p>
                <p class="title2 font14">安装完成后，设备会初始化，请等待1~3分钟。</p>
            <h3 class="small">车内OBD接口可能的位置分布图，供参考</h3>
            <div class="explan_box">
                 <img class="mt15" src="images/explanation/8.jpg" alt="车挣盒子">
                 <table class="Distribution" border="0" cellspacing="0" cellpadding="0">
                     <tr>
                        <td class="first">A区域</td>
                        <td>奥迪、丰田、通用、本田等品牌车型</td>
                     </tr>
                     <tr>
                         <td class="first">B区域</td>
                         <td>通用、大众、宝马、福特、丰田、现代、雪铁龙、本田等品牌车型</td>
                     </tr>
                     <tr>
                         <td class="first">C区域</td>
                         <td>大众途安和进口雷克萨斯等少量车型</td>
                     </tr>
                     <tr>
                         <td class="first">D区域</td>
                         <td>标志、雪铁龙、雷诺等车型</td>
                     </tr>
                 </table>
            </div>
            <h3 class="small">指示灯显示</h3>
            <div class="explan_box">
                <table class=" Distribution2 mt15" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td>设备阶段</td>
                        <td class="nth2n">指示灯状态描述</td>
                        <td>盒子状态描述</td>
                    </tr>
                    <tr>
                        <td>设备初始化</td>
                        <td class="nth2n"><span class="blue">蓝</span> - <span class="purple">紫</span> - <span class="red">红</span> - 灭（交替闪烁）</td>
                        <td>持续1到3分钟</td>
                    </tr>
                    <tr>
                        <td>初始化完成</td>
                        <td class="nth2n"><span class="pink">粉色</span></td>
                        <td>持续2秒</td>
                    </tr>
                    <tr>
                        <td rowspan="8">设备运行</td>
                        <td class="nth2n"><span class="blue">蓝</span> - <span class="blue">蓝</span> - <span class="blue">蓝</span> - 灭（循环）</td>
                        <td>GPS定位 - 车启动 - 网络连接</td>
                    </tr>
                    <tr>
                        <td class="nth2n"><span class="blue">蓝</span> - <span class="blue">蓝</span> - <span class="red">红</span> - 灭（循环）</td>
                        <td>GPS定位 - 车启动 - 网络未连接（登陆不上平台）</td>
                    </tr>
                    <tr>
                        <td class="nth2n"><span class="blue">蓝</span> - <span class="red">红</span> - <span class="blue">蓝</span> -  灭（循环）</td>
                        <td>GPS定位 - 车熄火 - 网络连接</td>
                    </tr>
                    <tr>
                        <td class="nth2n"><span class="blue">蓝</span> - <span class="red">红</span> - <span class="red">红</span> -  灭（循环）</td>
                        <td>GPS定位 - 车熄火 - 网络未连接（登陆不上平台）</td>
                    </tr>
                    <tr>
                        <td class="nth2n"> <span class="red">红</span> - <span class="blue">蓝</span> - <span class="blue">蓝</span> - 灭（循环）</td>
                        <td>GPS未定位 - 车启动 - 网络连接</td>
                    </tr>
                    <tr>
                        <td class="nth2n"> <span class="red">红</span> - <span class="blue">蓝</span> - <span class="red">红</span> -  灭（循环）</td>
                        <td>GPS未定位 - 车启动 - 网络未连接（登陆不上平台）</td>
                    </tr>
                    <tr>
                        <td class="nth2n"> <span class="red">红</span> - <span class="red">红</span> - <span class="blue">蓝</span> -  灭（循环）</td>
                        <td>GPS未定位 - 车熄火 - 网络连接</td>
                    </tr>
                    <tr>
                        <td class="nth2n"> <span class="red">红</span> - <span class="red">红</span> - <span class="red">红</span> -  灭（循环）</td>
                        <td>GPS未定位 - 车熄火 - 网络未连接（登陆不上平台）</td>
                    </tr>
                </table>
            </div>
            <h3>步骤四：安装完成</h3>
            <p class="title font14" style="padding-top:30px;">车挣盒子初始化完毕</p>
            <div class="explan_box">
                 <p class="title2 font14">安装完成，您已可以正常使用。</p>
                 <img class="mt15" style="width:80%" src="images/explanation/9.jpg" alt="车挣盒子">
            </div>

        </div>
    </article>
</body>
</html>