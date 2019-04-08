

//封装操作localstorage本地存储的方法：模块化的文件

// nodejs  基础

var storage={
    setItem(key,value){//存储数据
        localStorage.setItem(key,JSON.stringify(value));
    },
    getItem(key){//读取数据
        return JSON.parse(localStorage.getItem(key));
    },
    removeItem(key){//删除数据
        localStorage.removeItem(key);
    }
}

export default storage;//将模块暴露出去


