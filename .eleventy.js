module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("static"); 
  eleventyConfig.ignores.add("README.md"); 

  return {
    dir: {
      input: ".",
      includes: "inc", 
      data: "_data",
      output: "_site"
    }
  };
};