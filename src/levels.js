const levels = {
    'A': [
        {
            element: 'water',
            animation: true
        },
        {
            element: 'water',
            animation: true
        }
    ],
    'B': [
        {
            element: 'fire',
            animation: true
        },
        {
            element: 'water',
            animation: false
        },
        {
            element: 'fire',
            animation: true
        }
    ],
    '#id': [
        {
            element: 'water',
            animation: false
        },
        {
            element: 'water',
            animation: true,
            id: 'frozen'
        },
        {
            element: 'frost',
            animation: false
        }
    ],
    '*': [
        {
            element: 'water',
            animation: true
        },
        {
            element: 'fire',
            animation: true
        },
        {
            element: 'frost',
            animation: true
        }
    ],
    'A, B': [
        {
            element: 'fire',
            animation: false
        },
        {
            element: 'water',
            animation: true
        },
        {
            element: 'lightning',
            animation: true
        },
        {
            element: 'frost',
            animation: false
        }
    ],
    'A ~ B': [
        {
            element: 'water',
            animation: false
        },
        {
            element: 'fire',
            animation: false
        },
        {
            element: 'water',
            animation: true,
            id: 'frozen'
        },
        {
            element: 'water',
            animation: true
        },
        {
            element: 'frost',
            animation: false
        }
    ]
}

export default levels;