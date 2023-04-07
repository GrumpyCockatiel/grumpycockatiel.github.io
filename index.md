---
layout: page
title: Welcome
---

# Test Blog

This is just a test blog site using [Jekyll](https://jekyllrb.com/) for now.

It uses a simple [Bootstrap 5](https://getbootstrap.com/) template I threw down.

It uses [axios.js](https://axios-http.com/) to talk to the backend.

It **DOES NOT** use node.js!

## Pages

{% for page in site.pages %}
    * {{ page.title }}
{% endfor %}
