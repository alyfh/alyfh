<!-- 评论关键字维护 -->
<style scoped>
.keyWord_head {
  font-size: 25px;
  font-weight: bold;
  text-align: center;
  line-height: 50px;
}
.container {
    width: 1000px;
    height: 350px;
    position: relative;
    margin: 0 auto;
}
.text_center{
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 50%;
}
</style>
<template>
    <div class="keyWord_wrap">
      <div class="keyWord_head">
        <h3>评论关键字维护</h3>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-md-5" style="float: left;">
            <change-box-area :title="sourceTitle" :data="sourceList"></change-box-area>
          </div>
          <div class="col-md-2 text_center">
            <p><button :disabled="sourceList.length === 0 || sourceRefNum === 0" class="btn btn-primary" @click="toTarget()">》</button></p>
            <p><button :disabled="targetList.length === 0 || targetRefNum === 0" class="btn btn-primary" @click="toSource()">《</button></p>
          </div>
          <div class="col-md-5" style="float: right;">
            <change-box-area :title="targetTitle" :data="targetList"></change-box-area>
          </div>
        </div>
      </div>
      <div class="" style="text-align: center;padding: 10px 0 0;">
        <el-button style="background: #3fa599;color:white;width: 120px;margin-right: 100px;" @click="cancel()">确认</el-button>
        <el-button style="width: 120px;" @click="cancel()">取消</el-button>
      </div>
    </div>
</template>
<script>
import ChangeBoxArea from "./changeBoxArea";
let dataList = [
  { id: 1, name: "HTML5", isSelected: false },
  { id: 2, name: "CSS3", isSelected: false },
  { id: 3, name: "Angular", isSelected: false },
  { id: 4, name: "Vue", isSelected: false },
  { id: 5, name: "Linux", isSelected: false },
  { id: 6, name: "JavaScript", isSelected: false }
];
export default {
  components: {
    ChangeBoxArea
  },
  name: "ChangeBox",
  data() {
    return {
      sourceTitle: "增加关键字:",
      targetTitle: "自定义已生效关键字:",
      sourceList: [],
      targetList: dataList
    };
  },
  methods: {
    exchange(fd, td) {
      let selectedItem = fd.filter(item => item.isSelected).map(item => {
        return {
          ...item,
          isSelected: false
        };
      });
      td.push(...selectedItem);
      return fd.filter(item => !item.isSelected);
    },
    // 把选择数据转移到目标（右框）
    toTarget() {
      this.sourceList = this.exchange(this.sourceList, this.targetList);
    },
    // 把选择数据转回到源（左框）
    toSource() {
      this.targetList = this.exchange(this.targetList, this.sourceList);
    }
  },
  computed: {
    // 源数据中选中的数量
    sourceRefNum() {
      return this.sourceList.filter(item => item.isSelected).length;
    },
    // 目标数据中选中的数量
    targetRefNum() {
      return this.targetList.filter(item => item.isSelected).length;
    }
  }
};
</script>