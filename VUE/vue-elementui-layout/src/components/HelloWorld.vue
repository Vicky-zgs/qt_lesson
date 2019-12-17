<template>
<!-- 一行24份 -->
  <!-- <el-row>
    <el-col :span="12">
      12
    </el-col>
    <el-col :span="6">
      6
    </el-col>
    <el-col :span="6">
      6
    </el-col>
  </el-row> -->
  <div>
    <MyRow>
      col
    </MyRow>
    <MyRow1 tag="section">
      <MyCol :span="12">12</MyCol>
      <MyCol :span="6">6</MyCol>
      <MyCol :span="6">6</MyCol>
    </MyRow1>
  </div>
</template>

<script>
import MyRow from './My-Row'
import MyRow1 from './My-Row1'
import MyCol from './My-Col'
export default {
  components: {
    MyRow,
    MyRow1,
    MyCol
  }
}
</script>

<style>

</style>