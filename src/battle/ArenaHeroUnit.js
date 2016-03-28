/**
 * Created by highkay on 2015/12/29.
 */

//竞技敌人英雄扩展类
var ArenaHeroUnit = HeroUnit.extend({

    getArenaHeroRandomSkill: function(){
        var skills = this.hero.getSkills();
        var result = [];
        for(var i in skills){
            if (skills[i].getType() === 1 && skills[i].getLv() > 0) {
                result.push(skills[i]);
            }
        }

        var len = result.length;
        if(len > 0){
            return result[getRandomInt(0,len-1)];
        }
        return undefined;
    },

    onMove: function () {
        var target = this.battle.findRandomHero(this.playerId);
        if (target) {
            this.moveHandle(target);
            //当前英雄血量低于总血量3/5时随机触发一个主动技能
            if(this.isCastSkill && this.getLife()/this.getMaxLife() * 5  < 3){
                this.isCastSkill = false;
                var randomSkill = this.getArenaHeroRandomSkill();
                if(randomSkill){
                    customEventHelper.sendEvent(EVENT.CAST_SKILL,{"id":this.playerId,"skill":randomSkill});
                }
            }
        }
    },
    onDamaged: function (dmg) {
        this._super(dmg);
        if(player.id != this.playerId){
            this.battle.updateEnemyLife();
        }
    },

    onDead: function () {
        this.deadHandle();
        this.battle.onEnemyDead();
    },

    ctor: function (battle, arenaHero) {
        this._super(battle);
        this.isCastSkill = true;
        this.playerId = arenaHero._PlayerData.getPlayer().id;
        this.initHero(arenaHero);

        if(this.playerId != player.id){
            this.setScale(-1, 1);
        }

        this.initTombstone();
    },

    onEnter: function () {
        this._super();
    }
});