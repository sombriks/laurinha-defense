/**
 * @param {import("@11ty/eleventy/UserConfig").default} config
 */
export default function (config) {
    // basic di rectories
    config.setInputDirectory('src/pages');
    config.setIncludesDirectory("../components");
    config.setLayoutsDirectory("../layouts");
    // client-side resources
    config.addPassthroughCopy({ "src/assets": "assets" });
    // exposed libraries
    config.addPassthroughCopy({ "node_modules/phaser/dist": "assets/js/phaser" });
    // output
    config.setOutputDirectory('dist');
}
