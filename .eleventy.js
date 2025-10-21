module.exports = function(eleventyConfig) {

  // 2. README.md 파일을 빌드 대상에서 제외
  eleventyConfig.ignores.add("README.md"); 

  return {
    // 3. 디렉토리 설정: 모든 템플릿 파일이 'inc' 폴더를 보도록 통일
    dir: {
      input: ".",
      includes: "inc", // includes 경로도 inc 폴더로 통일
      data: "_data",
      output: "_site"
    }
  };
};