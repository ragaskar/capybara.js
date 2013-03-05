describe("Page", function() {
  it("returns a jquery object", function() {
    var html = $('<div>'),
    page = new Capybara.Page(html);
    expect(page).toBe(html);
  });
  describe("clickButton", function() {
    it("clicks the given button by id", function() {
      var html = '<div><button id="my_first_field" /></div>',
      page = new Capybara.Page(html),
      clickSpy = jasmine.createSpy('clickSpy');
      $('button', page).click(clickSpy);
      expect(clickSpy).not.toHaveBeenCalled();
      page.clickButton('my_first_field');
      expect(clickSpy).toHaveBeenCalled();
    });
    it("clicks the given button by value", function() {
      var html = '<div><button value="my_first_field" /></div>',
      page = new Capybara.Page(html),
      clickSpy = jasmine.createSpy('clickSpy');
      $('button', page).click(clickSpy);
      expect(clickSpy).not.toHaveBeenCalled();
      page.clickButton('my_first_field');
      expect(clickSpy).toHaveBeenCalled();
    });
    it("clicks the given button by text", function() {
      var html = '<div><button>My First Field!</button></div>',
      page = new Capybara.Page(html),
      clickSpy = jasmine.createSpy('clickSpy');
      $('button', page).click(clickSpy);
      expect(clickSpy).not.toHaveBeenCalled();
      page.clickButton('My First Field!');
      expect(clickSpy).toHaveBeenCalled();
    });
    it("clicks the given submit by id", function() {
      var html = '<div><input type="submit" id="my_first_field" /></div>',
      page = new Capybara.Page(html),
      clickSpy = jasmine.createSpy('clickSpy');
      $('input', page).click(clickSpy);
      expect(clickSpy).not.toHaveBeenCalled();
      page.clickButton('my_first_field');
      expect(clickSpy).toHaveBeenCalled();
    });
    it("clicks the given submit by value", function() {
      var html = '<div><input type="submit" value="my_first_field" /></div>',
      page = new Capybara.Page(html),
      clickSpy = jasmine.createSpy('clickSpy');
      $('input', page).click(clickSpy);
      expect(clickSpy).not.toHaveBeenCalled();
      page.clickButton('my_first_field');
      expect(clickSpy).toHaveBeenCalled();
    });
    it("raises if the button can't be found", function() {
      var html = '<div><button /></div>',
      page = new Capybara.Page(html);
      expect(function() { page.clickButton('My First Field'); }).toThrow();
    });
  });
  describe("fillIn", function() {
    it("fills in a given text field by id", function() {
      var html = '<div><input id="my_first_field" /></div>',
      page = new Capybara.Page(html);
      expect($('input', page).val()).toBe('');
      page.fillIn('my_first_field').with('Foobar');
      expect($('input', page).val()).toBe('Foobar');
    });
    it("triggers events properly on the field", function() {
      var html = '<div><input id="my_first_field" /></div>',
      page = new Capybara.Page(html),
      callOrder = [],
      callOrderCallback = function(string) { return function() { callOrder.push(string); }; },
      focusSpy = jasmine.createSpy('focus').andCallFake(function() {
        expect($('input#my_first_field', page).val()).toBe('');
        callOrderCallback('focus')();
      }),
      changeSpy = jasmine.createSpy('change').andCallFake(callOrderCallback('change')),
      blurSpy = jasmine.createSpy('blur').andCallFake(callOrderCallback('blur'));
      $('input', page).on('focus', focusSpy);
      $('input', page).on('change', changeSpy);
      $('input', page).on('blur', blurSpy);
      expect(changeSpy).not.toHaveBeenCalled();
      expect(focusSpy).not.toHaveBeenCalled();
      expect(blurSpy).not.toHaveBeenCalled();
      page.fillIn('my_first_field').with('Foobar');
      expect(changeSpy).toHaveBeenCalled();
      expect(focusSpy).toHaveBeenCalled();
      expect(blurSpy).toHaveBeenCalled();
      expect(callOrder).toEqual(['focus', 'blur', 'change']);
    });
    it('only triggers change if value is changed', function() {
      var html = '<div><input id="my_first_field" value="Foobar"/></div>',
      page = new Capybara.Page(html),
      changeSpy = jasmine.createSpy('change');
      $('input', page).on('change', changeSpy);
      expect(changeSpy).not.toHaveBeenCalled();
      page.fillIn('my_first_field').with('Foobar');
      expect(changeSpy).not.toHaveBeenCalled();
    });
    it("fills in a given text field by name", function() {
      var html = '<div><input name="my_first_field" /></div>',
      page = new Capybara.Page(html);
      expect($('input', page).val()).toBe('');
      page.fillIn('my_first_field').with('Foobar');
      expect($('input', page).val()).toBe('Foobar');
    });
    it("fills in a given text field by label text when label[for] is used", function() {
      var html = '<div><label for="my_field_1">My First Field!</label><input id="my_field_1" /></div>',
      page = new Capybara.Page(html);
      expect($('#my_field_1', page).val()).toBe('');
      page.fillIn('My First Field!').with('Foobar');
      expect($('#my_field_1', page).val()).toBe('Foobar');
    });
    it("fills in a given text field by label text when input is nested inside of label", function() {
      var html = '<div><label for="some_non_existent_field">My First Field<input /></label></div>',
      page = new Capybara.Page(html);
      expect($('input', page).val()).toBe('');
      page.fillIn('My First Field').with('Foobar');
      expect($('input', page).val()).toBe('Foobar');
    });
    it("prefers name to label text", function() {
      var html = '<div>' +
        '<input name="my_first_field" />' +
        '<label>my_first_field<input name="my_other_field" /></label>' +
        '</div>',
      page = new Capybara.Page(html);
      expect($('input[name="my_first_field"]', page).val()).toBe('');
      expect($('input[name="my_other_field"]', page).val()).toBe('');
      page.fillIn('my_first_field').with('Foobar');
      expect($('input[name="my_first_field"]', page).val()).toBe('Foobar');
      expect($('input[name="my_other_field"]', page).val()).toBe('');
    });
    it("prefers id to name", function() {
      var html = '<div><input id="my_first_field" /><input name="my_first_field" /></div>',
      page = new Capybara.Page(html);
      expect($('input#my_first_field', page).val()).toBe('');
      expect($('input[name=my_first_field]', page).val()).toBe('');
      page.fillIn('my_first_field').with('Foobar');
      expect($('input#my_first_field', page).val()).toBe('Foobar');
      expect($('input[name=my_first_field]', page).val()).toBe('');
    });
    it("raises if the input can't be found", function() {
      var html = '<div><label for="some_non_existent_field">My First Field</label></div>',
      page = new Capybara.Page(html);
      expect(function() { page.fillIn('My First Field').with('Foobar'); }).toThrow();
    });
  });
});
