import service from "@/utils/request"
export {
    getGetMinerTags,
}

function getGetMinerTags(params){
    return service({
        method: 'GetMinerTags',
        params: params
    })
}