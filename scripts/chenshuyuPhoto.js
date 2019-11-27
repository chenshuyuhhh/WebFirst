function $(id) {
    return document.getElementById(id);
}

//当网页加载完毕
window.onload = function () {
    //瀑布流布局 保证传的参数能够找到父盒子
    waterFall('phos', 'box');

    var outerdiv = this.document.getElementById('outerdiv');
    outerdiv.style.visibility = "hidden"; // 一开始不可见
    // var pho = this.document.getElementById('pho');
    var imgs = this.document.getElementsByTagName('img'); // 等待被点击的图片 
    for (var i = 0; i < imgs.length - 1; i++) {
        // 点击放大图
        var img = imgs[i];
        this.console.log(img);
        img.onclick = function () {

            var bigimg = outerdiv.getElementsByTagName('img')[0];
            bigimg.src = this.src;
            outerdiv.style.visibility = "visible";  // 点击之后可见

            outerdiv.onclick = function () {
                outerdiv.style.visibility = "hidden";
            }
        }

        //var ismouse = false;
        var txt = this.document.getElementsByClassName('img-tip')[i];
        txt.innerHTML = texts[i % 10];
        this.console.log(txt.parentNode);
        img.style.cursor = "pointer";
    }
}

//实现瀑布流布局
//规则:从第二行开始的图片,总是拼接在上一行高度最矮的图片后面
function waterFall(parent, box) {
    //父盒子居中
    //通过父盒子拿到所有的子盒子
    var allBox = $(parent).getElementsByClassName(box);
    //求出盒子的宽度
    var boxWidth = allBox[0].offsetWidth;
    //求出浏览器的宽度(包括边框的宽高)
    var screenWidtn = document.body.offsetWidth;
    //求出列数 //取整函数取整
    var cols = Math.floor(screenWidtn / boxWidth);
    //父标签居中
    //先求出父标签宽度
    $(parent).style.width = boxWidth * cols + 'px';
    //居中
    $(parent).style.margin = '0 auto';

    //子盒子定位
    //创建一个高度数组,存所有的高度
    var heightArr = [];
    //遍历
    for (var i = 0; i < allBox.length; i++) {
        //求出每个盒子的高度
        var boxHeight = allBox[i].offsetHeight;
        //第一行的盒子不需要重新定位//每一行的盒子数与列数相同
        if (i < cols) {
            //添加第一行所有盒子高度
            heightArr.push(boxHeight);
        }
        else//剩下的盒子都需要瀑布流布局
        {
            //求出最矮的盒子高度
            var minBoxHeight = Math.min.apply(this, heightArr);
            //求出最矮盒子对应的索引
            var minBoxIndex = getMinBoxIndex(minBoxHeight, heightArr);
            //盒子瀑布流定位  顶部间距就是最矮盒子的高度
            allBox[i].style.position = 'absolute';
            allBox[i].style.top = minBoxHeight + 'px';
            allBox[i].style.left = minBoxIndex * boxWidth + 'px';
            //关键:更新数组最矮高度,使下一个图片在高度数组中总是找最矮高度的图片下面拼接
            heightArr[minBoxIndex] += boxHeight;
        }
    }
}

//求出最矮盒子对应的索引函数
function getMinBoxIndex(val, arr) {
    for (var i in arr) {
        if (val == arr[i]) {
            return i;
        }
    }
}

var texts = ["我不整理房间，我是乱室佳人",
    "借我十块钱，我要去买奶茶，派大星还你", 
    "我难道不是你心里的小蛋糕吗？",
    "看了那么多猪，还是你最可爱鸭",
    "忙着可爱，忙着长大",
    "愿 有生之年，只诉温暖不言殇，倾心相遇，安暖相陪。",
    "只要心中有课，走在哪里都不算逃课",
    "除了不可爱的时候，其他时候我都是很可爱的。",
    "买一个大西瓜，送我这样一个小傻瓜",
    "悟空，你又顽皮了，怎么能这样跟观音姐姐说话呢？"];