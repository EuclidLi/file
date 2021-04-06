import request from './request'
// import { ip } from './config'
/**
 *  获取所有的权限
 * @method getAllPermission
 * @return {[type]}         [description]
 */
// export function getData(data) {
//     return request({
//         url: `/iserver/services/data-disaster/rest/data/datasources/disaster/datasets/rain_maxima_daily/gridValue.rjson?x=${data[0]}&y=${data[1]}`,
//         method: 'get',
//     })
// }
// }
export function getFileList(path) {
    return request({
        url: `/selectFile?path=${path}`,
        method: 'get'
    })
}
export function addDir(path) {
    return request({
        url: `/addDir?path=${path}`,
        method: 'get'
    })
}
export function delDir(path) {
  return request({
    url: `/delDir?path=${path}`,
    method: "get",
  });
}
export function fileRename(oldName,newName) {
  return request({
    url: `/delarticle?old=${oldName}&new=${newName}`,
    method: "get"
  });
}