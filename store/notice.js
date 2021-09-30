const state = ()=>({
    nodeAccount:[],
    phoneAccount:[],
    emailAccount: [],
    nodesList: [],
    poolId: '',
    addressId: '',
    forcePoolName: '',
})

const getters = {
    nodeAccount: state => state.nodeAccount,
    phoneAccount: state => state.phoneAccount,
    emailAccount: state => state.emailAccount,
    nodesList: state => state.nodesList,
    poolId: state =>  state.poolId,
    addressId: state =>  state.addressId,
    forcePoolName: state =>  state.forcePoolName
}

const mutations = {
    setNodeAccount(state, data) {
        state.nodeAccount = Object.assign([], data)
    },
    setPhoneAccount(state, data) {
        state.phoneAccount = Object.assign([], data)
    },
    setEmailAccount(state, data) {
        state.emailAccount = Object.assign([], data)
    },
    setNodesList(state, data){
        state.nodesList = Object.assign([], data)
    },
    setPoolId(state, data){
        state.poolId = data
    },
    setAddressId(state, data){
        state.addressId = data
    },
    setForcePoolName(state, data){
        state.forcePoolName = data
    }
}

const actions = {
    setNode({commit}, data){
        commit('setNodeAccount', data)
    },
    setPhone({commit}, data){
        commit('setPhoneAccount', data)
    },
    setEmail({commit}, data){
        commit('setEmailAccount', data)
    },
    setNodesList({commit}, data){
        commit('setNodesList', data)
    },
    setPoolId({commit}, data){
        commit('setPoolId', data)
    },
    setAddressId({commit}, data){
        commit('setAddressId', data)
    },
    setForcePoolName({commit}, data){
        commit('setForcePoolName', data)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
