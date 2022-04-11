<template>
  <!--connect metamask-->
  <q-btn v-if="!$store.state.account"
    color="primary"
    :loading="$store.state.load"
    @click="metamask"
  >
    <q-img
      src="https://opensea.io/static/images/logos/metamask-alternative.png"
      class="q-mr-sm"
      style="width: 2em;"
    />
    <div>
      {{$t('home_connect')}}
    </div>
  </q-btn>

  <!--list
  <q-card class="q-mb-md q-mx-sm"
    v-else-if="$store.state.data && $store.state.data.assets && $store.state.data.assets.length > 0 "
    v-for="nft in $store.state.data.assets"
    style="max-width: 250px !important; display: inline-block"
  >
    <img :src="nft.image_preview_url">

    <q-card-section>
      <div class="text-h6">{{nft.name}}</div>
    </q-card-section>

    <q-card-section class="q-pt-none" v-if="nft.description">
      {{ nft.description }}
      <br/>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <q-badge>
        {{nft.asset_contract.name}}
      </q-badge>
    </q-card-section>
  </q-card>

-->

    <q-card  class="q-mb-md q-mx-sm"
      v-else-if="$store.state.data && $store.state.data.collections && $store.state.data.collections.length > 0 "
      v-for="nft in $store.state.data.collections"
      style="max-width: 250px !important; display: inline-block"
    >
      <q-img
        :src="nft.banner_image_url ? nft.banner_image_url : 'https://singlecolorimage.com/get/384248/200x90'"
      />

      <q-card-section>
      <q-avatar
        class="absolute"
        style="top: 0; right: 12px; transform: translateY(-50%);"
      >
        <q-img
          :src="nft.image_url ? nft.image_url : 'https://singlecolorimage.com/get/1976d2/120x120'"
        />
      </q-avatar>

        <div class="row no-wrap items-center">
          <div class="col text-h6 ellipsis">
            {{nft.name}}
          </div>
          <!--
          <div class="col-auto text-grey text-caption q-pt-md row no-wrap items-center">
            <q-icon name="place" />
            250 ft
          </div>
          <q-rating v-model="stars" :max="5" size="32px" />
        -->
        </div>

      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="text-subtitle1">
          $
        </div>
        <div class="text-caption text-grey">
          {{nft.description}}
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions>
        <q-btn flat round icon="event" />
        <q-btn flat color="primary">
          Reserve
        </q-btn>
      </q-card-actions>
    </q-card>
</template>

<script>
import { defineComponent } from 'vue'
import { ethers } from 'ethers'
import { useStore } from 'vuex'

const options = {method: 'GET', headers: {Accept: 'application/json'}}

const connect = (cb) => {
  //async callback function
  const go = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    let response = await provider.send("eth_requestAccounts", [])
    console.log(response[0])
    if (response.length > 0) {
      return cb(false, response[0])//err, id
    }
    cb(true, null)//err, id
  }
  setTimeout(go, 5000);//5 seg de espera mínimo
}

const getData = (store, id) => {
  let url = `https://api.opensea.io/api/v1/collections?offset=0&limit=20`
  console.log(url)
  fetch(url, options)
    .then(response => response.json())
    .then(response => {
      console.log(response)
      store.commit("setData", response)
    })
    .catch(err => console.error(err))
}

export default defineComponent({
  name: 'GetData',
  setup () {
    const $store = useStore()
    const metamask = () => {
      $store.commit('handleLoad')
      connect((err, id) => {
        if (!err) {
          $store.commit('setAccount', id)
          getData($store, id)
        }
        $store.commit('handleLoad')
      })
    }

    return {
      metamask,
    }
  }
})
</script>
