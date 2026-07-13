import * as aws from "@pulumi/aws";

const dbPassword = new sst.Secret("DbPassword");

export const db = new aws.rds.Instance("GrappleLogDb", {
  engine: "mysql",
  engineVersion: "8.0",
  instanceClass: "db.t4g.micro",
  allocatedStorage: 20,
  dbName: "grapplelog",
  username: "admin",
  password: dbPassword.value,
  skipFinalSnapshot: true,
  publiclyAccessible: true,
});

export const dbHost = db.address;
export const dbPort = db.port;
export const dbName = db.dbName;
export const dbSecret = dbPassword;
