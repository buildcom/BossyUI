---
title: Contribute
slug: contribute
order: 5
---
<section>
	<h2>SASS Rules</h2>
	<div class="module">
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
	</div>
</section>

<section>
<h2>Dirctive Name Pattern</h2>
	<div class="module">

{% highlight scss %}
// SASS Pattern
.bossy {
	&-#{module} {
		&-#{part} {
			&-#{element} {

			}
		}
	}
}
{% endhighlight %}
{% highlight scss %}
// Result
.bossy-calendar {} 	// All classes have a selector weight of 0010
.bossy-calendar-header {}
.bossy-calendar-header-day {}
{% endhighlight %}
		mulit-word names use camle case eg: multiMenu
	</div>
</section>

<section>
<h2>Modifiers</h2>
	<div class="module">
{% highlight scss %}
.is--active {}
.is--closed {}
.is--open   {}
.is--hidden {}
{% endhighlight %}
	</div>
</section>