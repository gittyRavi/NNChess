(function (global) {
    "use strict";

    importScripts('src/ttt.js', 'src/neural.js', 'src/ai.js', 'src/genetic.js');

    global.onmessage = function (event) {
        var result = process(event.data);
        postMessage(result);
    };

    function process(data) {
        var generation = Genetic.Generation.import(data);
        generation.run();
        return exportResult(generation);
    }

    function exportResult(generation) {
        return {
            generation: generation.id,
            scores: generation.individuals.map(function (i) {
                return {
                    id: i.id,
                    age: i.age,
                    score: i.score
                };
            })
        };
    }
}(this));
