import { UNIT_TYPES } from './constants/unit.js';
import { PHASES } from './constants/phases.js';
import { USER_ACTIONS } from './constants/userActions.js';
import { USER_HANDLER_NAME } from './constants/handlers.js';
import { UnitOptions, UnitList } from './generics/cards.js';

export default class GameController {
    constructor($scope, $rootScope) {
        $rootScope.GAME = {};
        this.gamerName = $rootScope.GAME.gamerName = 'first';
        this.enemyName = $rootScope.GAME.enemyName = 'second';
        this.phase = $rootScope.GAME.phase = PHASES.VANGUARD; // Номер фазы
        this.currentActions = $rootScope.GAME.currentActions = USER_ACTIONS.CANCEL; // Текущее действие
        $rootScope.$on(USER_HANDLER_NAME, (event, data) => {
            if (data === USER_ACTIONS.END) {
                $rootScope.$broadcast(USER_HANDLER_NAME, USER_ACTIONS.CANCEL);

                return;
            }

            if (data === USER_ACTIONS.CARD) {
                let newCard = this.deck[this.gamerName][0].shift();
                $rootScope.GAME.cards[this.gamerName].push(UnitOptions[newCard]);
                $rootScope.$broadcast(USER_HANDLER_NAME, USER_ACTIONS.END);

                return;
            }

            $rootScope.GAME.currentActions = data;
        });

        /**
         * Удаление карты из руки
         * @param  {String} gamer Имя игрока, у которого нужно удалить карту
         * @param  {Object} item  Объект карты
         */
        $rootScope.removeCard = (gamer, item) => {
            for (let i = 0; i < this.cards[gamer].length; i++) {
                if (angular.equals(this.cards[gamer][i], item)) {
                    this.cards[gamer].splice(i, 1);
                    break;
                }
            }
        };

        let tmp = {
            type: UNIT_TYPES.CLEAR,
            gamerName: 'first',
            classes: 'unit_clear_first'
        };

        this.deck = $rootScope.GAME.deck = {
            first: [UnitList.slice().sort(() => 0.5 - Math.random())],
            second: [UnitList.slice().sort(() => 0.5 - Math.random())]
        };

        this.cards = $rootScope.GAME.cards = {
            first: [],
            second: []
        };

        this.army = $rootScope.GAME.army = {
            first: [
                [angular.copy({
                    ...tmp,
                    ...UnitOptions.Lord,
                    location: {
                        phase: PHASES.VANGUARD,
                        row: 0,
                        column: 0
                    }
                }),
                    angular.copy({
                        ...tmp,
                        ...UnitOptions.Witch,
                        location: {
                            phase: PHASES.VANGUARD,
                            row: 0,
                            column: 1
                        }
                    }),
                {
                    ...tmp,
                    location: {
                        phase: PHASES.VANGUARD,
                        row: 0,
                        column: 2
                    },
                }],
                [{
                    ...tmp,
                    location: {
                        phase: PHASES.WING,
                        row: 1,
                        column: 0
                    }
                },
                {
                    ...tmp,
                    location: {
                        phase: PHASES.WING,
                        row: 1,
                        column: 1
                    },
                    type: UNIT_TYPES.KING,
                    classes: 'unit_luk',
                    health: 10,
                    attack: 1
                },
                {
                    ...tmp,
                    location: {
                        phase: PHASES.WING,
                        row: 1,
                        column: 2
                    }
                }],
                [{
                    ...tmp,
                    location: {
                        phase: PHASES.REAR,
                        row: 2,
                        column: 0
                    }
                },
                {
                    ...tmp,
                    location: {
                        phase: PHASES.REAR,
                        row: 2,
                        column: 1
                    }
                },
                {
                    ...tmp,
                    location: {
                        phase: PHASES.REAR,
                        row: 2,
                        column: 2
                    }
                }]
            ],
            second: [
                [
                    angular.copy({
                        ...tmp,
                        ...UnitOptions.Vampir,
                        location: {
                            phase: PHASES.VANGUARD,
                            row: 0,
                            column: 0
                        },
                        gamerName: 'second'
                    }),
                    angular.copy({
                        ...tmp,
                        ...UnitOptions.Vampir,
                        location: {
                            phase: PHASES.VANGUARD,
                            row: 0,
                            column: 1
                        },
                        gamerName: 'second'
                    }),
                    angular.copy({
                        ...tmp,
                        ...UnitOptions.Vampir,
                        location: {
                            phase: PHASES.VANGUARD,
                            row: 0,
                            column: 2
                        },
                        gamerName: 'second'
                    })
                ],
                [{
                    ...tmp,
                    location: {
                        phase: PHASES.WING,
                        row: 1,
                        column: 0
                    },
                    gamerName: 'second',
                    classes: 'unit_clear_second',
                    position: 0
                },
                {
                    ...tmp,
                    location: {
                        phase: PHASES.WING,
                        row: 1,
                        column: 1
                    },
                    gamerName: 'second',
                    classes: 'unit_vampir',
                    type: UNIT_TYPES.KING,
                    health: 10,
                    attack: 1,
                },
                {
                    ...tmp,
                    location: {
                        phase: PHASES.WING,
                        row: 1,
                        column: 2
                    },
                    gamerName: 'second',
                    classes: 'unit_clear_second'
                }],
                [{
                    ...tmp,
                    location: {
                        phase: PHASES.REAR,
                        row: 2,
                        column: 0
                    },
                    gamerName: 'second',
                    classes: 'unit_clear_second'
                },
                {
                    ...tmp,
                    location: {
                        phase: PHASES.REAR,
                        row: 2,
                        column: 1
                    },
                    gamerName: 'second',
                    classes: 'unit_clear_second'
                },
                {
                    ...tmp,
                    location: {
                        phase: PHASES.REAR,
                        row: 2,
                        column: 2
                    },
                    gamerName: 'second',
                    classes: 'unit_clear_second'
                }]
            ]
        };
    }
}
