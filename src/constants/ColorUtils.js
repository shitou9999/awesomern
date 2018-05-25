/**
 * Created by cyh on 2018/5/4.
 */
// 若是不用小括号，对象那个花括号会给解析器当做标签解析，返回则是undefined!!;
let getColors = ()=>([
    "#f44336",
    "#E91E63",
    "#9C27B0",
    "#673AB7",
    "#2196F3",
    "#00BCD4",
    "#009688",
    "#4CAF50",
    "#FFEB3B",
    "#FF9800",
    "#795548",
    "#9E9E9E",
    "#607D8B"
]);

let getList = ()=> ([

]);

let getThemeColors = (color)=>{
    const colors = getColors();
    return colors.map((item)=>({color:item,check:color==item}))
};

export {
    getColors,
    getList,
    getThemeColors
}