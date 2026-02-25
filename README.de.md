# AvalynxRef

[![npm version](https://img.shields.io/npm/v/avalynx-ref)](https://www.npmjs.com/package/avalynx-ref)
[![npm downloads](https://img.shields.io/npm/dt/avalynx-ref)](https://www.npmjs.com/package/avalynx-ref)
[![jsDelivr](https://img.shields.io/jsdelivr/npm/hm/avalynx-ref)](https://www.jsdelivr.com/package/npm/avalynx-ref)
[![License](https://img.shields.io/npm/l/avalynx-ref)](LICENSE)
[![Tests](https://github.com/avalynx/avalynx-ref/actions/workflows/tests.yml/badge.svg?branch=main)](https://github.com/avalynx/avalynx-ref/actions/workflows/tests.yml)
[![codecov](https://codecov.io/gh/avalynx/avalynx-ref/branch/main/graph/badge.svg)](https://codecov.io/gh/avalynx/avalynx-ref)
[![GitHub stars](https://img.shields.io/github/stars/avalynx/avalynx-ref?style=flat&logo=github)](https://github.com/avalynx/avalynx-ref)

AvalynxRef ist eine Implementierung eines Referenzsystem (Ref), ähnlich wie Refs in React oder Vue, das zur Aktualisierung von DOM-Elementen mit einem bestimmten Wert entwickelt wurde. Dies ermöglicht eine reaktive Verknüpfung zwischen JavaScript-Daten und der Benutzeroberfläche.

## Funktionen

- **Leichtgewichtig**: AvalynxRef ist eine leichtgewichtige Bibliothek, die keine Abhängigkeiten erfordert.
- **Ref-System**: Verwenden Sie Refs, um DOM-Elemente mit einem bestimmten Wert zu aktualisieren.

## Beispiel

Hier ist ein einfaches Beispiel für die Verwendung von AvalynxRef in Ihrem Projekt:

* [Übersicht](https://avalynx-ref.jbs-newmedia.de/examples/index.html)
* [Zufallswerte](https://avalynx-ref.jbs-newmedia.de/examples/random-values.html)

## Installation

Um AvalynxRef in Ihrem Projekt zu verwenden, können Sie es direkt in Ihre HTML-Datei einbinden.

Binden Sie AvalynxRef ein:

```html
<script src="pfad/zu/avalynx-ref.js"></script>
```

Ersetzen Sie `pfad/zu/avalynx-ref.js` durch den tatsächlichen Pfad zur Datei in Ihrem Projekt.

## Installation über jsDelivr ([Link](https://cdn.jsdelivr.net/npm/avalynx-ref/))

AvalynxRef ist auch über [jsDelivr](https://www.jsdelivr.com/) verfügbar. Sie können es wie folgt in Ihr Projekt einbinden:

```html
<script src="https://cdn.jsdelivr.net/npm/avalynx-ref@1.0.2/dist/js/avalynx-ref.min.js"></script>
```

## Installation über NPM ([Link](https://www.npmjs.com/package/avalynx-ref))

AvalynxRef ist auch als npm-Paket verfügbar. Sie können es mit dem folgenden Befehl zu Ihrem Projekt hinzufügen:

```bash
npm install avalynx-ref
```

Nach der Installation können Sie AvalynxRef wie folgt in Ihre JavaScript-Datei importieren:

```javascript
import { AvalynxRef } from 'avalynx-ref';
```

## Installation über Symfony AssetMapper

```bash
php bin/console importmap:require avalynx-ref
```

Nach der Installation können Sie AvalynxRef wie folgt in Ihre JavaScript-Datei importieren:

```javascript
import { AvalynxRef } from 'avalynx-ref';
```

## Installation über Symfony AssetComposer

Weitere Informationen zum Symfony AssetComposer Bundle finden Sie [hier](https://github.com/jbsnewmedia/asset-composer-bundle).

```twig
{% do addAssetComposer('avalynx/avalynx-ref/dist/js/avalynx-ref.js') %}
```

Stellen Sie sicher, dass Sie auch das JS/CSS von Bootstrap in Ihr Projekt einbinden, damit AvalynxRef korrekt angezeigt wird.

## Installation über Composer ([Link](https://packagist.org/packages/avalynx/avalynx-ref))

AvalynxRef ist auch als Composer-Paket verfügbar. Sie können es mit dem folgenden Befehl zu Ihrem Projekt hinzufügen:

```bash
composer require avalynx/avalynx-loader
```

Nach der Installation können Sie AvalynxLoader wie folgt in Ihre HTML-Datei einbinden:

```html
<script src="vendor/avalynx/avalynx-loader/dist/js/avalynx-loader.js"></script>
``` 

## Verwendung

Um AvalynxRef in Ihrem Projekt zu verwenden, binden Sie die JavaScript-Datei AvalynxRef in Ihr Projekt ein und initialisieren Sie die Klasse mit dem entsprechenden Selektor.

```javascript
const myRef = new AvalynxRef("#myElement");
myRef.value = "Aktualisierter Inhalt";
```

oder verwenden Sie die Option `isHtml`, um den Wert als HTML zu behandeln:

```javascript
const myRef = new AvalynxRef("#myElement", { isHtml: true });
myRef.value = "<p>Aktualisierter Inhalt</p>";
```

## Optionen

AvalynxRef ermöglicht die folgenden Optionen zur Anpassung:

- `selector`: (string) Der Selektor, der für die Zielbestimmung von Tabellen im DOM verwendet werden soll (Standard: `'.avalynx-ref'`).
- `options`: Ein Objekt, das die folgenden Schlüssel enthält:
  - `isHtml`: (boolean) Behandelt den Wert als HTML (Standard: `false`).

## Geplante Funktionen
- Callback-Funktion für Wertänderungen
 
## Beitragen

Beiträge sind willkommen! Wenn Sie etwas beitragen möchten, forken Sie bitte das Repository und senden Sie einen Pull-Request mit Ihren Änderungen oder Verbesserungen. Wir suchen nach Beiträgen in den folgenden Bereichen:

- Fehlerbehebungen
- Funktionserweiterungen
- Dokumentationsverbesserungen

Bevor Sie Ihren Pull-Request einreichen, stellen Sie bitte sicher, dass Ihre Änderungen gut dokumentiert sind und dem bestehenden Codierungsstil des Projekts entsprechen.

## Lizenz

AvalynxRef ist quelloffene Software, die unter der [MIT-Lizenz](LICENSE) lizenziert ist.

## Kontakt

Wenn Sie Fragen, Funktionswünsche oder Probleme haben, eröffnen Sie bitte ein Issue in unserem [GitHub-Repository](https://github.com/avalynx/avalynx-ref/issues) oder reichen Sie einen Pull-Request ein.

Vielen Dank, dass Sie AvalynxRef für Ihr Projekt in Betracht ziehen!
