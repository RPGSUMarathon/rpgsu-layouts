# nodecg-react-tailwind-template
Template for NodeCG bundles that use React and TypeScript, builds with Vite and implements TailwindCSS for easy costumization of components. An extension of Hoxi's [nodecg-react-template](https://github.com/hoXyy/nodecg-react-template) template.

This bundle is aimed to quickstart the creation of NodeCG bundles for speedrunning events, so it already has some references to [Speedcontrol](https://github.com/speedcontrol/nodecg-speedcontrol).


## Getting started

### 1. Install NodeCG

Follow the [NodeCG Installation Guide](https://www.nodecg.dev/docs/installing/).

### 2. Install the Template

Install this template in the bundles directory with

```bash
nodecg install mbcsalmeida/nodecg-react-tailwind-template
```

or by cloning this repository into the bundles directory.

## Run the server locally

The server can be run with 

```bash
nodecg start
```

and it will be running on ```http://localhost:9090``` by default.

To observe live changes, run 

```bash
npm run watch
```

in the bundle directory and then 

```bash
npm run start OR nodecg start
```

to observe live changes.