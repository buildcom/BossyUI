Important:

Anyone know anything about a CSS string parser?

Directives that want to modify the DOM typically use the link option. link takes a function with the following signature, function link(scope, element, attrs) { ... } where:

scope is an Angular scope object.
element is the jqLite-wrapped element that this directive matches.
attrs is a hash object with key-value pairs of normalized attribute names and their corresponding attribute values.

sudo npm install does not work for me
Where and how do I view the existing widgets? Where is the documentation that describes this in case one forgets?
How do I handle animation fade in and fade out as it enters and leaves the DOM

REasons against using config for all member variables... what if they need to preload data in their controller for multiple widgets. It would be better for them to have semantic names to make it less confusing