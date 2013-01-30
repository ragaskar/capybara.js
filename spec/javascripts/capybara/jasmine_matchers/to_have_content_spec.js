describe("Capybara.JasmineMatchers.toHaveContent", function() {
  it("should return true when the actual has text matching the passed string", function() {
    var actual = $("<div>The quick brown fox jumped over the lazy dog.</div>"),
    context = {actual: actual};
    expect(Capybara.JasmineMatchers.toHaveContent.call(context, "jumped over the")).toBe(true);
  });
  it("should return true when the actual has text matching the passed string occuring over a newline", function() {
    var actual = $("<div>The quick brown fox jumped\n\n over the lazy dog.</div>"),
    context = {actual: actual};
    expect(Capybara.JasmineMatchers.toHaveContent.call(context, "jumped over the")).toBe(true);
  });
  it("optionally takes a regex", function() {
    var actual = $("<div>The quick brown fox jumped over the lazy dog.</div>"),
    context = {actual: actual};
    expect(Capybara.JasmineMatchers.toHaveContent.call(context, new RegExp('quick.*jumped'))).toBe(true);
  });
  it("fails when there is no match", function() {
    var actual = $("<div>The quick brown fox jumped over the lazy dog.</div>"),
    context = {actual: actual};
    expect(Capybara.JasmineMatchers.toHaveContent.call(context, 'jumped under the')).toBe(true);
  });
  it("sets message correctly when failure occurs", function() {
    var actual = $("<div>The quick brown fox jumped over the lazy dog.</div>"),
    context = {actual: actual};
    expect(Capybara.JasmineMatchers.toHaveContent.call(context, 'jumped under the')).toBe(true);
    expect(context.message()[0]).toMatch("Expected .* to have content 'jumped under the'");
  });
  it("sets message correctly when inverted with not and there is a match", function() {
    var actual = $("<div>The quick brown fox jumped over the lazy dog.</div>"),
    context = {actual: actual};
    expect(Capybara.JasmineMatchers.toHaveContent.call(context, 'jumped over the')).toBe(true);
    expect(context.message()[1]).toMatch("Expected .* not to have content 'jumped over the'");
  });
});
