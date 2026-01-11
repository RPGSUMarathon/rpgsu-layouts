# rpgsu-layouts
Template for NodeCG bundles that use React and TypeScript, builds with Vite and implements TailwindCSS for easy costumization of components. An extension of Hoxi's [nodecg-react-template](https://github.com/hoXyy/nodecg-react-template) template.

This bundle is aimed to quickstart the creation of NodeCG bundles for speedrunning events, so it already has some references to [Speedcontrol](https://github.com/speedcontrol/nodecg-speedcontrol).


## Getting started

Make sure you have Node.JS and [pnpm](https://pnpm.io/installation) installed (recommended install method for pnpm is using [corepack](https://pnpm.io/installation#using-corepack)).

### 1. Install NodeCG

Follow the [NodeCG Installation Guide](https://www.nodecg.dev/docs/installing/).

### 2. Install the submodules

Install the dependencies on speedcontrol and nodecg-foobar2000-plugin with

```bash
git submodule update --init --recursive
```

## Install the files

To install the dependencies, run

```bash
pnpm i
```

## Build the layouts

```bash
pnpm build
```

## Run the server locally

In the root folder, run

```bash
pnpm start
```

and the dashboard will be running on ```http://localhost:9090``` by default. The port can be changed in the configurations.

## Observing live changes [Development]

For development purposes, you'll want to observe your changes live. In that case, run 

```bash
pnpm watch
```

in the root folder of the layouts folder and then once again run 

```bash
pnpm start
```

to launch the server.
