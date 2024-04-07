# AvalynxRef

AvalynxRef  is an implementation of a reference (Ref) system, similar to Refs in React or Vue, designed for updating DOM elements with a specified value. This facilitates a reactive linkage between JavaScript data and the user interface.

## Features

- **Lightweight**: AvalynxRef is a lightweight library that doesn't require any dependencies.
- **Ref System**: Use Refs to update DOM elements with a specified value.

## Example

Here's a simple example of how to use AvalynxRef in your project:

* [Overview](https://avalynx-ref.jbs-newmedia.de/examples/index.html)
* [Random values](https://avalynx-ref.jbs-newmedia.de/examples/ramdom-values.html)

## Installation

To use AvalynxRef in your project, you can directly include it in your HTML file.

Include AvalynxRef:

```html
<script src="path/to/avalynx-ref.js"></script>
```

Replace `path/to/avalynx-ref.js` with the actual path to the file in your project.

## Installation via jsDelivr

AvalynxRef is also available via [jsDelivr](https://www.jsdelivr.com/). You can include it in your project like this:

```html
<script src="https://cdn.jsdelivr.net/npm/avalynx-ref/dist/avalynx-ref.js"></script>
```

## Installation via NPM

AvalynxRef is also available as a npm package. You can add it to your project with the following command:

```bash
npm install avalynx-ref
```

After installing, you can import AvalynxRef into your JavaScript file like this:

```javascript
import { AvalynxRef } from 'avalynx-ref';
```

## Installation via Symfony AssetMapper

```bash
php bin/console importmap:require avalynx-ref
```

After installing, you can import AvalynxRef into your JavaScript file like this:

```javascript
import { AvalynxRef } from 'avalynx-ref';
```

## Usage

To use AvalynxRef in your project, include the AvalynxRef JavaScript file in your project and initialize the class with the appropriate selector.

```javascript
const myRef = new AvalynxRef("#myElement");
myRef.value = "Updated content";
```

or use the `isHtml` option to treat the value as HTML:

```javascript
const myRef = new AvalynxRef("#myElement", { isHtml: true });
myRef.value = "<p>Updated content</p>";
```

## Options

AvalynxRef allows the following options for customization:

- `selector`: A custom selector for targeting tables within the DOM (default: `.avalynx-ref`).
- `options`: An object containing the following keys:
- `isHtml`: A boolean value indicating whether the value should be treated as HTML (default: `false`).

## Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository and submit a pull request with your changes or improvements. We're looking for contributions in the following areas:

- Bug fixes
- Feature enhancements
- Documentation improvements

Before submitting your pull request, please ensure your changes are well-documented and follow the existing coding style of the project.

## License

AvalynxRef is open-sourced software licensed under the [MIT license](LICENSE).

## Contact

If you have any questions, feature requests, or issues, please open an issue on our [GitHub repository](https://github.com/avalynx/avalynx-ref/issues) or submit a pull request.

Thank you for considering AvalynxRef for your project!
