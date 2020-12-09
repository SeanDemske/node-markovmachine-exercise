const markov = require('../markov');
let mm;

beforeEach(function(){
    mm = new markov.MarkovMachine("a text passage to run tests with jest on")
});

test('Testing constructor', function() {
    expect(mm.words.length).toEqual(9);
    expect(mm.words).toContain("a" || "text" || "passage" || "to" || "run" || "tests" || "with" || "jest" || "on");
    expect(mm.words).not.toContain("i" || "don't" || "want" || "these" || "words" || "in" || "my" || "passage" || "yo");
})

test('Testing makeText', function () {
    expect(mm.makeText(50).split(" ").length).toEqual(50);
    expect(mm.makeText(100).split(" ").length).toEqual(100);
    expect(mm.makeText(100).split(" ")).toContain("a" || "text" || "passage" || "to" || "run" || "tests" || "with" || "jest" || "on");
});

test('Testing makeChains', function () {
    expect(Array.from(mm.makeChains())[0][1]).toEqual(expect.arrayContaining(["text"]));
    expect(Array.from(mm.makeChains())[1][1]).toEqual(expect.arrayContaining(["passage"]));
    expect(Array.from(mm.makeChains())[2][1]).toEqual(expect.arrayContaining(["to"]));
    expect(Array.from(mm.makeChains())[3][1]).toEqual(expect.arrayContaining(["run"]));
    expect(Array.from(mm.makeChains())[4][1]).toEqual(expect.arrayContaining(["tests"]));
    expect(Array.from(mm.makeChains())[5][1]).toEqual(expect.arrayContaining(["with"]));
    expect(Array.from(mm.makeChains())[8][1]).toEqual(expect.arrayContaining([undefined]));
});