export default $config({
    app(input) {
        return {
            name: "grapple-log",
            removal: input?.stage === "production" ? "retain" : "remove",
            home: "aws",
            providers: {
                aws: {
                    region: "us-east-1",
                    profile: "grapple-log"
                },
            },
        };
    },

    async run() {
        const { db, dbHost, dbPort, dbName, dbSecret } = await import("./infra/database");
        //const { auth, userPoolId, userPoolClientId } = await import("./infra/auth");
        const { api } = await import("./infra/api");
        const { web } = await import("./infra/web");

        return {
            api: api.url,
            web: web.url,
            db: db.endpoint
            //  userPoolId,
            //  userPoolClientId,
        };
    },
});
