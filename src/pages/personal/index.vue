<template>
  <div>
    <personal-header />
    <me-scroll>
      <personal-info />
      <div class="order">
        <div class="order-inquiry"></div>
      </div>
      <div class="assets"></div>
      <div class="other"></div>
    </me-scroll>
  </div>
</template>

<script>
import PersonalHeader from "./header";
import PersonalInfo from "./info";
import MeScroll from "../../base/scroll";
export default {
  name: "Personal",
  components: {
    PersonalHeader,
    PersonalInfo,
    MeScroll
  }
};
</script>

<style>
</style>
