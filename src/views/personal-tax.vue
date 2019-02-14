<template>
  <basePage title="个税计算器">
    <div class="personal-tax">
      <div class="input-item">
        <label>工资</label>
        <input type="number" v-model.number="wages" placeholder="请输入工资">
      </div>
      <div class="input-item">
        <label>社保</label>
        <input type="number" v-model.number="socialSecurity" placeholder="请输入社保">
      </div>
      <div class="input-item">
        <label>公积金</label>
        <input type="number" v-model.number="AccumulationFund" placeholder="请输入公积金">
      </div>
      <div class="input-item">
        <label>扣税金额</label>
        <input type="number" v-model="taxDeduction" readonly>
      </div>
      <div class="input-item">
        <label>税后</label>
        <input type="number" v-model="result" readonly>
      </div>
    </div>
    <TaxRateTable/>
    <cube-button :primary="true" @click="computed()" class="mg-t20">计算</cube-button>
  </basePage>
</template>

<script>
import TaxRateTable from '@/components/tax-rate-table.vue';
export default {
  components: {
    TaxRateTable
  },
  data() {
    return {
      wages: 5000,
      socialSecurity: 380.34,
      AccumulationFund: 105,
      result: "",
      taxDeduction: ""
    }
  },
  methods: {
    computedWages(amount) {
      if (amount < 0) return 0;
      if (amount <= 3000) return amount * 0.03;
      if (amount > 3000 && amount <= 12000) return amount * 0.1 - 210;
      if (amount > 12000 && amount <= 25000) return amount * 0.2 - 1410;
      if (amount > 25000 && amount <= 35000) return amount * 0.25 - 2660;
      if (amount > 35000 && amount <= 55000) return amount * 0.3 - 4410;
      if (amount > 55000 && amount <= 80000) return amount * 0.35 - 7160;
      if (amount > 80000) return amount * 0.45 - 15160;
    },
    computed() {
      let amount = this.wages - this.socialSecurity - this.AccumulationFund - 5000;
      this.taxDeduction = this.computedWages(amount).toFixed(2);
      this.result = amount + 5000 - this.taxDeduction;
    }
  }
}
</script>

