enum ActionKind {
    Walking,
    Idle,
    Jumping
}
namespace SpriteKind {
    export const TITLE_SPRITE = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (TITLE_OPEN == true) {
        sprites.destroyAllSpritesOfKind(SpriteKind.TITLE_SPRITE)
        music.stopAllSounds()
        GENERATE_UI()
    }
})
function GENERATE_UI () {
    music.play(music.stringPlayable("C5 B A B G E A D ", 120), music.PlaybackMode.LoopingInBackground)
    music.play(music.createSong(assets.song`bg music`), music.PlaybackMode.LoopingInBackground)
    TITLE_OPEN = false
    ENEMY_PKMN_TXT = textsprite.create("CAKUBOXER", 0, 4)
    ENEMY_PKMN_TXT.setPosition(39, 6)
    ENEMY_PKMN_TXT.setScale(1.3, ScaleAnchor.Middle)
    ENEMY_HEALTH = statusbars.create(50, 5, StatusBarKind.EnemyHealth)
    ENEMY_HEALTH.max = 80
    ENEMY_HEALTH.setColor(6, 2)
    ENEMY_HEALTH.setBarBorder(1, 4)
    ENEMY_HEALTH.setLabel("HP:", 4)
    ENEMY_HEALTH.setPosition(38, 22)
    ENEMY_LVL = textsprite.create(":L50", 0, 4)
    ENEMY_LVL.setPosition(39, 14)
    HUD_2 = sprites.create(assets.image`myImage29`, SpriteKind.Player)
    HUD_2.setPosition(40, 12)
    PLAYERPOKEMON = sprites.create(assets.image`myImage10`, SpriteKind.Player)
    PLAYERPOKEMON.setPosition(45, 80)
    PLAYERPOKEMON.setScale(1.5, ScaleAnchor.Middle)
    ENEMYPOKEMON = sprites.create(assets.image`cakuboxer`, SpriteKind.Enemy)
    ENEMYPOKEMON.setPosition(116, 30)
    PLAYER_HEALTH = statusbars.create(50, 5, StatusBarKind.Health)
    PLAYER_HEALTH.max = 75
    PLAYER_HEALTH.setColor(6, 2)
    PLAYER_HEALTH.setBarBorder(1, 4)
    PLAYER_HEALTH.setLabel("HP:", 4)
    HUD_1 = sprites.create(assets.image`myImage28`, SpriteKind.Player)
    HUD_1.setPosition(115, 79)
    PLAYER_HEALTH.setPosition(110, 79)
    PLAYERHEALTH_TXT = textsprite.create("" + PLAYER_HEALTH.max + "/ " + PLAYER_HEALTH.value, 0, 4)
    PLAYERHEALTH_TXT.setPosition(115, 88)
    PLAYER_LVL = textsprite.create(":L50", 0, 4)
    PLAYER_LVL.setPosition(116, 71)
    PLAYER_PKMN_TXT = textsprite.create("CHARIZARD", 0, 4)
    PLAYER_PKMN_TXT.setPosition(110, 62)
    PLAYER_PKMN_TXT.setScale(1.3, ScaleAnchor.Middle)
    scene.setBackgroundColor(1)
    BATTLE_MENU = miniMenu.createMenu(
    miniMenu.createMenuItem("FIGHT"),
    miniMenu.createMenuItem("PKMN"),
    miniMenu.createMenuItem("ITEM"),
    miniMenu.createMenuItem("RUN")
    )
    BATTLE_MENU.onButtonPressed(controller.A, function (selection, selectedIndex) {
        if (selectedIndex == 0) {
            BATTLE_MENU.setButtonEventsEnabled(false)
            FIGHTMENU = miniMenu.createMenu(
            miniMenu.createMenuItem("Flamethrower"),
            miniMenu.createMenuItem("Slash"),
            miniMenu.createMenuItem("Dragon rage"),
            miniMenu.createMenuItem("Bite")
            )
            FIGHTMENU.setStyleProperty(miniMenu.StyleKind.Selected, miniMenu.StyleProperty.Background, 2)
            FIGHTMENU.setStyleProperty(miniMenu.StyleKind.DefaultAndSelected, miniMenu.StyleProperty.Foreground, 4)
            FIGHTMENU.setDimensions(90, 50)
            FIGHTMENU.setFrame(assets.image`myImage24`)
            FIGHTMENU.setPosition(113, 120)
            game.setDialogFrame(assets.image`myImage24`)
            FIGHTMENU.onButtonPressed(controller.A, function (selection, selectedIndex) {
                Move_turn(selectedIndex, selection)
            })
        } else if (selectedIndex == 1) {
            BATTLE_MENU.setButtonEventsEnabled(false)
            PKMNMENU = miniMenu.createMenu(
            miniMenu.createMenuItem("CHARMANDER"),
            miniMenu.createMenuItem("SQUIRTLE"),
            miniMenu.createMenuItem("BULBASAUR")
            )
            PKMNMENU.setStyleProperty(miniMenu.StyleKind.Selected, miniMenu.StyleProperty.Background, 2)
            PKMNMENU.setStyleProperty(miniMenu.StyleKind.DefaultAndSelected, miniMenu.StyleProperty.Foreground, 4)
            PKMNMENU.setDimensions(90, 40)
            PKMNMENU.setFrame(assets.image`myImage24`)
            PKMNMENU.setPosition(113, 120)
        } else if (false) {
        	
        } else {
        	
        }
    })
    BATTLE_MENU.setStyleProperty(miniMenu.StyleKind.Selected, miniMenu.StyleProperty.Background, 2)
    BATTLE_MENU.setStyleProperty(miniMenu.StyleKind.DefaultAndSelected, miniMenu.StyleProperty.Foreground, 4)
    BATTLE_MENU.setDimensions(155, 40)
    BATTLE_MENU.setFrame(assets.image`myImage24`)
    BATTLE_MENU.setPosition(80, 120)
}
function Move_turn (selectionIndex: number, selection: string) {
    game.showLongText("Charizard used " + selection, DialogLayout.Bottom)
    if (selection == "Flamethrower") {
        Battle_attack_dmg_calc(2, 1, 50, 230, 291, 95)
        ENEMY_HEALTH.value += move_damage * -1
        scene.cameraShake(8, 1000)
        game.showLongText("Charizard did " + move_damage + " damage", DialogLayout.Bottom)
    } else if (selection == "Slash") {
        Battle_attack_dmg_calc(4, 1, 50, 230, 291, 70)
        ENEMY_HEALTH.value += move_damage * -1
        scene.cameraShake(8, 1000)
        game.showLongText("Charizard did " + move_damage + " damage", DialogLayout.Bottom)
    } else if (selection == "Dragon rage") {
        ENEMY_HEALTH.value += -40
        scene.cameraShake(8, 1000)
        game.showLongText("Charizard did " + "40" + " damage", DialogLayout.Bottom)
    } else if (selection == "Bite") {
        Battle_attack_dmg_calc(5, 1, 50, 230, 291, 60)
        ENEMY_HEALTH.value += move_damage * -1
        scene.cameraShake(8, 1000)
        game.showLongText("Charizard did " + move_damage + " damage", DialogLayout.Bottom)
    }
    if (ENEMY_HEALTH.value <= 0) {
        game.showLongText("Cakuboxer fainted", DialogLayout.Bottom)
        game.gameOver(true)
        game.setGameOverEffect(true, effects.dissolve)
    } else {
        EnemyMove = 0
    }
}
// 1=grass
// 2=fire
// 3=water
// 4=normal
// 5=dark
// list is unfinished for now
function Battle_attack_dmg_calc (move_type: number, enemy_type: number, lvl: number, atk: number, def: number, base_power: number) {
    if (move_type == 2 && enemy_type == 1) {
        move_damage = Math.round((2 * lvl / 5 + 2) * base_power * (atk / def) / 50 + 2) * 2
    } else {
        move_damage = Math.round((2 * lvl / 5 + 2) * base_power * (atk / def) / 50 + 2)
    }
}
let EnemyMove = 0
let move_damage = 0
let PKMNMENU: miniMenu.MenuSprite = null
let FIGHTMENU: miniMenu.MenuSprite = null
let BATTLE_MENU: miniMenu.MenuSprite = null
let PLAYER_PKMN_TXT: TextSprite = null
let PLAYER_LVL: TextSprite = null
let PLAYERHEALTH_TXT: TextSprite = null
let HUD_1: Sprite = null
let PLAYER_HEALTH: StatusBarSprite = null
let ENEMYPOKEMON: Sprite = null
let PLAYERPOKEMON: Sprite = null
let HUD_2: Sprite = null
let ENEMY_LVL: TextSprite = null
let ENEMY_HEALTH: StatusBarSprite = null
let ENEMY_PKMN_TXT: TextSprite = null
let TITLE_OPEN = false
namespace userconfig {
    export const ARCADE_SCREEN_WIDTH = 160
    export const ARCADE_SCREEN_HEIGHT = 144
}
TITLE_OPEN = true
music.play(music.createSong(assets.song`opening theme`), music.PlaybackMode.LoopingInBackground)
scene.setBackgroundColor(1)
let LOGO = sprites.create(assets.image`myImage30`, SpriteKind.TITLE_SPRITE)
LOGO.setPosition(78, 29)
let TITLE_PKMN1 = sprites.create(assets.image`Cakutie`, SpriteKind.TITLE_SPRITE)
TITLE_PKMN1.setPosition(30, 120)
let TITLE_PKMN2 = sprites.create(assets.image`cakuboi`, SpriteKind.TITLE_SPRITE)
TITLE_PKMN2.setPosition(130, 116)
let TITLE_PKMN3 = sprites.create(assets.image`cakuboxer`, SpriteKind.TITLE_SPRITE)
TITLE_PKMN3.setPosition(80, 100)
