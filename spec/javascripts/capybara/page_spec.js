describe("Page", function() {
  it("returns a jquery object", function() {
    var html = $('<div>'),
    page = new Capybara.Page(html);
    expect(page).toBe(html);
  });
  describe("fillIn", function() {
    it("fills in a given text field by id", function() {
      var html = '<div><input id="my_first_field" /></div>';
      page = new Capybara.Page(html);
      expect($('input', page).val()).toBe('');
      page.fillIn('my_first_field').with('Foobar');
      expect($('input', page).val()).toBe('Foobar');
    });
    it("fills in a given text field by name", function() {
      var html = '<div><input name="my_first_field" /></div>';
      page = new Capybara.Page(html);
      expect($('input', page).val()).toBe('');
      page.fillIn('my_first_field').with('Foobar');
      expect($('input', page).val()).toBe('Foobar');
    });
    it("fills in a given text field by label text when label[for] is used", function() {
      var html = '<div><label for="my_field_1">My First Field</label><input id="my_field_1" /></div>';
      page = new Capybara.Page(html);
      expect($('#my_field_1', page).val()).toBe('');
      page.fillIn('My First Field').with('Foobar');
      expect($('#my_field_1', page).val()).toBe('Foobar');
    });
    it("fills in a given text field by label text when input is nested inside of label", function() {
      var html = '<div><label for="some_non_existent_field">My First Field<input /></label></div>';
      page = new Capybara.Page(html);
      expect($('input', page).val()).toBe('');
      page.fillIn('My First Field').with('Foobar');
      expect($('input', page).val()).toBe('Foobar');
    });
    it("prefers name to label text", function() {
      var html = '<div><input name="my_first_field" /><label>my_first_field<input name="my_other_field" /></label></div>';
      page = new Capybara.Page(html);
      expect($('input[name="my_first_field"]', page).val()).toBe('');
      expect($('input[name="my_other_field"]', page).val()).toBe('');
      page.fillIn('my_first_field').with('Foobar');
      expect($('input[name="my_first_field"]', page).val()).toBe('Foobar');
      expect($('input[name="my_other_field"]', page).val()).toBe('');
    });
    it("prefers id to name", function() {
      var html = '<div><input id="my_first_field" /><input name="my_first_field" /></div>';
      page = new Capybara.Page(html);
      expect($('input#my_first_field', page).val()).toBe('');
      expect($('input[name=my_first_field]', page).val()).toBe('');
      page.fillIn('my_first_field').with('Foobar');
      expect($('input#my_first_field', page).val()).toBe('Foobar');
      expect($('input[name=my_first_field]', page).val()).toBe('');
    });
    it("raises if the input can't be found", function() {
      var html = '<div><label for="some_non_existent_field">My First Field</label></div>';
      page = new Capybara.Page(html);
      expect(function() { page.fillIn('My First Field').with('Foobar') }).toThrow();
    });
  });
});
