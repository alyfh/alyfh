<style scoped>
*{
  margin: 0;
  padding: 0;
}
.checkbox {
  display: inline-block;
}
ul {
  list-style: none;
  padding: 0;
}
.panel_body{
  width: 400px;
  height: 300px;
  border: 1px solid;
}
</style>
<template>
    <div class="panel panel_default">
      <div class="panel_heading clearfix">
        <div class="pull_left">
          <div class="checkbox">
              <label>
                <input :disabled="data.length === 0" type="checkbox" @click="toggleAll()" :checked="selectedAllStatus"><span>{{title}}</span>
              </label>
          </div>
          <button v-if=" title !== '增加关键字:' ">删除</button>
          <span class="pull_right">{{selectItemNumber}}/{{data.length}}</span>
        </div>
      </div>
      <div class="panel_body">
        <textarea v-if=" data=='' && title == '增加关键字:' " style="resize: none;width: 380px;height: 280px;border: none;padding: 10px;" placeholder="请输入需增加过滤的关键字，并以半角逗号分隔"></textarea>
        <ul>
          <li v-for="item in data" :key="item.id">
             <div class="checkbox">
              <label>
                <input type="checkbox" v-model="item.isSelected"> {{item.name}}
              </label>
            </div>
          </li>
        </ul>
      </div>
    </div>
</template>
<script>
export default {
  name: "ChangeBox",
  props: ["title", "data"],
  computed: {
    // 选择的数量
    selectItemNumber() {
      return this.data.filter(item => item.isSelected).length;
    },
    // 全选状态
    selectedAllStatus() {
      if (
        this.selectItemNumber === this.data.length &&
        this.selectItemNumber !== 0
      ) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    // 全选及反选
    toggleAll() {
      let len = this.data.length;
      let slen = this.data.filter(item => item.isSelected).length;
      if (len !== slen) {
        this.data.map(item => (item.isSelected = true));
      } else {
        this.data.map(item => (item.isSelected = false));
      }
    }
  }
};
</script>
