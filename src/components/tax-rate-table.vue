<template>
  <table>
    <tbody>
      <tr>
        <td>应纳税所得额(X)</td>
        <td>税率</td>
        <td>速算扣除数</td>
      </tr>
      <tr>
        <td>(0＜X≤3,000)</td>
        <td>3%</td>
        <td>0</td>
      </tr>
      <tr>
        <td>(3,000＜X≤12,000)</td>
        <td>10%</td>
        <td>210</td>
      </tr>
      <tr>
        <td>(12,000＜X≤25,000)</td>
        <td>20%</td>
        <td>1,410</td>
      </tr>
      <tr>
        <td>(25,000＜X≤35,000)</td>
        <td>25%</td>
        <td>2,660</td>
      </tr>
      <tr>
        <td>(35,000＜X≤55,000)</td>
        <td>30%</td>
        <td>4,410</td>
      </tr>
      <tr>
        <td>(55,000＜X≤80,000)</td>
        <td>35%</td>
        <td>7,160</td>
      </tr>
      <tr>
        <td>(X＞80,000)</td>
        <td>45%</td>
        <td>15,160</td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="stylus" scoped>
table, caption, tbody, tfoot, thead, tr, th, td {
  border: 1px solid #666;
  padding: 5px;
}

table {
  width 100%;
  margin-top  10px
  text-align: center;
  border-collapse: collapse;
}
</style>


