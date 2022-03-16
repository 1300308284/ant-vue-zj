<template>
  <global-footer class="footer custom-render">
    <template v-slot:links>
      <a target="_blank">Copyright © 2022-2022 AC. All rights reserved.</a>
      <!-- <a href="https://www.github.com/vueComponent/ant-design-vue-pro" target="_blank">Github</a>
      <a href="https://www.github.com/sendya/" target="_blank">@Sendya</a> -->
    </template>
    <!-- <template v-slot:copyright>
      <a href="https://github.com/vueComponent" target="_blank">Copyright © 2022-2022 AC All rights reserved.</a>
    </template> -->
  </global-footer>
</template>

<script>
import { GlobalFooter } from '@ant-design-vue/pro-layout'

export default {
  name: 'ProGlobalFooter',
  components: {
    GlobalFooter
  }
}
</script>
<style lang="less">
</style>
