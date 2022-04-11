<template>
  <div class="q-pa-md bg-grey-4">
    <p class="text-overline text-grey">{{$t('home_welcome')}}</p>
    <getData/>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import getData from 'components/GetData.vue'

export default defineComponent({
  name: 'PageIndex',
  components: {getData}
})
</script>
