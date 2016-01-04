/**
 * Created by highkay on 2015/12/29.
 */
var Skill = function (id, lv) {
    var id = id;
    var lv = lv;
    var data = dataSource.skills[id];
    this.getId = function () {
        return id;
    };
    /**
     * 获取升下一级所需数据
     * @returns {*}
     */
    this.getNextLevelUpgrade=function(){
        var level=this.getLv();
        var cost=getLevelData(data,'upgrade',level+1);
        return cost;
    };
    this.getLevelData=function(level){
        return getSpecificLevelData(data,level||lv);
    }
    /**
     * 是否最高级别
     * @returns {boolean} true 是，false 不是
     */
    this.isMaxLevel=function(){
        return lv>=data.levelDatas.length;
    };
    this.upgrade=function(){
        lv++;
    }
    /**
     * 获取当前级别
     * @returns {int}
     */
    this.getLv = function () {
        return lv;
    };
    this.getName = function () {
        return data.name;
    };
    this.getDesc = function () {
        return data.desc;
    };
    this.getEffect = function (key) {
        return getEffectValue(data, key, lv);
    };
    this.isUseable = function () {
        return data.useable;
    }
    /**
     * 遍历制定级别的所有技能效果,按index正序排列
     * @param lv 级别，默认为当前级别
     * @returns [{type:'技能type','value':111,'index':'排列位置'}]
     */
    this.traverseSkillEffects=function (lv){
        var skill=this.getLevelData(lv);
        var effects=[];
        for (var key in skill){
            //狗日的微信浏览器中没有startsWith
            if(key.indexOf("effect")==0){
                var effect=skill[key];
                effects.push(effect);
                effect.index=parseInt(key.replace("effect",""));
            }
        }
        return effects.sort(function(a,b){
            return a.index - b.index;
        });
    }
};