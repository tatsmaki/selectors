const selectors = {
    'A': 'water',
    'B': 'fire',
    '#id': '#frozen',
    '*': '*',
    'A, B': 'water,lightning',
    'A ~ B': 'fire~water'
}

export default selectors;