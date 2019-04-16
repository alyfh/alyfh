<template>
  <div class="hello">
    <div id="calendar">
        <!-- 年份 月份 -->
        <div class="month">
            <ul>
                <!--点击会触发pickpre函数，重新刷新当前日期 @click(vue v-on:click缩写) -->
                <li class="arrow" @click="pickPre(currentYear,currentMonth)">❮</li>
                <li class="year-month" @click="pickYear(currentYear,currentMonth)">
                    <span class="choose-year">{{ currentYear }}年</span>
                    <span class="choose-month">{{ currentMonth }}月</span>
                </li>
                <li class="arrow" @click="pickNext(currentYear,currentMonth)">❯</li>
            </ul>
        </div>
        <!-- 星期 -->
        <ul class="weekdays">
            <li>日</li>
            <li>一</li>
            <li>二</li>
            <li>三</li>
            <li>四</li>
            <li>五</li>
            <li>六</li>
        </ul>
        <!-- 日期 -->
        <ul class="days">
            <!-- 核心 v-for循环 每一次循环用<li>标签创建一天 -->
            <li  v-for="dayobject in days">
                <!--本月-->
                <!--如果不是本月  改变类名加灰色-->

                <span v-if="dayobject.day.getMonth()+1 != currentMonth" class="other-month">
                  <span v-if="'16'<=dayobject.day.getDate()">
                    <span v-if="currentMonth=='1'" @click="al((currentYear-1)+'年'+(currentMonth+11)+'月'+dayobject.day.getDate()+'日');pickPre(currentYear,currentMonth)">
                      {{ dayobject.day.getDate() }}
                    </span>
                    <span v-else @click="al(currentYear+'年'+(currentMonth-1)+'月'+dayobject.day.getDate()+'日');pickPre(currentYear,currentMonth)">
                      {{ dayobject.day.getDate() }}
                    </span>
                  </span>
                  <span v-else>
                   <span v-if="currentMonth=='12'" @click="al((currentYear+1)+'年'+(currentMonth-11)+'月'+dayobject.day.getDate()+'日');pickNext(currentYear,currentMonth)">
                     {{ dayobject.day.getDate() }}
                   </span>
                   <span v-else @click="al(currentYear+'年'+(currentMonth+1)+'月'+dayobject.day.getDate()+'日');pickNext(currentYear,currentMonth)">
                     {{ dayobject.day.getDate() }}
                   </span>
                  </span>
                </span>
                <!--如果是本月  还需要判断是不是这一天-->
                <span v-else @click="al(currentYear+'年'+currentMonth+'月'+dayobject.day.getDate()+'日')">
            <!--今天  同年同月同日-->
                    <span v-if="dayobject.day.getFullYear() == new Date().getFullYear() && dayobject.day.getMonth() == new Date().getMonth() && dayobject.day.getDate() == new Date().getDate()" class="active">{{ dayobject.day.getDate() }} <a></a> </span>
                    <span v-else>
                        <span v-if="dayobject.day.getDate() == '1'">
                            {{ currentMonth }} <span style="font-size:.5rem;">月</span>
                        </span>
                        <span v-else>
                            {{ dayobject.day.getDate() }}
                        </span>
                    </span>
                </span>
            </li>
        </ul>
    </div>
    <div class="lan">
        {{lan}}
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      currentDay: 1,
      currentMonth: 1,
      currentYear: 1970,
      currentWeek: 1,
      days: [],
      lan: ""
    };
  },
  created: function() {
    //在vue初始化时调用
    this.initData(null);
  },
  methods: {
    initData: function(cur) {
      var leftcount = 0; //存放剩余数量
      var date;

      if (cur) {
        date = new Date(cur);
      } else {
        var now = new Date();
        var d = new Date(this.formatDate(now.getFullYear(), now.getMonth(), 1));
        d.setDate(35);
        date = new Date(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
      }
      this.currentDay = date.getDate();
      this.currentYear = date.getFullYear(); //年
      this.currentMonth = date.getMonth() + 1; //月

      this.currentWeek = date.getDay() + 1; // 日
      if (this.currentWeek == 0) {
        this.currentWeek = 7;
      }
      var str = this.formatDate(
        this.currentYear,
        this.currentMonth,
        this.currentDay
      );
      this.days.length = 0;
      //初始化本周
      for (var i = this.currentWeek - 1; i >= 0; i--) {
        var d = new Date(str);
        d.setDate(d.getDate() - i);
        var dayobject = {}; //用一个对象包装Date对象  以便为以后预定功能添加属性
        dayobject.day = d;
        this.days.push(dayobject); //将日期放入data 中的days数组 供页面渲染使用
      }
      //其他周
      for (var i = 1; i <= 42 - this.currentWeek; i++) {
        var d = new Date(str);
        d.setDate(d.getDate() + i);
        var dayobject = {};
        dayobject.day = d;
        this.days.push(dayobject);
      }
    },
    pickPre: function(year, month) {
      // setDate(0); 上月最后一天
      // setDate(-1); 上月倒数第二天
      // setDate(dx) 参数dx为 上月最后一天的前后dx天
      var d = new Date(this.formatDate(year, month, 1));
      d.setDate(0);
      this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
    },
    pickNext: function(year, month) {
      var d = new Date(this.formatDate(year, month, 1));
      d.setDate(35);
      this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
    },
    pickYear: function(year, month) {
      alert(year + "," + month);
    },

    // 返回 类似 2016-01-02 格式的字符串
    formatDate: function(year, month, day) {
      var y = year;
      var m = month;
      if (m < 10) m = "0" + m;
      var d = day;
      if (d < 10) d = "0" + d;
      return y + "-" + m + "-" + d;
    },

    //显示当天课程
    al: function(index) {
      alert(index);
      this.lan = index;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
  /* background: pink; */
}
.weekdays,
.days {
  background: #219f9e;
}
.weekdays li {
  width: 13.3%;
  margin: 0;
  color: white;
  margin: 0.5rem 0;
}
.days li {
  width: 14%;
  text-align: center;
  margin: 0;
  color: white;
  margin: 0.5rem 0;
}
.weekdays li,
.days li span {
  font-size: 1.2rem;
}
.other-month {
  color: #ccc;
  /* opacity: 0; */
}
.active {
  color: #219f9e;
  background: white;
  border-radius: 50%;
  position: relative;
  display: inline-block;
  width: 2rem;
  height: 2rem;
  text-align: center;
  line-height: 2rem;
}
.active a {
  background: white;
  display: block;
  width: 4px;
  height: 4px;
  position: absolute;
  left: 50%;
  bottom: 0.2rem;
  margin-left: -2px;
  border-radius: 50%;
}
.lan {
  width: 96%;
  height: 20vh;
  background: lime;
  margin: 1rem auto;
}
</style>
