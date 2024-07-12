

export function buildFileName(base: string, ext?: string) {

    let output = base.trim().replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "").replace(" ", "-");

    if (ext) {
        output = `${output}.${ext}`
    }

    return output;
}