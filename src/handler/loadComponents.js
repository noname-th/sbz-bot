const { Components } = require("../services/bot");
const loadfile = require("../functions/loadfile")

module.exports = () => {

    let compArray = [];
    // load components file
    const files = loadfile('./components');
    files.forEach(file => {
        let comp = require(file);

        if (comp.data && comp.run) {

            compArray.push(comp.data);
            Components.set(comp.data.customId, comp);
        }

    });

    return compArray;
}