var Capybara={installJasmineMatchers:function(e){e.addMatchers(Capybara.JasmineMatchers)}};Capybara.JasmineMatchers={},Capybara.JasmineMatchers.toHaveContent=function(e){var t=new RegExp(e);return this.message=function(){return["Expected "+$(this.actual).outerHtml+" to have content '"+e+"'","Expected "+$(this.actual).outerHtml+" not to have content '"+e+"'"]},t.test(e)},Capybara.Page=function(e){var t=$(e);return t.extend({fillIn:function(e){var n=$("label:contains("+e+")",t),r=$("#"+n.attr("for"),t).add($("input",n)).first();if(!n.length)throw"Label with text '"+e+"' not found in "+t.html();if(!r.length)throw"Input for label '"+e+"' not found in "+t.html();return{"with":function(e){r.val(e)}}}})};