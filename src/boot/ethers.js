import { boot } from 'quasar/wrappers'
import { ethers } from 'ethers'

const options = {method: 'GET', headers: {Accept: 'application/json'}}

const connect = (cb) => {
	//async callback function
	const go = async () => {
	  const provider = new ethers.providers.Web3Provider(window.ethereum)
	  let response = await provider.send("eth_requestAccounts", [])
	  console.log(response)
	  if (response.length > 0) {
	    return cb(false, response[0])//err, id
	  }
	  cb(true, null)//err, id
	}
	setTimeout(go, 5000);//5 seg de espera mínimo
}

const getData = (store, id) => {
	let url = `https://api.opensea.io/api/v1/assets?order_direction=desc&limit=20&include_orders=false`
	console.log(url)
  fetch(url, options)
    .then(response => response.json())
    .then(response => {
      console.log(response)
      store.commit("setData", response)
    })
    .catch(err => console.error(err))
}

export default boot(({ store }) => {
  /*
  store.commit('handleLoad')
  connect((err, id) => {
    if (!err) {
    	store.commit('setAccount', id)
    	getData(store, id)
    }
    store.commit('handleLoad')
  })
  */
})