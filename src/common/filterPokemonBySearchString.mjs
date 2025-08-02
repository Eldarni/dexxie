
//
function getTokens(str, tags) {

    //
    const tokeniser = (str) => {

        //
        const stack = str.split(/(\(|\)|\s)/).reduce((stack, token) => {

            //
            if (token == '(' || token == ')' || token == 'and' || token == 'or') {
                if (stack[0].trim() != '') {
                    stack[1].push(stack[0].trim());
                }
                stack[1].push(token);
                stack[0] = '';
                return stack;
            }

            //
            stack[0] += token;
            return stack;

        }, ['', []]);

        //
        return [ ...stack[1], stack[0].trim() ].filter(n => n);

    };

    //add context to the raw tokens
    return tokeniser(str).map((token) => {

        //
        if (token == '(' || token == ')') {
            return { type: 'paren', value: token }
        }

        //
        if (token == 'and' || token == 'or') {
            return { type: token }
        }

        //
        const match = /^(!|\+)?(.+)$/gi.exec(token);

        //
        if (tags.has(match[2])) {
            return { type: 'tag', value: match[2], inverted : (match[1] == '!') };
        }

        //anything else must be a family or name selector
        return { type: ((match[1] == '+') ? 'family' : 'name'), value: match[2] };

    });

}

//recursive descent parser
function parseBooleanExpr(tokens) {
    let pos = 0;
    function parseExpr() {
        let node = parseTerm();
        while (tokens[pos] && tokens[pos].type === 'or') {
            pos++;
            node = { type: 'or', left: node, right: parseTerm() };
        }
        return node;
    }
    function parseTerm() {
        let node = parseFactor();
        while (tokens[pos] && (tokens[pos].type === 'and' || tokens[pos].type === 'tag' || tokens[pos].type === 'family' || tokens[pos].type === 'name' || tokens[pos].type === 'paren' && tokens[pos].value === '(')) {
            if (tokens[pos].type === 'and') pos++;
            node = { type: 'and', left: node, right: parseFactor() };
        }
        return node;
    }
    function parseFactor() {

        //
        if (!tokens[pos]) {
            return null;
        }

        //
        if (tokens[pos].type === 'tag' || tokens[pos].type === 'family' || tokens[pos].type === 'name') {
            const nextToken = tokens[pos];
            pos++;
            return nextToken;
        }

        //
        if (tokens[pos].type === 'paren' && tokens[pos].value === '(') {
            pos++;
            const node = parseExpr();
            if (tokens[pos] && tokens[pos].type === 'paren' && tokens[pos].value === ')') pos++;
            return node;
        }

        //
        return null;

    }
    return parseExpr();
}

//
function evalBooleanExpr(node, pokemon) {

    //
    if (!node) {
        return true;
    }

    //
    switch (node.type) {
        case 'tag':
            return pokemon.tags.includes(node.value) == !node.inverted;
        case 'family':
            return node.value.includes(pokemon.family);
        case 'name':
            return pokemon.name.en.toLowerCase().startsWith(node.value.toLowerCase());
        case 'and':
            return evalBooleanExpr(node.left, pokemon) && evalBooleanExpr(node.right, pokemon);
        case 'or':
            return evalBooleanExpr(node.left, pokemon) || evalBooleanExpr(node.right, pokemon);
        default:
            return true;
    }

}

//
export function filterPokemonBySearchString(pokemon, searchString) {

    //
    if (!searchString || searchString.trim() === '') {
        return pokemon;
    }

    // Get a list of all the unique tags
    const tags = pokemon.reduce((a, c) => {
        if (Array.isArray(c.tags)) c.tags.forEach(tag => a.add(tag.toLowerCase()));
        return a;
    }, new Set());

    //
    const tokens = getTokens(searchString, tags).map((token) => {
        if (token.type === 'family') {
            return { ...token, value: Array.from(pokemon.reduce((a, c) => {
                if (c.name.en.toLowerCase().startsWith(token.value.toLowerCase())) {
                    a.add(c.family);
                }
                return a;
            }, new Set()))};
        }
        return token;
    });

    //convert the tokens into an ast
    const expr = parseBooleanExpr(tokens);

    //
    const filtered = pokemon.filter((pokemon) => {
        return evalBooleanExpr(expr, pokemon);
    });

    //
    return filtered;

}