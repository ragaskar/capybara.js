describe("Capybara.JasmineMatchers.toHaveCss", function() {
  it("returns true if the page contains the selector", function() {
    var actual = $("<div><a class='some-class'></a></div>"),
    context = {actual: actual};
    actual.isPage = function() { return true; };
    expect(Capybara.JasmineMatchers.toHaveCss.call(context, "a.some-class")).toBe(true);
    expect(Capybara.JasmineMatchers.toHaveCss.call(context, "a.some-other-class")).toBe(false);
  });
  it("uses jasmine.JQuery.matchersClass if the object is not a page", function() {
    var actual = $("<div><a class='some-class'></a></div>"),
    context = {actual: actual};
    actual.isPage = function() { return false; };
    spyOn(jasmine.JQuery.matchersClass, 'toHaveCss');
    Capybara.JasmineMatchers.toHaveCss.call(context, {background: 'red'});
    expect(jasmine.JQuery.matchersClass.toHaveCss).toHaveBeenCalledWith({background: 'red'});
    expect(jasmine.JQuery.matchersClass.toHaveCss.mostRecentCall.object).toBe(context);
  });
  it("sets messages correctly", function() {
    var actual = $("<div>The quick brown fox jumped over the lazy dog.</div>"),
    context = {actual: actual};
    actual.isPage = function() { return true; };
    Capybara.JasmineMatchers.toHaveCss.call(context, 'a.class');
    expect(context.message()[0]).toMatch("Expected .* to have css 'a.class'");
    expect(context.message()[1]).toMatch("Expected .* not to have css 'a.class'");
  });
  it("jasmine-jquery toHaveCss still still works", function() {
    var actual = $("<div style='float:right;'>The quick brown fox jumped over the lazy dog.</div>"),
    context = {actual: actual};
    expect(Capybara.JasmineMatchers.toHaveCss.call(context, {float: 'right'})).toBe(true);
  });
});
