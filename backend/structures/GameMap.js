module.exports = class GameMap {
    constructor(name, players = [], objects = { walls: [] }) {
        this.map = name;
        this.players = players;
        this.objects = objects;
    }
};