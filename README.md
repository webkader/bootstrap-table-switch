# Bootstrap Table Switch

Turn checkboxes into toggle switches.
This library is created by Baris Aydin.

To get started, check out [http://github.webkader.com/bootstrap-table-switch/](http://github.webkader.com/bootstrap-table-switch/)

# Features

- Swipe functionality (as the browser supports touch events)
- Detects swipes in 4 directions, "up", "down", "left" and "right"
- Events triggered for swipe "start","move","end" and "cancel"
- Supported browsers IE9+ and all the other modern browsers.
- Supported iPad, iPhone, Android etc.


## Demo and Documentation

- [Examples](http://github.webkader.com/bootstrap-table-switch/examples.html)
- [Options](http://github.webkader.com/bootstrap-table-switch/options.html)


## Usage

Include the library in your page and create the Bootstrap Table normally, as described in the [official Bootstrap Table documentation](https://github.com/wenzhixin/bootstrap-table).

## Getting started

Include the dependencies: jQuery, Bootstrap, Bootstrap Table and Bootstrap Table Switch CSS + Javascript:

``` html
[...]
<link href="bootstrap.css" rel="stylesheet">
<link href="bootstrap-table.css" rel="stylesheet">
<link href="bootstrap-table-switch.css" rel="stylesheet">
<script src="jquery.js"></script>
<script src="bootstrap-table.js"></script>
<script src="bootstrap-table-switch.js"></script>
[...]
```

Enable Bootstrap Table Switch on it:

```javascript
$('#table').bootstrapTable({
	switchEnabled: true,
	onText: "YES",
	offText: "NO"
});
```


## Bugs and feature requests

Have a bug or a feature request? If your problem or idea is not addressed yet, [please open a new issue](https://github.com/webkader/bootstrap-table-switch/issues/new).

## License

**NOTE:** Bootstrap Table Switch is licensed under the The [MIT License](https://github.com/webkader/bootstrap-table-switch/blob/master/LICENSE). Completely free, you can arbitrarily use and modify this plugin. If this plugin is useful to you, you can Star this repo, your support is my biggest motive force, thanks.

