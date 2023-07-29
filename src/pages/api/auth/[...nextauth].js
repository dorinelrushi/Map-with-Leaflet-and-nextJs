import NextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import GithubProvider from "next-auth/providers/github";
import { MongoClient } from "mongodb";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: "clientId",
      clientSecret: "clientSecret",
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
    // ...add more providers here
  ],

  database: "yourdatabase",
  session: {
    jwt: true,
  },
  jwt: {
    secret: "asdcvbtjhm",
  },
  callbacks: {
    async signIn(user, account, profile) {
      console.log(user);
      // Save user to the database
      const client = new MongoClient(authOptions.database, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      try {
        await client.connect();
        const database = client.db();
        const collection = database.collection("users");

        // Save the user information to the database
        await collection.insertOne({
          email: user.user.email,
          name: user.user.email,

          // Include any other relevant user data you want to save
        });
      } catch (error) {
        console.log("Error saving user to database:", error);
      } finally {
        await client.close();
      }

      return true;
    },
  },
};

export default NextAuth(authOptions);
