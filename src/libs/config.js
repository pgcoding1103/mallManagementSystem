const ResponseCode = {
    access_token_expired: 1,//access_token过期
    login_error: 2,//登录错误
    login_ok: 3,//登录成功
    select_ok: 4,//查询成功
    add_ok: 5,//添加成功
    delete_ok: 6,//删除成功
    modify_ok: 7,//修改成功
}
const wsMessageType = {
    admin_application: 1,//管理员账号申请
    welcome: 2,//登录成功
    token_expired: 3,
}
const requestArr = []


export {
    ResponseCode,
    wsMessageType,
    requestArr
}

