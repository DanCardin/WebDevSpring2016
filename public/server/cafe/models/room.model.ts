let buildings = [
    {
        name: 'Shillman',
        rooms: [
            {
                number: 101, seats: 30, src: 'http://www.digicution.com/wp-content/uploads/2012/06/HTML5-Repsonsive-Google-Maps-Tutorial-1.png',
                times: [],
            },
            {
                number: 201, seats: 40, src: 'http://www.digicution.com/wp-content/uploads/2012/06/HTML5-Repsonsive-Google-Maps-Tutorial-1.png',
                times: [
                    {start: new Date(), end: new Date(), days: ['M', 'W', 'R']},
                ],
            },
            {
                number: 301, seats: 100, src: 'http://www.digicution.com/wp-content/uploads/2012/06/HTML5-Repsonsive-Google-Maps-Tutorial-1.png',
                times: [],
            },
            {
                number: 401, seats: 12, src: 'http://www.digicution.com/wp-content/uploads/2012/06/HTML5-Repsonsive-Google-Maps-Tutorial-1.png',
                times: [
                    {start: new Date(), end: new Date(), days: ['M', 'T']},
                    {start: new Date(), end: new Date(), days: ['T', 'F']},
                ],
            },
        ],
    },
    {
        name: 'Snell',
        rooms: [
            {
                number: 101, seats: 30, src: 'http://www.digicution.com/wp-content/uploads/2012/06/HTML5-Repsonsive-Google-Maps-Tutorial-1.png',
                times: [
                    {start: new Date(), end: new Date(), days: ['M', 'T']},
                    {start: new Date(), end: new Date(), days: ['M', 'T']},
                    {start: new Date(), end: new Date(), days: ['M', 'T']},
                    {start: new Date(), end: new Date(), days: ['M', 'T']},
                ],
            },
            {
                number: 201, seats: 40, src: 'http://www.digicution.com/wp-content/uploads/2012/06/HTML5-Repsonsive-Google-Maps-Tutorial-1.png',
                times: [],
            },
            {
                number: 301, seats: 100, src: 'http://www.digicution.com/wp-content/uploads/2012/06/HTML5-Repsonsive-Google-Maps-Tutorial-1.png',
                times: [],
            },
            {
                number: 401, seats: 12, src: 'http://www.digicution.com/wp-content/uploads/2012/06/HTML5-Repsonsive-Google-Maps-Tutorial-1.png',
                times: [],
            },
        ],
    },
    {
        name: 'Ryder',
        rooms: [
            {
                number: 101, seats: 30, src: 'http://www.digicution.com/wp-content/uploads/2012/06/HTML5-Repsonsive-Google-Maps-Tutorial-1.png',
                times: [],
            },
            {
                number: 201, seats: 40, src: 'http://www.digicution.com/wp-content/uploads/2012/06/HTML5-Repsonsive-Google-Maps-Tutorial-1.png',
                times: [],
            },
            {
                number: 301, seats: 100, src: 'http://www.digicution.com/wp-content/uploads/2012/06/HTML5-Repsonsive-Google-Maps-Tutorial-1.png',
                times: [],
            },
            {
                number: 401, seats: 12, src: 'http://www.digicution.com/wp-content/uploads/2012/06/HTML5-Repsonsive-Google-Maps-Tutorial-1.png',
                times: [
                    {start: new Date(), end: new Date()},
                ],
            },
        ],
    },
];

export module RoomModel {
    function findBuildingIndex(name: string) {
        for (var i = 0; i < this._buildings.length; i++) {
            if (this._buildings[i].name === name) {
                return i;
            }
        }
    }
}
