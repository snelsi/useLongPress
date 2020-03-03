# useLongPress
Simple React-Typescript hook for adding long-press functionality to your components.

# Why?
This hook is extremely handy in mobile web-apps, it allows you to add some very neet intuitive control for all touchscreen devices.

# Use cases?
Allow multi-selection by long press, hide some submenu-actions behind the image, confirm user confidence by long pressing button, etc.

# How to use?
Just pass the onClick and onLongPress callbacks into the hook and optionally some time and press-area parameters. Hook will return three methods: 'onPointerDown', 'onPointerUp', 'onPointerUp'. Just pass them to your component attributes like this:
``` 
const onClick = () => alert("Clicked once!");
const onLongPress = () => alert("Long press!");

const hookProps = useLongPress(onClick, onLongPress);

return <button {...hookProps}>Click me!</button>
```
