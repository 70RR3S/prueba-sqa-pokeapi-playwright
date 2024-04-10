module.exports = {
    api: {
        tags: "",
        paths: [
            "tests/api/features"
        ],
        require: [
            "tests/api/steps/**/*.spec.ts",
            "hooks/hooks.ts"
        ],
        requireModule: [
            "ts-node/register"
        ], 
    }
}