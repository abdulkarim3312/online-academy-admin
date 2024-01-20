<template>
  <div class="row width_full home_table">
    <div class="col_12">
      <div class="common_title title">
        <h2 class="mb_20">{{ title }}</h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    }
  }
}
</script>