<template>
  <canvas class="captcha" id="captcha" :width="options.width" :height="options.height"></canvas>
</template>

<script>
  export default {
    name: "captcha",
    props: {
      captcha: {},
      options: {
        type: Object,
        default() {
          return {
            width: "100", //默认canvas宽度
            height: "40", //默认canvas高度
          };
        }
      }
    },
    mounted() {
      console.log(this.captcha);
      this.init()
    },
    watch: {
      captcha(o, v) {
        this.init()
      }
    },
    methods: {
      // 初始化
      init() {
        let canvas = document.getElementById('captcha');
        canvas.style.cursor = "pointer";
        this.refresh()
      },
      // 刷新生成验证码
      refresh() {
        let that = this
        let canvas = document.getElementById('captcha');
        let ctx = canvas.getContext('2d');
        ctx.textBaseline = "middle";
        ctx.fillStyle = that.randomColor(180, 240);
        ctx.fillRect(0, 0, that.options.width, that.options.height);

        for (let i = 1; i <= 4; i++) {

          let txt = that.captcha[i - 1];
          console.log(txt);
          // ctx.font = '20px SimHei';

          ctx.font = that.randomNum(36, 40) + 'px SimHei'; //随机生成字体大小

          ctx.fillStyle = that.randomColor(50, 160); //随机生成字体颜色
          // 影子
          ctx.shadowOffsetX = that.randomNum(-3, 3);
          ctx.shadowOffsetY = that.randomNum(-3, 3);
          // 模糊等级
          ctx.shadowBlur = that.randomNum(-3, 3);
          ctx.shadowColor = "rgba(0, 0, 0, 0.3)";

          let x = that.options.width / 5 * i;
          let y = that.options.height / 2;
          let deg = that.randomNum(-30, 30);
          /* *设置旋转角度和坐标原点* */
          ctx.translate(x, y);

          ctx.rotate(deg * Math.PI / 180);

          ctx.fillText(txt, 0, 0);
          /* *恢复旋转角度和坐标原点* */
          ctx.rotate(-deg * Math.PI / 180);
          ctx.translate(-x, -y);
          /**绘制干扰点**/
          for (let i = 0; i < that.options.width / 4; i++) {

            ctx.fillStyle = that.randomColor(0, 255);

            ctx.beginPath();

            ctx.arc(that.randomNum(0, that.options.width), that.randomNum(0, that.options.height), 1, 0, 2 * Math.PI);

            ctx.fill();

          }

        }
        /**绘制干扰线**/
        // for (let i = 0; i < 4; i++) {
        //   ctx.strokeStyle = that.randomColor(40, 180);
        //   ctx.beginPath();
        //   ctx.moveTo(that.randomNum(0, that.options.width / 2), that.randomNum(0, that.options.height / 2));
        //   ctx.lineTo(that.randomNum(0, that.options.width), that.randomNum(0, that.options.height));
        //   ctx.stroke();
        // }


      },
      randomColor(min, max) {
        let r = this.randomNum(min, max);
        let g = this.randomNum(min, max);
        let b = this.randomNum(min, max);
        return "rgb(" + r + "," + g + "," + b + ")";

      },
      randomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min);

      }
    }
  }
</script>

<style scoped>
</style>
