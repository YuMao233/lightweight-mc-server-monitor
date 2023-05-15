<script setup lang="ts">
// const friendLinks = [
//   {
//     label: '友联1',
//     addr: ''
//   }
// ]
</script>

<template>
  <div class="wrapper">
    <div class="container">
      <div>
        <div>版权所有 © 2023 保留所有权利。</div>
        <el-link :underline="true" href="https://beian.miit.gov.cn/" target="_blank">
          <div class="wrapper">京 ICP 备17022362号</div>
        </el-link>

        <!-- <div style="margin-top: 1rem">反馈邮箱：14907471@QQ.com</div> -->
      </div>
      <!-- <div>反馈邮箱：XXXX@qq.com</div> -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  background-color: #333333;
  color: rgb(212, 212, 212);
  overflow: hidden;
}
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  max-width: 1200px;
  margin: 90px auto;
  padding: 0 15px;
  text-align: left;

  div {
    font-size: 0.8rem;
    font-weight: 400;
  }
}
</style>
