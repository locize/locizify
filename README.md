[![Coveralls](https://img.shields.io/coveralls/locize/locizify/master.svg?style=flat-square)](https://coveralls.io/github/locize/locizify)
[![npm version](https://img.shields.io/npm/v/locizify.svg?style=flat-square)](https://www.npmjs.com/package/locizify)

# locizify

Drop the locizify script onto your website and it will automatically start to segment your content and connect it to your [locize](http://locize.com) project. Translating your content was never easier.

Just drop the following line to your header to deliver your content in any language:

```html
<script
  id="locizify"
  projectid="[PROJECT_ID]"
  apikey="[API_KEY]"
  src="https://unpkg.com/locizify@^9.0.1"
  autopilot="true"
  cdnType="standard"
></script>

<!-- or -->
<script
  id="locizify"
  projectid="[PROJECT_ID]"
  apikey="[API_KEY]"
  src="https://cdn.jsdelivr.net/npm/locizify@^9.0.1"
  autopilot="true"
  cdnType="standard"
></script>

```

Checkout this [video](https://youtu.be/f0ukRI0LMfo?t=180) to see locizify in action.

locizify uses virtual-dom to update your page with translations based on the current content. MutationObserver is used to trigger translations on dynamically added content. So it should play well with any static or dynamic page not using a own virtual-dom implementation.

locizify comes bundled with [i18next](http://i18next.com/).

# Getting started

## Troubleshooting

Make sure you set the `debug` option to `true`. This will maybe log more information in the developer console.

**SaveMissing is not working**

Did you wait 5-10 seconds before refreshing the locize UI? It may take a couple of seconds until the missing keys are sent and saved.

Per default only `localhost` is allowed to send missing keys ([or update missing keys](https://www.i18next.com/overview/configuration-options#missing-keys)) (to avoid using this feature accidentally [in production](https://www.locize.com/docs/going-to-production)). If you're not using `localhost` during development you will have to set the `allowedAddOrUpdateHosts: ['your.domain.tld']`.

If you use `saveMissing=true` via query paramenter, make sure you do **NOT** define the saveMissing option also in the script tag or via init option.

## Find more information

locizify wraps some other modules from locize and i18next so there are additional valuable resources to read to get details on all the provided options:

- i18next language detector: `?lng=de` --> [readme](https://github.com/i18next/i18next-browser-languageDetector)
- locize backend --> [readme](https://github.com/locize/i18next-locize-backend)
- i18next --> [website](https://www.i18next.com)

Like always if not finding a solution of got a question - just ping us at support@locize.com.

## Adding locizify to your page

Add the script to your page:

```html
<!DOCTYPE html>
<html>
  <head>
    <script
      id="locizify"
      projectid="[PROJECT_ID]"
      apikey="[API_KEY]"
      src="https://unpkg.com/locizify@^9.0.1"
      autopilot
      cdnType="standard"
    ></script>
  </head>
  ...
</html>
```

1. Reload your page.

2. Refresh your project on locize.io - there should be added a new namespace in your reference language having all the segments of this page.

3. Add a new language to your project and translate the content

4. Reload your page with `?lng='[newLanguage]'`

5. Reload your page in the locize incontext editor to directly translate on page.

## Initialize with optional options

**IMPORTANT** make sure you do not add your apiKey in the production build to avoid misuse by strangers

### via attibutes on script element

```html
<!DOCTYPE html>
<html>
  <head>
    <script id="locizify"
      projectid="[PROJECT_ID]"
      apikey="[API_KEY]"
      referencelng="[LNG]"
      fallbacklng="[LNG]"
      src="https://unpkg.com/locizify@^9.0.1"

      // all custom attributes can also be prefixed with data-
      // data-projectid="[PROJECT_ID]"
      // data-apikey="[API_KEY]"
      // data-referencelng="[LNG]"
      // data-fallbacklng="[LNG]"

      // optional
      version="[VERSION]"
      savemissing="[true|false (default true)]"
      allowedAddOrUpdateHost="[mydomain.com (default localhost)]"
      debug="[true|false (default false)]"
      autopilot="[true|false (default false)]" // automatically configures fallbackLng and supportedLngs
      load="[all|currentOnly|languageOnly (default all)]" // https://www.i18next.com/overview/configuration-options
      cdnType="[standard|pro (default standard)]"

      // others
      // you can define any other option below just use the lowercased name and for arrays use comma separated values, eg.:
      ignoreclasses="ignoreMeClass1, ignoreMeClass2, ignoreMeClass3"
    ></script>
  </head>
  ...
```

### via init function

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="https://unpkg.com/locizify@^9.0.1"></script>
    <script>
      locizify.init({
        // required
        fallbackLng: '[LNG]',
        backend: {
          projectId: '[PROJECT_ID]',
          apiKey: '[API_KEY]', // only needed if you like to add missing segments
          referenceLng: '[LNG]',
          version: '[VERSION]', // defaults to latest
          // hostnames that are allowed to add, update keys
          // please keep those to your local system, staging, test servers (not production)
          allowedAddOrUpdateHosts: ['localhost']
          // alternatively, pass a function:
          allowedAddOrUpdateHosts: function(hostname) { return hostname.endsWith('staging.example.com') },
          cdnType: 'pro' // default 'standard'
        },

        // defaults that are set
        bindSavedMissing: true, // will connect backend supporting onSaved and trigger a reload on saved missings
        autorun: true, // setting to false init will return an object with start function
        ele: document.body, // pass in another element if you like to translate another html element
        ignoreTags: ['SCRIPT'], // tags to ignore

        // using keys instead of content as keys
        keyAttr: 'i18next-key', // node attribute to use as key
        ignoreWithoutKey: false, // set to true to only support nodes having a key

        // optional
        ignoreIds: ['ignoreMeId'],
        ignoreClasses: ['ignoreMeClass'],

        // attributes to translate
        translateAttributes: [
          'placeholder',
          'title',
          'alt',
          'value#input.type=button',
          'value#input.type=submit'
        ],

        // merging content (eg. a tags in p tags)
        mergeTags: [], // tags to merge innerHtml to one key
        inlineTags: [], // tags to inline (eg. a, span, abbr, ...)
        ignoreInlineOn: [], // tags to ignore inlining tags under inlineTags

        // cleanup for keys
        cleanIndent: true, // removes indent, eg. if a p tag spans multiple lines
        ignoreCleanIndentFor: ['PRE', 'CODE'], // ignores cleaning up of indent for those tags needing that extra spaceing
        cleanWhitespace: true, // removes surrounding whitespace from key

        namespace: false, // set another name - default namespace will be translation
        namespaceFromPath: false, // set true will use namepace based on window.location.pathname
        ns: ['common'], // -> only set if accessing more then one namepace

        // + all options available in i18next
        saveMissing: false // saveMissing and other i18next options: https://www.i18next.com/overview/configuration-options#missing-keys
      });
    </script>
  </head>
  ...
</html>
```

## Get project languages

To build some dynamic language selector you can load the available languages:

```js
locizify.getLanguages(function(err, lngs) {
  console.warn(lngs);
});

// returns something like
{
  "en": {
    "name": "English",
    "nativeName": "English",
    "translated": {
       "latest": 1,
       "production": 1
     }
  },
  "de": {
    "name": "German",
    "nativeName": "Deutsch",
    "translated": {
       "latest": 0.8,
       "production": 1
     }
  }
}
```

## Delay initial translation

```js
const translation = locizify.init({
  autorun: false,
});

setTimeout(function () {
  translation.start();
}, 1000);
```

## Merge content / use html inside your translations

Just set translated attribute:

```html
<p merge>
  all inside will be used as on segment, even if having other
  <a>elements inside</a>
</p>

// key = all inside will be used as on segment, even if having other
<a>elements inside</a>
```

Same could be done using options:

```js
mergeTags: [], // tags to merge innerHtml to one key
inlineTags: [], // tags to inline (eg. a, span, abbr, ...)
ignoreInlineOn: [], // tags to ignore inlining tags under inlineTags
```

## Fragment replacement for links and images

```html
<img src="/images/{{a.png}}" alt="big A" />
```

You will find `a.png` to be a key in your translation files - it's value can be replaced to eg. `a-de.png` for german (all other languages will fallback to `a.png`)

```html
<a href="/{{statistic}}">Open my statistics</a>
```

`statistic` will be a regular key that can be translated. But be aware you will need to provide that routes - eg. using [localized routes on the server](https://github.com/i18next/i18next-express-middleware#add-localized-routes)

## Translating javascript code

You can use the [i18next](https://i18next.com) instance used to provide the translation functionality directly. Just make sure the instance is initialized already:

```js
<script>
  // use t function of i18next
  // https://www.i18next.com/translation-function/essentials
  function useI18next() {
    var translated = locizify.i18next.t('some key');
  }

  if (locizify.i18next.isInitialized) {
    useI18next();
  } else {
    locizify.i18next.on('initialized', function(options) {
      useI18next();
    })
  }
</script>
```

## Avoid translating an element

###### By attribute

Just set translated attribute:

```html
<div translated>this will not get translated - nor this elements children</div>
```

###### By ignoring tag, class, id

Just add needed items to the specific array:

```js
locizify.init({
  ignoreTags: ['SCRIPT'], // need to be uppercased
  ignoreIds: ['ignoreMeId'],
  ignoreClasses: ['ignoreMeClass'],
});
```

```html
<script>
  this will not get translated - nor this elements children
</script>
<div id="ignoreMeId">
  this will not get translated - nor this elements children
</div>
<div class="ignoreMeClass">
  this will not get translated - nor this elements children
</div>
```

Just add `translated`-attribute

## Advanced Translation Features

For [advanced translations](http://i18next.com/translate/) like plurals, interpolation, ... you need to add options to the element

#### Interpolation

```html
<div i18next-options='{"foo": "bar"}'>
  foo {{bar}}
  <p i18next-options='{"foo2": "bar2"}'>foo {{foo}}; foo2 {{foo2}}</p>
</div>
```

Options get inherited from parent to child nodes.

#### Plural

```html
<p i18next-options='{"count": 2}'>plural {{count}} items</p>
```

## Set different namespaces

Default would be translation.

#### Set a different one:

```js
locizify.init({
  namespace: 'myNamespace',
});
```

#### autogenerate one per route:

```js
locizify.init({
  namespaceFromPath: true,
});
```

## Access different namespaces

This is useful for reused elements that are on every page, eg. like footer,... and you're using namespaceFromPath. This way you can avoid having that segments on every routes namespace file.

```js
locizify.init({
  namespaceFromPath: true
  ns: ['common'] // -> add additional namespaces to load
});
```

```html
<div i18next-options='{"ns": "common"}'>
  <p>different namespace common is used</p>
  <p>all the way down</p>
</div>
```

## Avoid flickering on initial load

To avoid to show the user the untranslated content in the reference language you can:

```html
<!DOCTYPE html>
<html>
  <head>
    ...
  </head>
  <body style="display: none">
    ...
  </body>
</html>
```

Just set the element style display to none. locizify will change it to block when ready.

## Change namespace dynamically per code

You can change the namespace after loading to some other file (eg. before transitioning to another page).

```js
locizify.changeNamespace('newNamespace');
```

## Specify own keys for the translation segments

Per default the virtualdom implementation will use the extracted content as keys leading to translation JSON in the form:

```js
// <div>This is my text.</div>
// <a href="#" title="My Link Title" >My Link</a>
{
  "This is my text.": "This is my text.",
  "My Link": "My Link",
  "My Link Title": "My Link Title"
}
```

In some situations you like to define an explicit key for that segment.
The default key attribute is `i18next-key`, so just add that attribute to the html element to be used as own translation key and the html element value will be used as default value:

```js
// <div i18next-key="myKey">This is my text.</div>
// <a i18next-key="myLink" href="#" title="My Link Title" >My Link</a>
{
  "myKey": "This is my text.",
  "myLink": "My Link",
  "myLink.title": "My Link Title"
}
```

\*Do NOT replace your html content with a custom key. This will technically work, but your server side representation will be negatively influenced (SEO), because there will not be any nice content fallback. Search engines like google search will then show your custom i18n keys instead of your website content. **So better use the `i18next-key` attribute to achieve this!\***

There are two init options to configure this further:

```js
locizify.init({
  // ...

  keyAttr: 'i18next-key', // node attribute to use as key
  ignoreWithoutKey: false, // set to true to only extract/translate nodes having a key

  // ...
});
```

Setting `ignoreWithoutKey: true` is recommended when using keys to get a clean key-based result.

**Important** The locizify script does not support nested JSON structures like:

```js
{
  "myKey": {
    "attr1": "value",
    "attr2": "value"
  }
}
```

You will have to enforce flat JSON in your locize project (settings -> publish format -> JSON flat)

```js
{
  "myKey.attr1": "value",
  "myKey.attr2": "value"
}
```

## force a retranslation:

```js
locizify.forceRerender();
```

## access to locize script (locize InContext editor)

Pass `?incontext=true` in your url to show the locize InContext editor.


https://github.com/locize/locize

```js
let isOff;

isOff = locizify.editor.turnOff(); // -> true
isOff = locizify.editor.turnOn(); // -> false

locizify.editor.setEditorLng('en'); // -> sets the appropriate language in the InContext editor
```
