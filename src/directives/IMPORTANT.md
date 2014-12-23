Important:

Directives that want to modify the DOM typically use the link option. link takes a function with the following signature, function link(scope, element, attrs) { ... } where:

scope is an Angular scope object.
element is the jqLite-wrapped element that this directive matches.
attrs is a hash object with key-value pairs of normalized attribute names and their corresponding attribute values.