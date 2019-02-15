<template>
  <basePage title="帮你选">
    <div class="input-item" v-for="(item,key) in text_arr" :key="key">
      <input type="text" v-model="text_arr[key]" placeholder="请输入选项">
      <i class="cubeic-close mg-l10" @click="removeOption(key)"></i>
    </div>
    <cube-button :primary="true" @click="addOption()" class="mg-t20">新增选项</cube-button>
    <div class="wrapper" v-show="showTurntable">
      <div class="choose-btn" @click="rotate()">
        <div class="wheel-pointer">
          <i></i>
        </div>
        <div class="wheel-btn">
          <a href="javascript:;">
            <strong>帮你选</strong>
          </a>
        </div>
      </div>
      <canvas id="canvas_circle" width="300" height="300"></canvas>
      <div>结果：
        <span class="resultTxt">{{result}}</span>
      </div>
    </div>
    <cube-button :primary="true" @click="createdTurntable()" class="mg-t20">生成转盘</cube-button>
  </basePage>
</template>

<script>
export default {
  data() {
    return {
      showTurntable: false,
      angle: 0,
      isStatr: false,
      text_arr: ['选项1', '选项2', '选项3'], //选项
      result: ''
    }
  },
  computed: {
    oAngle() {
      return 360 / this.text_arr.length
    }
  },
  methods: {
    removeOption(key) {
      this.text_arr.splice(key, 1);
    },
    addOption() {
      this.text_arr.push('选项');
    },
    createdTurntable() {
      if (this.text_arr.length === 1) {
        this.$createToast({
          txt: '请输入至少两个选项',
          type: 'txt'
        }).show();
        return
      };
      if (this.text_arr.length === 2) this.text_arr.push(...this.text_arr);
      let c = document.getElementById('canvas_circle'),
        ctx = c.getContext("2d"); //图画绘制对象
      c.height = c.height;  //清空转盘
      this.drawCircle("canvas_circle", this.text_arr); //调用画轮盘函数
      this.drawText("canvas_circle", this.text_arr); //调用画选项函数
      this.showTurntable = true;
    },
    drawCircle(canvasId, text_arr) {
      let c = document.getElementById(canvasId),
        ctx = c.getContext("2d"), //图画绘制对象
        radius = c.width * 0.5 - 20, //半径
        length = (1 / text_arr.length), //弧长百分比
        startAngle = 1.5 * Math.PI, //开始弧度
        endAngle = 1.5 * Math.PI; //结束弧度

      ctx.translate(c.width * 0.5, c.width * 0.5); //设置圆心作为原点

      for (var i = 0; i < text_arr.length; i++) {
        endAngle = endAngle + length * Math.PI * 2;
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, radius, startAngle, endAngle, false);
        ctx.closePath();
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.stroke();
        startAngle = endAngle;
      }
    },

    drawText(canvasId, text_arr) {
      let c = document.getElementById(canvasId);
      let ctx = c.getContext("2d"), //图画绘制对象
        length = (1 / text_arr.length), //弧长百分比
        radius = c.width * 0.5 - 20, //圆半径
        textX = 0,
        textY = 0,
        startX = 0,
        startY = -radius,
        endX = 0,
        endY = 0,
        endAngle = 1.5 * Math.PI;

      for (var i = 0; i < text_arr.length; i++) {
        endAngle = endAngle + length * Math.PI * 2;
        endX = radius * Math.cos(endAngle);
        endY = radius * Math.sin(endAngle);
        textX = (startX + endX) / 2;
        textY = (startY + endY) / 2;

        ctx.font = 'bold 16px 微软雅黑';
        ctx.fillStyle = "#000";
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text_arr[i], textX, textY);

        startX = endX;
        startY = endY;
      }
    },
    rotate() {
      if (!this.isStatr) {
        this.isStatr = true;
        let randomAngle = parseInt((Math.random() + 1) * 3600);
        if (randomAngle % this.oAngle === 0) randomAngle += 5;
        let resultAngle = (this.angle + randomAngle) % 360;
        let resultIndex = this.text_arr.length - Math.ceil(resultAngle / this.oAngle);
        document.getElementById("canvas_circle").style.transform = "rotate(" + (this.angle + randomAngle) + "deg)";
        setTimeout(() => {
          this.angle += randomAngle;
          this.isStatr = false;
          this.result = this.text_arr[resultIndex];
        }, 3050);
      }
    }
  }
}
</script>

<style scoped>
.wrapper {
  position: relative;
  text-align: center;
  overflow: hidden;
}
#canvas_circle {
  position: relative;
  transition: 3s;
  -moz-transition: 3s;
  -webkit-transition: 3s;
  -o-transition: 3s;
  -ms-transition: 3s;
}

.choose-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  z-index: 9999;
}

.resultTxt {
  font-size: 18px;
  color: #ff0000;
  font-weight: bold;
}

.wheel-pointer {
  margin: auto;
  width: 100px;
  height: 100px;
  border: 1px solid #e60;
  box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.1);
  border-radius: 50%;
}

.wheel-pointer:before {
  position: absolute;
  top: -40px;
  left: 50%;
  display: block;
  width: 60px;
  height: 60px;
  border: 1px solid #e60;
  background: #fb0;
  content: "";
  box-shadow: inset 1px 1px 0 rgba(255, 255, 255, 0.5);
  -moz-transform-origin: left top;
  -webkit-transform-origin: left top;
  -o-transform-origin: left top;
  -ms-transform-origin: left top;
  transform-origin: left top;
  -moz-transform: rotate(30deg) skewY(30deg);
  -webkit-transform: rotate(30deg) skewY(30deg);
  -o-transform: rotate(30deg) skewY(30deg);
  -ms-transform: rotate(30deg) skewY(30deg);
  transform: rotate(30deg) skewY(30deg);
}

.wheel-pointer:after {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  background: #ffcc00;
  content: "";
  border-radius: 50%;
  box-shadow: inset 1px 1px 0 rgba(255, 255, 255, 0.5);
  background: -moz-linear-gradient(
    -45deg,
    #ffcc00 0%,
    #ff8800 50%,
    #ffcc00 100%
  );
  background: -webkit-gradient(
    linear,
    left top,
    right bottom,
    color-stop(0%, #ffcc00),
    color-stop(50%, #ff8800),
    color-stop(100%, #ffcc00)
  );
  background: -webkit-linear-gradient(
    -45deg,
    #ffcc00 0%,
    #ff8800 50%,
    #ffcc00 100%
  );
  background: -o-linear-gradient(-45deg, #ffcc00 0%, #ff8800 50%, #ffcc00 100%);
  background: -ms-linear-gradient(
    -45deg,
    #ffcc00 0%,
    #ff8800 50%,
    #ffcc00 100%
  );
  background: linear-gradient(135deg, #ffcc00 0%, #ff8800 50%, #ffcc00 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffcc00', endColorstr='#ffcc00', GradientType=1);
}
.wheel-pointer i {
  position: absolute;
  z-index: 35;
  top: -36px;
  left: 0;
  right: 0;
  margin: 0 auto;
  display: block;
  width: 60px;
  height: 60px;
  overflow: hidden;
}
.wheel-pointer i:before {
  display: block;
  width: 100%;
  height: 100%;
  content: "";
  -moz-transform-origin: left top;
  -webkit-transform-origin: left top;
  -o-transform-origin: left top;
  -ms-transform-origin: left top;
  transform-origin: left top;
  -moz-transform: translateX(50%) rotate(30deg) skewY(30deg);
  -webkit-transform: translateX(50%) rotate(30deg) skewY(30deg);
  -o-transform: translateX(50%) rotate(30deg) skewY(30deg);
  -ms-transform: translateX(50%) rotate(30deg) skewY(30deg);
  transform: translateX(50%) rotate(30deg) skewY(30deg);
  background: rgb(255, 178, 0);
  background: -moz-linear-gradient(
    40deg,
    rgba(255, 178, 0, 1) 0%,
    rgba(255, 179, 0, 1) 45%,
    rgba(254, 214, 86, 1) 46%,
    rgba(255, 146, 0, 1) 90%
  );
  background: -webkit-gradient(
    linear,
    left top,
    right bottom,
    color-stop(0%, rgba(255, 178, 0, 1)),
    color-stop(45%, rgba(255, 179, 0, 1)),
    color-stop(46%, rgba(254, 214, 86, 1)),
    color-stop(90%, rgba(255, 146, 0, 1))
  );
  background: -webkit-linear-gradient(
    40deg,
    rgba(255, 178, 0, 1) 0%,
    rgba(255, 179, 0, 1) 45%,
    rgba(254, 214, 86, 1) 46%,
    rgba(255, 146, 0, 1) 90%
  );
  background: -o-linear-gradient(
    40deg,
    rgba(255, 178, 0, 1) 0%,
    rgba(255, 179, 0, 1) 45%,
    rgba(254, 214, 86, 1) 46%,
    rgba(255, 146, 0, 1) 90%
  );
  background: -ms-linear-gradient(
    40deg,
    rgba(255, 178, 0, 1) 0%,
    rgba(255, 179, 0, 1) 45%,
    rgba(254, 214, 86, 1) 46%,
    rgba(255, 146, 0, 1) 90%
  );
  background: linear-gradient(
    50deg,
    rgba(255, 178, 0, 1) 0%,
    rgba(255, 179, 0, 1) 45%,
    rgba(254, 214, 86, 1) 46%,
    rgba(255, 146, 0, 1) 90%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffb200', endColorstr='#ff9200', GradientType=1);
}
.wheel-btn {
  position: absolute;
  z-index: 40;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  padding: 10px;
  width: 100px;
  height: 100px;
  box-shadow: inset 0 1px 1px rgba(255, 102, 0, 0.4),
    inset 0 -1px 1px rgba(255, 238, 0, 0.4);
  background: -moz-linear-gradient(
    top,
    rgba(255, 85, 0, 0.7) 0%,
    rgba(255, 221, 0, 1) 100%
  );
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0%, rgba(255, 85, 0, 0.7)),
    color-stop(100%, rgba(255, 221, 0, 1))
  );
  background: -webkit-linear-gradient(
    top,
    rgba(255, 85, 0, 0.7) 0%,
    rgba(255, 221, 0, 1) 100%
  );
  background: -o-linear-gradient(
    top,
    rgba(255, 85, 0, 0.7) 0%,
    rgba(255, 221, 0, 1) 100%
  );
  background: -ms-linear-gradient(
    top,
    rgba(255, 85, 0, 0.7) 0%,
    rgba(255, 221, 0, 1) 100%
  );
  background: linear-gradient(
    to bottom,
    rgba(255, 85, 0, 0.7) 0%,
    rgba(255, 221, 0, 1) 100%
  );
  border-radius: 60px;
}
.wheel-btn strong {
  padding-top: 6px;
  display: block;
  color: #fff;
  font-size: 18px;
  text-shadow: 2px 0 0 #c30, -2px 0 0 #c30, 0 2px 0 #c30, 0 -2px 0 #c30,
    1px 1px 0 #c30, -1px -1px 0 #c30, -1px 1px 0 #c30, -1px -1px 0 #c30,
    0 2px 6px #a30;
}
.wheel-btn a {
  color: #ff0;
  position: relative;
  display: table-cell;
  vertical-align: middle;
  width: 80px;
  height: 80px;
  overflow: hidden;
  color: #ff0;
  font: 700 14px/25px "microsoft yahei";
  font-size: 16px;
  text-align: center;
  text-decoration: none;
  border-radius: 50%;
  box-shadow: -1px -1px 10px rgba(255, 255, 255, 0.5),
    1px 1px 3px rgba(0, 0, 0, 0.4), inset -1px -2px 0 #a30;
  text-shadow: 1px 0 0 #c30, -1px 0 0 #c30, 0 1px 0 #c30, 0 -1px 0 #c30,
    0 0 3px #fff;
  background: rgb(204, 51, 0);
  background: -moz-linear-gradient(
    top,
    rgba(204, 51, 0, 1) 0%,
    rgba(255, 221, 0, 1) 100%
  );
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0%, rgba(204, 51, 0, 1)),
    color-stop(100%, rgba(255, 221, 0, 1))
  );
  background: -webkit-linear-gradient(
    top,
    rgba(204, 51, 0, 1) 0%,
    rgba(255, 221, 0, 1) 100%
  );
  background: -o-linear-gradient(
    top,
    rgba(204, 51, 0, 1) 0%,
    rgba(255, 221, 0, 1) 100%
  );
  background: -ms-linear-gradient(
    top,
    rgba(204, 51, 0, 1) 0%,
    rgba(255, 221, 0, 1) 100%
  );
  background: linear-gradient(
    to bottom,
    rgba(204, 51, 0, 1) 0%,
    rgba(255, 221, 0, 1) 100%
  );
}
</style>


