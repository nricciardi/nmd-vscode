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

### Compile (current) dossier

Compile the opened dossier (in workspace, `current`) or a selected one.

```shell
nmd compile -m <code-theme> -f html --force dossier -i <dossier-path> -o <dossier-path>/build/<output>.html`
```

### Compile file

Compile selected file.

```shell
compile -m <code-theme> -f html --force file -i <input-file-path> -o <output-path>
```

### Watch current dossier

Watch and compile current dossier in workspace. This command doesn't use `nmd compile -w dossier`, but it watches files (ignoring `build/*.html` preventing compilation loops) directly using `chokidar` library.

