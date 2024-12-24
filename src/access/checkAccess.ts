import ACCESS_ENUM from "./accessEnum";

/**
 * 判读用户权限
 * @param loginUser 登录态权限
 * @param needAccess 需要的权限
 * @returns 权限是否达到要求
 */
const checkAccess = (loginUser: any, needAccess = ACCESS_ENUM.NOT_LOGIN) => {
    // 先获取用户登入态
    const loginUserAccess = loginUser?.userRole ?? ACCESS_ENUM.NOT_LOGIN;

    if( needAccess === ACCESS_ENUM.NOT_LOGIN){
        return true;
    }
    if( needAccess === ACCESS_ENUM.USER){
        if( loginUserAccess === ACCESS_ENUM.NOT_LOGIN){
            //  只要登录态不是未登入就行
            return false;
        }
    }
    if( needAccess === ACCESS_ENUM.ADMIN){
        if(loginUserAccess !== ACCESS_ENUM.ADMIN){
            return false;
        }
    }

    return true;
};

export default checkAccess;
