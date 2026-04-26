import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db"; // Ensure this path is correct based on your structure
import * as schema from "../db/schema";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "sqlite",
        schema: schema,
    }),
    emailAndPassword: {
        enabled: true,
        sendResetPassword: async ({ user, url }) => {
            console.log("\n=============================");
            console.log(`PASSWORD RESET REQUEST for ${user.email}`);
            console.log(`Click this link to reset password:`);
            console.log(`${url}`);
            console.log("=============================\n");
        },
    },
    user: {
        additionalFields: {
            bloodType: {
                type: "string",
                required: false,
            },
            zipCode: {
                type: "string",
                required: false,
            },
            role: {
                type: "string",
                required: false,
            },
            licenseId: {
                type: "string",
                required: false,
            },
            organizationType: {
                type: "string",
                required: false,
            },
            mobileNumber: {
                type: "string",
                required: false,
            },
            alternateMobileNumber: {
                type: "string",
                required: false,
            },
            address: {
                type: "string",
                required: false,
            },
            gender: {
                type: "string",
                required: false,
            },
            state: {
                type: "string",
                required: false,
            },
            district: {
                type: "string",
                required: false,
            },
            city: {
                type: "string",
                required: false,
            },
        },
    },
});
