// infra/api.ts
import { db, dbHost, dbPort, dbName, dbSecret } from "./database";

export const api = new sst.aws.ApiGatewayV2("grapple-log-api", {
    cors: {
        allowOrigins: ["http://localhost:5173", $app.stage === "production"
            ? "https://yourdomain.com"
            : "*"
        ],
        allowMethods: ["GET", "POST", "PUT", "DELETE"],
        allowHeaders: ["Content-Type", "Authorization"],
    },
});

const environment = {
    DB_HOST: dbHost,
    DB_PORT: dbPort.apply(p => p.toString()),
    DB_NAME: dbName,
    DB_PASSWORD: dbSecret.value,
};

const fnDefaults = {
    handler: "",
    environment,
    link: [db],
};

api.route("GET /sessions", { ...fnDefaults, handler: "functions/sessions.list" });
api.route("POST /sessions", { ...fnDefaults, handler: "functions/sessions.create" });
api.route("GET /sessions/{id}", { ...fnDefaults, handler: "functions/sessions.get" });
api.route("DELETE /sessions/{id}", { ...fnDefaults, handler: "functions/sessions.remove" });

api.route("GET /techniques", { ...fnDefaults, handler: "functions/techniques.list" });
api.route("POST /techniques", { ...fnDefaults, handler: "functions/techniques.create" });
api.route("PUT /techniques/{id}", { ...fnDefaults, handler: "functions/techniques.update" });

api.route("GET /injuries", { ...fnDefaults, handler: "functions/injuries.list" });
api.route("POST /injuries", { ...fnDefaults, handler: "functions/injuries.create" });
api.route("PUT /injuries/{id}", { ...fnDefaults, handler: "functions/injuries.update" });

api.route("GET /dashboard", { ...fnDefaults, handler: "functions/dashboard.get" });
