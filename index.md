---
layout: page
title: Welcome
---

# Test Blog

It uses a simple [Bootstrap 5](https://getbootstrap.com/) template I threw down.

It uses [axios.js](https://axios-http.com/) to talk to the backend.

It **DOES NOT** use node.js!

It **DOES NOT** use any Javascript framework - just vanilla.js!

## Site Pages

<ol class="list-group list-group-numbered">
    {% for page in site.pages %}
        <li class="list-group-item"><a href="{{ page.url }}">{{ page.title }}</a></li>
    {% endfor %}
</ol>