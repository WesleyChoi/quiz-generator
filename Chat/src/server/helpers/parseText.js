// Replace all keywords with blanks
blank = '______'
module.exports = {
    fillInWithBlank: function fillInWithBlank(input, keywords) {
        for (let i = 0; i < keywords.length; i++) {
            input = input.replace(keywords[i], blank);
        }
        return input;
    },

    questionGenerator: function questionGenerator(input, keywords) {
        let sentences = [];
        let curr = '';
        for (let i = 0; i < input.length; i++) {
            if (input[i] == '.') {
                if (curr.includes(blank)) {
                    sentences.push(curr);
                }
                curr = '';
            } else {
                curr += input[i];
            }
        }
        let questions = {};
        for (let i = 0; i < sentences.length; i++) {
            let words = sentences[i].split(' ');
            let count = 0;

            for (let word = 0; word < words.length; word++) {
                if (words[word].includes(blank)) {
                    count++;
                }
            }
            questions[sentences[i]] = [];

            for (let j = 0; j < count; j++) {
                let keyword = keywords.shift();
                questions[sentences[i]].push(keyword);
            }
        }
        return questions;
    }
};
