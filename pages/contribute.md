---
title: Contribute
slug: contribute
order: 5
---
<h2>How to contribute to Bossy</h2>
<section class="module">
	<h3>SASS Rules</h3>
	<div class="grid">
		<div class="col-1">
			<ul>
				<li><strong>Do</strong> use HTML tags for layout</li>
				<li><strong>Do</strong> use SASS grid</li>
				<li><strong>Do</strong> add class hooks to all template elements</li>
			</ul>
			<ul>
				<li><strong>Do Not</strong> use IDs</li>
			</ul>
		</div>
	</div>
</section>


<section>
	<div class="module">
{% highlight scss %}
// Bad
#header .search #query {
  color: blue;
}

{% endhighlight %}
	</div>
</section>