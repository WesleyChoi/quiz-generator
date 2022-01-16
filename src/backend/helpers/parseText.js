//make sure sentences end in periods!
const blank = '______';

// Replace all keywords with blanks

module.exports = {
    fillInWithBlank: function fillInWithBlank(input, keywords) {
        for (let i = 0; i < keywords.length; i++) {
            input = input.replace(keywords[i], blank);
        }
        return input;
    },

    questionGenerator: function questionGenerator(input, keywords) {
        sentences = [];
        curr = "";
        for (let i = 0; i < input.length; i++) {
            if (input[i] == '.') {
                if (curr.includes(blank)) {
                    sentences.push(curr);
                }
                curr = "";
            } else {
                curr += input[i];
            }
        }
        questions = {};
        for (let i = 0; i < sentences.length; i++) {
            words = sentences[i].split(" ");
            count = 0;

            for (word = 0; word < words.length; word++) {
                if (words[word].includes(blank)) {
                    count++;
                }
            }
            questions[sentences[i]] = [];

            for (j = 0; j < count; j++) {
                keyword = keywords.shift();
                questions[sentences[i]].push(keyword);
            }
        }
        return questions;
    },
}