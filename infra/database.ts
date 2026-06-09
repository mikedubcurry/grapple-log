import * as aws from "@pulumi/aws";

export const dbHost = "localhost";
export const dbPort = { apply: (fn: (v: number) => string) => fn(3306) };
export const dbName = "grapplelog";
export const dbSecret = { value: "stubbed" };
export const db = {} as any;
