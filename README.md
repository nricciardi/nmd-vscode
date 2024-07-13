![Version](https://img.shields.io/badge/version-v0.1.0-blue.svg)

# NMD x VS Code

This is the official VS Code extension to easily use [NMD](https://github.com/nricciardi/nmd).

## Configure extension

1. Install `nmd` with Cargo or through [Github release](https://github.com/nricciardi/nmd) (you must modify `PATH` environment variable) 

```shell
cargo install nmd
```

2. Verify installation

```shell
nmd -V
```

## Commands

Run a command using `Ctrl + Shift + P`

### Create new dossier

Create a new dossier in selected path and then open it.

```shell
nmd generate dossier -p <dossier-path> -f
```

### Add document to dossier

Add a document to the opened dossier in workspace.

```shell
nmd dossier -p <dossier-path> add -d <document-name>`
```

### Compile dossier

Compile the opened dossier in workspace.

```shell
nmd compile -f html --force dossier -i <dossier-path> -o <dossier-path>/build/<output>.html`
```

### Compile file

TODO


