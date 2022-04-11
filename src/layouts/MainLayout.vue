<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          {{$t('head_title')}}
        </q-toolbar-title>

        <div>
          <q-select
            v-model="locale"
            :options="localeOptions"
            :label="`${ $t('head_label') }`"
            dense
            borderless
            emit-value
            map-options
            options-dense
            outlined
            dark
            label-color="grey-3"
            style="min-width: 150px"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      class="bg-grey-5"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          {{$t('drawer_title')}}
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
//import { useQuasar } from 'quasar'
import { useI18n } from 'vue-i18n'
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Error',
    caption: '404',
    icon: 'close',
    link: '/404'
  },
];

import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    //const $q = useQuasar()
    const leftDrawerOpen = ref(false)
    const { locale } = useI18n({ useScope: 'global' })

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      locale,//: $q.lang.getLocale(),
      localeOptions: [
        { value: 'en-US', label: 'English' },
        { value: 'es-ES', label: 'Español' }
      ]
    }
  }
})
</script>
