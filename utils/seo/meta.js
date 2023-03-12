export function makeTitleWith(...titles) {
    return [process.env.NEXT_PUBLIC_WEBSITE_NAME,...titles].join(" | ")
}